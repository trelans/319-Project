const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const learningAgreementFormSchema = new mongoose.Schema({
    
    ownerApplication: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Application'
    },
    
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



const LearningAgreementForm = mongoose.model('Forms/LearningAgreement', learningAgreementFormSchema)

module.exports = LearningAgreementForm