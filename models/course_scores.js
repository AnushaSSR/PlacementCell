const mongoose = require('mongoose');

const scoresSchema = new mongoose.Schema({
    dsa_score:{
        type: String,
        required: true,
    },
    webd_score: {
        type: String,
        required: true,
    },
    react_score: {
        type: String,
        required: true,
    } 
}, {
        timestamps: true
});

const Scores = mongoose.model('Scores', scoresSchema);

module.exports = Scores;