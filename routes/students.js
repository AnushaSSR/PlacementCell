const express = require('express');
const passport = require('passport');
const router = express.Router();

// access the student controller
const studentController = require('../controllers/student_controller');

//route to display the students list
router.get('/display-students',studentController.displayStudents);

//route to add a new student to the list
router.post('/add-student', studentController.addStudent);

module.exports= router;


