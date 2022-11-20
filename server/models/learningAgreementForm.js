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
    
    ownerStudent: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'erasmusCandidate'
    },
    
    
    
    
}, {
    timestamps: true
})





const LearningAgreementForm = mongoose.model('Forms/LearningAgreement', learningAgreementFormSchema)

module.exports = LearningAgreementForm