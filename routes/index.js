// Entry point for all the routes

const express= require('express');
const router =express.Router();

// accessthe home controller
const homeController = require('../controllers/home_controller'); 
router.get('/', homeController.home);
console.log("Router loaded");
module.exports = router;