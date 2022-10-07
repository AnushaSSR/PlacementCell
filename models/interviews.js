const mongoose = require('mongoose');
const interviewSchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: true,

    },
    date: {
        type:Date,
        required: true
    } ,

    
    studentsList: [
        {
            student: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Student'
                },    
            result: {
                type: String,
                enum: ['PASS', 'FAIL', 'ON_HOLD', 'DIDNT_ATTEMPT',' ']
            },
        },
    ],
}, {
    timestamps: true
});

const Interviews = mongoose.model('Interviews', interviewSchema);

module.exports = Interviews;