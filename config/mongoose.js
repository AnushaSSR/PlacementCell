const mongoose = require('mongoose');//require mongoose
mongoose.connect("mongodb://localhost/placement_cell_dev");

const db = mongoose.connection;//connection to database

//if any error in connectingto database
db.on('error', console.error.bind(console, "Error in connecting to MongoDB"));

//Connection to database is succesful
db.once('open', function () {
    console.log(`Connected to Database :: MongoDB`);
});

module.exports = db;


