const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/placement_cell_dev");

const db= mongoose.connection;
db.on('error', console.error.bind(console, "Error in connecting to MongoDB")); 

db.once('open', function(){

console.log(`Connected to Database :: MongoDB`);
}
);

module.exports=db;


