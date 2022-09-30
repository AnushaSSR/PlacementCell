//Import the express and use it to listen to the port
const express = require('express');
const app = express();

const port = 8000;

//make the app listen tpo call on port and respond

app.listen(port, function(err){
    if(err){
        console.log(`Error in loading server ${err}`);
    }
    console.log(`Serveris up and running on port ::${port}`);
});
