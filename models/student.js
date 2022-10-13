const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    //student's name
    name: {
        type: String,
        required: true
    },
    //student's college name
    college: {
        type: String,
        required: true
    },
    //student's email 
    email: {
        type: String,
        required: true
    },
    //student's batch
    batch: {
        type: String,
        required: true
    },
    //student's placement batch
    status: {
        type: String,
        enum: ['placed','not_placed'],
        required: true
    },
    //student's scores
    scores: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Scores"
    }
}, {
    timestamps: true
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;