const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    //employee's email
    email:{
        type: String,
        required: true,
        unique: true
    },
    //employee's login password
    password: {
        type: String,
        required: true,
    },
    //employee's name
    name: {
        type: String,
        required: true,
    }
}, {
        timestamps: true
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;