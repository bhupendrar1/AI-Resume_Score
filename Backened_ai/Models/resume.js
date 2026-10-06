const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    userEmail: {
        type: String,
        default: ''
    },
    userName: {
        type: String,
        default: ''
    },
    resume_name: {
        type: String,
        required: true
    },
    job_desc: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    atsScore: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    feedback: {
        type: String,
        default: ''
    },
    skillsMatched: {
        type: [String],
        default: []
    },
    skillsMissing: {
        type: [String],
        default: []
    },
    strengths: {
        type: [String],
        default: []
    },
    improvements: {
        type: [String],
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model('resume', ResumeSchema);
