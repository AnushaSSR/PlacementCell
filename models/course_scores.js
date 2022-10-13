const mongoose = require('mongoose');

const scoresSchema = new mongoose.Schema({
    //student's score: dsa 
    dsa_score:{
        type: String,
        required: true,
    },
    //student's score: webd 
    webd_score: {
        type: String,
        required: true,
    },
    //student's score: react 
    react_score: {
        type: String,
        required: true,
    },
    //mapping to the student
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }
}, {
        timestamps: true
});

const Scores = mongoose.model('Scores', scoresSchema);

module.exports = Scores;