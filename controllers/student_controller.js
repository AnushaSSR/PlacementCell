const Student = require('../models/student');
const Scores = require('../models/course_scores');
const { students } = require('./employee_controller');

//controller to a new student to the list
module.exports.addStudent = async function (req, res) {
    try {
        let student = await Student.find({ email: req.body.email });
        if (student && student.length) {
            return res.redirect('back');         
        } else {
            let student = await Student.create({
                name: req.body.name,
                college: req.body.college,
                email: req.body.email,
                batch: req.body.batch,
                status: req.body.status,
            });
            let scores = await Scores.create({
                dsa_score: req.body.dsa_score,
                webd_score: req.body.webd_score,
                react_score: req.body.react_score,
                student: student._id
            });           
            student.scores = scores._id;
            await student.save();
            let students = await Student.find({}).populate("scores");
                        return res.redirect("back");
        }
    } catch(err) {
        if(err) {console.log("Error in adding student", err); return }
        return res.redirect('back');
    }
};


//controller to display/render the students lists
module.exports.displayStudents =async function(req, res) {
    try {
        let students = await Student.find().populate({
            path: "scores",
            model: "Scores",
        });


        console.log(students);
        // let students= await Student.find({}).populate("scores");
        // let scores= await Scores.find();
        return res.render("student_details",{
            title:"Placement Cell | Student Details Page",
            students: students,
        });
    } catch(err) {console.log("error in fetching students list",err);
        return res.redirect('back');
    };
};
