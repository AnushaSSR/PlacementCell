const express = require('express');
const passport = require('passport');
const router = express.Router();

const studentController = require('../controllers/student_controller');

router.get('/display-students',studentController.displayStudents);
router.post('/add-student', studentController.addStudent);

module.exports= router;


