const Interview = require("../models/interviews"); //Interview model
const Student = require("../models/student"); //Student model

//controller to add an new interview
module.exports.addInterview = async function (req, res) {
  let interviews = await Interview.find({}); //find the interviews
  let students = await Student.find({}); //find the students
  try {
    //fetch the interview details
    let interview = await Interview.find({
      company_name: req.body.company_name,
      date: req.body.date,
    });
    if (interview && interview.length) {
      //if exists
      req.flash("error", "Interview already scheduled on same date");
      return res.redirect("back");
    } else {
      //not existing, create a new record
      let interview = await Interview.create({
        company_name: req.body.company_name,
        date: req.body.date,
      });
      await interview.save();
      req.flash("success", "New Interview added to the list");
      res.redirect("back");
    }
  } catch (err) {
    //catch errors
    if (err) {
      console.log("Error in creating interview", err);
      return;
    }
    return res.redirect("back");
  }
};

//controller to diplay the list of interviews added
module.exports.displayInterviews = async function (req, res) {
  let interviews = await Interview.find(); //fetch the interviews
  let students = await Student.find(); //fetch the students
  try {
    //render interview and students details to interview_details view
    return res.render("interview_details", {
      title: "Placement Cell | Interview Details Page",
      interviews: interviews,
      students: students,
    });
  } catch (err) {
    console.log("Error in fetching interviews list", err);
    return res.redirect("back");
  }
};

//controller to allocate student/s to an interview
module.exports.allocateStudent = async function (req, res) {
  let interviews = await Interview.find(); //fetch the interview
  let students = await Student.find(); //fetch the students
  let addedStudentList = req.body.checkbox; //get the students to be added list from the from the body
  try {
    //iterate over the list fetched
    for (let s of addedStudentList) {
      let allocatedStudent = await Student.findById(s).populate(); //check if student is already allocated and populate
      let allocStd = {
        student: allocatedStudent,
        result: " ",
      };
      let allocatedInterview = await Interview.findById(req.params.id); //get the interview, for which the student is allocated to

      //filter if the student to be allocated is already allocted to the interview
      let currentAllocatedStudent = allocatedInterview.studentsList.filter(
        (s) => {
          return s.student.equals(allocatedStudent._id);
        }
      );

      //if not allocated
      if (!currentAllocatedStudent.length) {
        //if student not allocated to interview, push to list
        allocatedInterview.studentsList.push(allocStd);
      }
      await allocatedInterview.save();
    }
    //render the interviews and students data to interview_details view
    return res.render("interview_details", {
      title: "Placement Cell | Interview Details Page",
      interviews: interviews,
      students: students,
    });
  } catch (err) {
    console.log("Error in allocating student to an interview", err);
    return res.redirect("back");
  }
};

//controller to render the students allocated to an interview to update the results
module.exports.getAllocatedStudents = async function (req, res) {
  try {
    let interview = await Interview.findById(req.params.id).populate({
      path: "studentsList.student",
      model: "Student",
    }); //fetch the interview by id and populate the student details
    let students = await Student.find({}); //find the students

    //render the interviews and students data to update_results view
    return res.render("update_results", {
      title: "Placement Cell | Update Interview Results",
      interview: interview,
      students: students,
    });
  } catch (err) {
    console.log("Error in getting allocated studnts", err);
    return res.redirect("back");
  }
};

// controller to update the results of the students
module.exports.updateResults = async function (req, res) {
  let studentId = req.body.student;

  try {
    let student = await Student.findById(studentId); //fetch students by their id

    let allocatedInterview = await Interview.findById(
      req.params.interview
    ).populate({
      path: "studentsList.student",
      model: "Student",
    }); //fetch the student's allocated to interview by the id sent in params

    if (
      allocatedInterview.studentsList &&
      allocatedInterview.studentsList.length
    ) {
      //if allocated interview has students
      allocatedInterview.studentsList.forEach((s) => {
        if (
          s.student._id.equals(student._id) &&
          s.result !== req.body.result &&
          req.body.result !== undefined
        ) {
          //if result is not null / undefined and student is in the allocated list update the result
          s.result = req.body.result;
          allocatedInterview.save();
          req.flash(
            "success",
            `Result of ${s.student.name} updated to ${s.result}`
          );
        }
      });
      return res.redirect("back");
    }
  } catch (err) {
    return res.redirect("back");
  }
};
