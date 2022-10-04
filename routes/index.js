// Entry point for all the routes

const express= require('express');
const router =express.Router();

// accessthe home controller
const homeController = require('../controllers/home_controller'); 
router.get('/', homeController.home);
//use the employee route
router.use('/employee',require('./employee'));
router.use('/students',require('./students'));
console.log("Router loaded");
module.exports = router;