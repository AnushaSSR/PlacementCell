const express = require('express');
const passport = require('passport');
const router = express.Router();

const interviewController = require('../controllers/interview_controller');

router.post('/add-interview', interviewController.addInterview);

router.get('/display-interviews',interviewController.displayInterviews);
router.post('/allocate-student/:id', interviewController.allocateStudent);


router.get('/get-allocated-students/:id', interviewController.getAllocatedStudents);

// router.post('/allocate', interviewController.allocate);

module.exports= router;


