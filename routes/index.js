// Entry point for all the routes
const express= require('express');
const router =express.Router();

// accessthe home controller
const homeController = require('../controllers/home_controller'); 
router.get('/', homeController.home);

//use the employee route
router.use('/employee',require('./employee'));
//use the students route
router.use('/students',require('./students'));
//use the interviews route
router.use('/interviews',require('./interviews'));
//use the external jobs route
router.use('/external-jobs', require('./external_jobs'));
//use the report route
router.use('/report', require('./report'));

module.exports = router;