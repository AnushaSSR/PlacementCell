const express= require('express');
const router =express.Router();

const externalJobsController = require('../controllers/external_jobs'); 

router.get("/get-job-list",externalJobsController.getJobsList);

module.exports= router;
