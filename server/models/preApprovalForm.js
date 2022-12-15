const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const wishedCourse = mongoose.Schema( {
    course: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Course'
    }

}, {_id: false});

const preApprovalFormSchema = new mongoose.Schema({
    
    ownerApplication: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Application'
    },

    courses: [wishedCourse],

    totalEctsCredits: {
        type: Number,
        required: true,
        default: 0
    },

    status: {
        type: Number,
        default: 1
    },

    PFDeadline: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})

// // not stored in db for mongoose
// userSchema.virtual('tasks', {
//     ref: 'Task',
//     localField: '_id',
//     foreignField: 'owner'
// })

/*
userSchema.virtual('university', {
    ref: 'University',
    localField: '_id',
    foreignField: 'owner'
})
*/



const PreApprovalForm = mongoose.model('Forms/PreApprovalForm', preApprovalFormSchema)

module.exports = PreApprovalForm