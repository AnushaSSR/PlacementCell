const Interview = require('../models/interviews');
const Student = require('../models/student');
       
module.exports.addInterview = async function (req, res) {
    let interviews = await Interview.find({});   
let students= await Student.find({});

    try {
        let interview = await Interview.find({ company_name: req.body.company_name} && {date:req.body.date});
       
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
            return res.render("interview_details", {
                title:"Placement Cell | Interview Details",
                interviews: interviews,
                students: students          
            });
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

module.exports.displayInterviews =async function(req, res) {
    let interviews= await Interview.find();
    let students= await Student.find();
   try{
    // let interview= await Interview.find().populate("students");

        // console.log("interview details rendered are", interviews);
        return res.render("interview_details",{
            title:"Placement Cell | Interview Details",
            interviews: interviews,
            students: students
        });
    }catch(err) {console.log("error in fetching students list",err);
        return res.redirect('back');
    }
   }


module.exports.allocateStudent =async function(req, res) {

    let id= req.params.id;
    let id_body= req.body.id;
    let stdlist = req.body.checkbox;
    // console.log(id);
    // console.log(`body id is`,id_body);
    try{ 
        let interviews= await Interview.find();
        let students = await Student.find();
        
        for (let s of stdlist) {
            // let allocateStd= await Interview.findById(s).populate({
            //     path:"studentsList.student",
            //     model: "Student"
    
            // });
    
            let allocatedStd= await Student.findById(s).populate();
            const allocStd= {
                student: allocatedStd,
                result: " "
            }
            // console.log(`allocated student is ***********************`,allocatedStd);            
            let int= await Interview.findById(id);
            
            // console.log("*************************************************",int);
           let currentAllocatedStudent = int.studentsList.filter(student =>{
            // console.log(student.student);
            // console.log(allocatedStd._id);
                return student.student.equals(allocatedStd._id);
           });


            // console.log('length is ********************************',currentAllocatedStudent);
            if(!currentAllocatedStudent.length){
            int.studentsList.push(allocStd);
        }

        

            await int.save();    
        }
    return res.render("interview_details",{
        title:"Placement Cell | Interview Details",
        interviews: interviews,
        students: students });
}catch(err) {console.log("error in fetching students list",err);
        return res.redirect('back');
    };
  
}





module.exports.getAllocatedStudents =async function(req, res) {

    let interviewId = req.params.id;
    console.log(`***********************************`,interviewId);


    let interview= await Interview.findById(interviewId);
let studentList= interview.studentsList;
    console.log(`student list student is `,studentList);

    studentList.forEach(s=> {
        console.log(`student list student id is `,s);

    });

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
   
return res.render('update_results', {
    title: "update students"
});
}



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
  
// }