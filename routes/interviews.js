const express = require('express');
const router = express.Router();

// access the interview controller
const interviewController = require('../controllers/interview_controller');
//route to add a new interview to the list
router.post('/add-interview', interviewController.addInterview);
//route to display the list of added interview
router.get('/display-interviews',interviewController.displayInterviews);
//route to allocate students to an interview
router.post('/allocate-student/:id', interviewController.allocateStudent);
//route to get the allocated students list to update the result
router.get('/get-allocated-students/:id', interviewController.getAllocatedStudents);
//route to update the result of the students of an interview
router.post('/update-results/:interview', interviewController.updateResults);

module.exports= router;


