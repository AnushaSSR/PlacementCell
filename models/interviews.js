const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: true,

    },
    date: {
        type: Date,
        required: true,
    },

    job_description: {
        type: String,
        required: true,

    },

    students_list: [
        {
            students: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Student'
                }
            ],
            result: {
                type: String,
                enum: [PASS, FAIL, ON_HOLD, DIDNT_ATTEMPT],
                required: true
            }
        }
    ]
}, {
    timestamps: true
});

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;