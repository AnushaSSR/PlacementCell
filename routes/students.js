const express = require('express');
const passport = require('passport');
const router = express.Router();

const studentController = require('../controllers/student_controller');

router.get('/student-details',studentController.display);
router.post('/add-student', studentController.create);

module.exports= router;


