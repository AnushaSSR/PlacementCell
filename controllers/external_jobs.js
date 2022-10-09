const axios = require("axios");


module.exports.getJobsList = function(req,res){
const jobs = {
  method: 'GET',
  url: 'https://serpapi.com/search.json?engine=google_jobs&q=node,react&hl=en&location=india&api_key=2969d88edb2c261399cec6607b9a8972a4e940ad1370ecc4239a8d841de8fef7',
  
};

axios.request(jobs).then(function (response) {
    console.log(response.data);
    let jobsList=response.data;

    return res.render("external_jobs",{
        title: "Externals jobs",
        jobsList:jobsList
    });
	}).catch(function (error) {
	console.error(error);
});
}