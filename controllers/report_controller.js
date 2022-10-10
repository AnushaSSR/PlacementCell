const Interview = require('../models/interviews');
const Student = require('../models/student');
const Score = require('../models/course_scores');
const csvWriter= require('json-2-csv');
const fs= require('fs');

module.exports.downloadReport = async function(req,res) {
    try {
        //fetch interview and populate the students and their scores
        const interview = await Interview.find().populate({
            path:"studentsList.student",
            model:"Student",
            populate: {
                path: "scores",
                model: "Scores"
            }
        });

        //Create a array list to stote the JSON data
        const studentsData=[];

        //Form the objects from the values and formatting them if needed
        for(i of interview) {
            for(s of i.studentsList) {
                let obj= {};
                //get the value from the objcet id
                let db_student_id= s.student._id;
                let student_id= db_student_id.valueOf();
                obj["Student ID"] = student_id;
                
                obj["Student Name"] = s.student.name;
                obj["Student College"] = s.student.college;
                obj["Student Status"] = s.student.status;
                obj["DSA Final Score"] = s.student.scores.dsa_score;
                obj["WebD Final Score"] = s.student.scores.webd_score;
                obj["React Final Score"] = s.student.scores.react_score;
                //to format the date in dd/mm/yy  format
                let dateVal = new Date(i.date);
                let date= (dateVal.toLocaleString('en-GB', {day:'numeric', month: 'numeric', year:'numeric'}));
                obj["Interview Date"]= date;

                obj["Interview Company"]= i.company_name;
                obj["Interview Student Result"]= s.result;
                

              
                studentsData.push(obj);
            }

            
        }

        console.log("Student data list is");
        console.log(studentsData);
        // const data = JSON.parse(studentsData);
    const report = await csvWriter.json2csvAsync(studentsData);
    console.log(report);



    res.setHeader('Content-disposition', 'attachment: filename=report.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(report);

    

    fs.writeFileSync('studentReport.csv', report);
    } catch(err) {
        console.log(err);
    }
}