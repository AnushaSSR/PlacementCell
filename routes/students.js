const express = require('express');
const passport = require('passport');
const router = express.Router();

const studentController = require('../controllers/student_controller');

router.post('/create',passport.checkAuthentication, studentController.create);

module.exports= router;


