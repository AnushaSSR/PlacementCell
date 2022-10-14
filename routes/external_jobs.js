const express= require('express');
const router =express.Router();

//external jobs controllers
const externalJobsController = require('../controllers/external_jobs'); 

//route to get the external jobs 
router.get("/get-job-list",externalJobsController.getJobsList);

module.exports= router;
