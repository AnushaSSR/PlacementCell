const mongoose = require('mongoose');
const interviewSchema = new mongoose.Schema({
    //interview conducted by: Company name
    company_name: {
        type: String,
        required: true,
    },
    //interview date
    date: {
        type:Date,
        required: true
    } ,   
    //list of student attended an interview with their results 
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