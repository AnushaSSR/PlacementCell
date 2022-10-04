//Import the express and use it to listen to the port
const express = require('express');
const app = express();
//Uding the port 8000
const port = 8000;
//to import the express layouts
const expressLayouts = require('express-ejs-layouts');
const db= require('./config/mongoose');
const session = require('express-session');


// for authentication
//need to require both, for this to work
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const MongoStore= require('connect-mongo');

app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('cookie-parser')());

//telling the app to use it, to be used before the routes
app.use(expressLayouts);

app.set('layout extractStyles',true);
app.set('layout extractLayouts', true);
//set the app's view engine to ejs
app.set('view engine', 'ejs');
app.set('views','./views');


app.use(session({
    name:"Placement Cell",
    secret:"blahsecret",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge:(1000*60*100)
    },
    store: MongoStore.create({
        mongoUrl:"mongodb://localhost/placement_cell_dev",
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err|| 'connect-mongodb setup ok');
    })
}));
app.use(passport.initialize());
app.use(passport.session());


//set current user's usage
app.use(passport.setAuthenticatedUser);

// //setting the path of the views
// app.set('views','./views');


app.use('/',require('./routes'));

//make the app listen to call on port and respond

app.listen(port, function(err){
    if(err){
        console.log(`Error in loading server ${err}`);
    }
    console.log(`Server is up and running on port ::${port}`);
});
