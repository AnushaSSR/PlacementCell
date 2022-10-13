const axios = require("axios");//Send asynchronous HTTP requests to REST APIs and conduct CRUD activities.

//controller to get the external jobs list
module.exports.getJobsList = async function (req, res) {
    let externalJobsList;

    //to get the details from the google jobs search results
    const externalJobs = {
        method: 'GET',
        //api call to be made get the search results
        url: 'https://serpapi.com/search.json?engine=google_jobs&q=node,react&hl=en&location=india&api_key=2969d88edb2c261399cec6607b9a8972a4e940ad1370ecc4239a8d841de8fef7',
    };
    await axios.request(externalJobs).then(function (response) {
        console.log("extenal jobs are", response.data);
        externalJobsList = response.data;
    }).catch(function (error) {
        console.error(error);
    });

    //get the remote jobs details
    const remoteJobs = {
        method: 'GET',
        //api call to be made get the search results
        url: 'https://remotive.io/api/remote-jobs?search=node,react&limit=10',
    };

    await axios.request(remoteJobs).then(function (response) {
        console.log("remote jobs are", response.data);
        let remoteJobsList = response.data;
        return res.render("external_jobs", {
            title: "External jobs",
            remoteJobsList: remoteJobsList,
            externalJobsList: externalJobsList
        });
    }).catch(function (error) {
        console.error(error);
    });
}