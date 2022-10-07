const Interview = require('../models/interviews');
const Student = require('../models/student');

module.exports.addInterview = async function (req, res) {
    let interviews = await Interview.find({});
    let students = await Student.find({});

    try {
        let interview = await Interview.find({ company_name: req.body.company_name } && { date: req.body.date });

        if (interview && interview.length) {
            // console.log("student exists");
            return res.redirect('back');
        }
        else {
            // console.log("Adding Student");        
            let interview = await Interview.create({
                company_name: req.body.company_name,
                date: req.body.date
            });

            await interview.save();

            res.redirect('back');
            // return res.render("interview_details", {
            //     title: "Placement Cell | Interview Details",
            //     interviews: interviews,
            //     students: students
            // });
        }
    } catch (err) {
        if (err) { console.log("error in creating interview", err); return }
        return res.redirect('back');
    }

    // return res.render("interview_details", {
    //     title:"Placement Cell | Interview Details",
    //     interviews: interviews,
    //     students: students          
    // });

}

module.exports.displayInterviews = async function (req, res) {
    let interviews = await Interview.find();
    let students = await Student.find();
    try {
        // let interview= await Interview.find().populate("students");

        // console.log("interview details rendered are", interviews);
        return res.render("interview_details", {
            title: "Placement Cell | Interview Details",
            interviews: interviews,
            students: students
        });
    } catch (err) {
        console.log("error in fetching students list", err);
        return res.redirect('back');
    }
}


module.exports.allocateStudent = async function (req, res) {

    let id = req.params.id;
    let id_body = req.body.id;
    let stdlist = req.body.checkbox;
    // console.log(id);
    // console.log(`body id is`,id_body);
    try {
        let interviews = await Interview.find();
        let students = await Student.find();

        for (let s of stdlist) {
            // let allocateStd= await Interview.findById(s).populate({
            //     path:"studentsList.student",
            //     model: "Student"

            // });

            let allocatedStd = await Student.findById(s).populate();
            const allocStd = {
                student: allocatedStd,
                result: " "
            }
            // console.log(`allocated student is ***********************`,allocatedStd);            
            let int = await Interview.findById(id);

            // console.log("*************************************************",int);
            let currentAllocatedStudent = int.studentsList.filter(student => {
                // console.log(student.student);
                // console.log(allocatedStd._id);
                return student.student.equals(allocatedStd._id);
            });


            // console.log('length is ********************************',currentAllocatedStudent);
            if (!currentAllocatedStudent.length) {
                int.studentsList.push(allocStd);
            }



            await int.save();
        }
        return res.render("interview_details", {
            title: "Placement Cell | Interview Details",
            interviews: interviews,
            students: students
        });
    } catch (err) {
        console.log("error in fetching students list", err);
        return res.redirect('back');
    };

}



//     try {
//         // let interview = await Interview.findById(req.params.id).populate({
//         //     path:"studentsList.student",
//         //     model: "Student",
//         //     });
//         // let students= await Student.find();        
//             // interview: interview,
//             // students: students
//         });
//     } catch(err) {
//     console.log('Erro in geeting studnts', err);
//     return res.redirect("back");
// }

// };

// // if(interviewScheduled){
//     let student = interviewScheduled.studentsList;

// }

//     let interviewId = req.params.id;
//     console.log(`***********************************`,interviewId);


//     let interview= await Interview.findById(interviewId);
// let studentList= interview.studentsList;
//     console.log(`student list student is `,studentList);

//     let students= [];
//     let results= [];

//     studentList.forEach(s=> {
//         console.log(`student list student id is `,s.student);
//         console.log('student id s are',s.student.toString());
//         students.push(s.student);

//         let studentsResults= s.result;
//         console.log("result is"+studentsResults);
//         results.push(studentsResults);

//     });

//     let studentsAllocated= [];

//     for(s of students){
//         let studentAllocated= await Student.findById(s.toString());
//         console.log(studentsAllocated);
//         studentsAllocated.push(studentAllocated);



//     }

// }catch {
//     console.log("error in fetching students list",err);
//          return res.redirect('back');
//      };
//    }


//     let interviews= await Interview.find();
//     let students= await Student.find();
//    try{
//     // let interview= await Interview.find().populate("students");

//         // console.log("interview details rendered are", interviews);
//         return res.render("interview_details",{
//             title:"Placement Cell | Interview Details",
//             interviews: interviews,
//             students: students
//         });
//     }catch(err) {console.log("error in fetching students list",err);
//         return res.redirect('back');
//     }



// module.exports.allocate =async function(req, res) {

//     let id= req.query.id;
//     console.log(`**********************************`,id);
//     try{
//         let interviews= await Interview.find();
//         let students = await Student.find();
//         return res.render("allocate_student",{
//             title:"Placement Cell | Interview Details",
//             interviews: interviews,
//             students: students
//                   });
//     }
//         catch(err) {console.log("error in fetching students list",err);
//         return res.redirect('back');
//     };

// 







module.exports.getAllocatedStudents = async function (req, res) {
    try {
        let interview = await Interview.findById(req.params.id).populate({
            path: "studentsList.student",
            model: "Student",
        });
        let students = await Student.find({});

        return res.render('update_results', {
            title: "update students",
            interview: interview,
            students: students
        });
    } catch (err) {
        console.log('Erro in geeting studnts', err);
        return res.redirect("back");
    }

};

module.exports.updateResults = async function (req, res) {

    let studentId = req.body.student;

    // console.log("interview id is",i);
    console.log("student id is", studentId);
    try {
        let interview = await Interview.findById(req.params.interview).populate({
            path: "studentsList.student",
            model: "Student",
        });
        let student = await Student.findById(studentId);

        let allocatedInterview = await Interview.findById(req.params.interview).populate({
            path: "studentsList.student",
            model: "Student",
        });


        // if(allocatedInterview.studentsList && allocatedInterview.studentsList.length){

        allocatedInterview.studentsList.forEach(s => {

            console.log("list val in the std list is", s.student._id);
            console.log("passed student is", student._id);
            console.log(s.student._id.equals(student._id));

            if (s.student._id.equals(student._id)) {
                s.result = req.body.result;
                allocatedInterview.save();
                return res.redirect('back');
            }
            });
          
      
        } catch (err) {
    console.log('Erro in geeting studnts', err);
    return res.redirect("back");
}
};

