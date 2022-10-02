//Import the express and use it to listen to the port
const express = require('express');
const app = express();

const port = 8000;

app.use('/',require('./routes'));

//make the app listen tpo call on port and respond

//setthe app's view engine to ejs
app.set('view engine', 'ejs');
//settingthe path of the views
app.set('views','./views');

app.listen(port, function(err){
    if(err){
        console.log(`Error in loading server ${err}`);
    }
    console.log(`Serveris up and running on port ::${port}`);
});
