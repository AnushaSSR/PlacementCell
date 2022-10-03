const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    college: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true

    },
    batch: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: [placed, not_placed],
        required: true
    },
    dob: {
        type: Date,
        required: true,
    },
 

}, {
    timestamps: true
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;