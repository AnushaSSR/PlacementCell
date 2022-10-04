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
    },
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }
}, {
        timestamps: true
});

const Scores = mongoose.model('Scores', scoresSchema);

module.exports = Scores;