// Entry point for all the routes
const express= require('express');
const router =express.Router();
//import passport for authentication
const passport = require('passport');

// access the employee controller
const employeeController = require('../controllers/employee_controller'); 

//route for employee sign up
router.get('/sign-up', employeeController.signUp);

//route for employee sign in
router.get('/sign-in', employeeController.signIn);

//route to post the employee sign up data
router.post('/create', employeeController.create);

//route to create a seesion for the employee sign in 
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/employee/sign-in'},
), employeeController.createSession);

//destroy the session of a employee
router.get('/sign-out', employeeController.destroySession);


module.exports = router;