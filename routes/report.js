const express= require('express');
const router =express.Router();
// //import passport for authentication
// const passport = require('passport');
// access the report controller
const reportController = require('../controllers/report_controller');
//route to download report
router.get('/download-report', reportController.downloadReport);


module.exports = router;
