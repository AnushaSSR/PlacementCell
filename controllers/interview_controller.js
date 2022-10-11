const Interview = require('../models/interviews');
const Student = require('../models/student');

//controller to add an new interview 
module.exports.addInterview = async function (req, res) {
    let interviews = await Interview.find({});
    let students = await Student.find({});
    try {
        let interview = await Interview.find({ company_name: req.body.company_name } && { date: req.body.date });
        if (interview && interview.length) {
            req.flash('error','Interview already scheduled on same date');
            return res.redirect('back');
        } else {
            let interview = await Interview.create({
                company_name: req.body.company_name,
                date: req.body.date
            });
            await interview.save();
            req.flash('success','New Interview added to the list');
            res.redirect('back');
        }
    } catch (err) {
        if (err) { console.log("Error in creating interview", err); return }
        return res.redirect('back');
    }
};

//controller to diplay the list of interviews added
module.exports.displayInterviews = async function (req, res) {
    let interviews = await Interview.find();
    let students = await Student.find();
    try {

        return res.render("interview_details", {
            title: "Placement Cell | Interview Details Page",
            interviews: interviews,
            students: students
        });
    } catch (err) {
        console.log("Error in fetching interviews list", err);
        return res.redirect('back');
    }
};

//controller to allocate student/s to an interview
module.exports.allocateStudent = async function (req, res) {
    let interviews = await Interview.find();
    let students = await Student.find();

    let addedStudentList = req.body.checkbox;

    try {
        for (let s of addedStudentList) {
            let allocatedStudent = await Student.findById(s).populate();
            let allocStd = {
                student: allocatedStudent,
                result: " " }
            let allocatedInterview = await Interview.findById(req.params.id);
            let currentAllocatedStudent = allocatedInterview.studentsList.filter(s => {

               
                return s.student.equals(allocatedStudent._id);
            });

            if (!currentAllocatedStudent.length) {
                console.log(`Student ${allocatedStudent.name} allocated to interview`);
                // req.flash("success", `Student ${allocatedStudent.name} allocated to interview`);

                allocatedInterview.studentsList.push(allocStd);
            }
            else {
                // req.flash("error", `Student ${allocatedStudent.name} is alreday allocated to interview`);

                console.log(`Student already allocated for specified interview not added to list ${allocatedStudent.name}`);

            }
            await allocatedInterview.save();
        }
        
        return res.render("interview_details", {
            title: "Placement Cell | Interview Details Page",
            interviews: interviews,
            students: students,
                });
    } catch (err) {
        console.log("Error in allocating student to an interview", err);
        return res.redirect('back');
    }
};


//controller to render the students allocated to an interview to update the results
module.exports.getAllocatedStudents = async function (req, res) {
    try {
        let interview = await Interview.findById(req.params.id).populate({
            path: "studentsList.student",
            model: "Student",
        });
        let students = await Student.find({});

        return res.render('update_results', {
            title: "Placement Cell | Update Interview Results",
            interview: interview,
            students: students
        });
    } catch (err) {
        console.log('Error in getting allocated studnts', err);
        return res.redirect("back");
    }
};

// controller to update the results of the students

// controller to update the results of the students
module.exports.updateResults = async function (req, res) {

    let studentId = req.body.student;

    try {
        let student = await Student.findById(studentId);

        let allocatedInterview = await Interview.findById(req.params.interview).populate({
            path: "studentsList.student",
            model: "Student",
        });

        if(allocatedInterview.studentsList && allocatedInterview.studentsList.length){

            allocatedInterview.studentsList.forEach(s => {
                if (s.student._id.equals(student._id) && (s.result !== req.body.result) && (req.body.result !== undefined) ) {
                   
                   console.log('existing result is',s.result);
                   console.log(`req sent is`, req.body.result);

                   console.log(` req sent is vlid`, req.body.result !== undefined);
                    s.result = req.body.result;
                    allocatedInterview.save();
                    req.flash('success', `Result of ${s.student.name} updated to ${s.result}`);
                    
                }        
                
            }); 
            return res.redirect('back');
        } 
        
    } catch (err) {
    console.log('Error in updating results', err);
    return res.redirect("back");
    }
};


