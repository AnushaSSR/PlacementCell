const Student = require('../models/student');
const Scores = require('../models/course_scores');
const { students } = require('./employee_controller');


module.exports.addStudent = async function (req, res) {
    try {
        let student = await Student.find({ email: req.body.email });
       
        if (student && student.length) {
            // console.log("student exists");
            return res.redirect('back');         
        }
        else {
            // console.log("Adding Student");        
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
                let students = await Student.findOne({}).populate("score");
           
            return res.render("student_details", {
                    title:"Placement Cell | Student Details",
           
                    students: students,
                    scores: scores
            });
        }
    
}
    catch (err) {
        if (err) { console.log("error in adding student", err); return }
        return res.redirect('back');
    }
}


module.exports.displayStudents =async function(req, res) {
    try{
        let students= await Student.find().populate("scores");
        // console.log("styudent details rendred are", students);
        return res.render("student_details",{
            title:"Placement Cell | Student Details",
            students: students
        });
    }
        catch(err) {console.log("error in fetching students list",err);
        return res.redirect('back');
    };
}
