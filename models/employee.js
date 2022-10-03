const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
      
    },
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        }
    ],
    interviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Interview'
        }
    ]
}, {
        timestamps: true
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;