const axios = require("axios");


module.exports.getJobsList = async function(req,res){
    let externalJobsList;
      
const externalJobs = {
    method: 'GET',
    url: 'https://serpapi.com/search.json?engine=google_jobs&q=node,react&hl=en&location=india&api_key=2969d88edb2c261399cec6607b9a8972a4e940ad1370ecc4239a8d841de8fef7',
    
  };
  
  await axios.request(externalJobs).then(function (response) {
      console.log("extenal jobs are",response.data);
      externalJobsList=response.data;
  
      }).catch(function (error) {
      console.error(error);
  });
const remoteJobs = {
  method: 'GET',
  url: 'https://remotive.io/api/remote-jobs?search=node,react&limit=10',
  
};

await axios.request(remoteJobs).then(function (response) {
    console.log("remote jobs are",response.data);
    let remoteJobsList=response.data;

    return res.render("external_jobs",{
        title: "External jobs",
       
        remoteJobsList:remoteJobsList,
        externalJobsList:externalJobsList

    });
	}).catch(function (error) {
	console.error(error);
});


}