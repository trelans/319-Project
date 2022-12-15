const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const courseToTransfer = mongoose.Schema( {
    course: {
        type: mongoose.Schema.Types.ObjectId,
        //required: true,
        ref: 'Course'
    },
    grade: String

}, {_id: false});

const courseTransferForm = new mongoose.Schema({

    ownerApplication: {
        type: mongoose.Schema.Types.ObjectId,
        //required: true,
        ref: 'Application'
    },
    userType: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error('User Type must be greater than zero')
            }
        }
    },

    coursesToTransfer: [courseToTransfer],

    approveChair: {
        type: String,
        //required: true
    },
    approveExchangeCoordinator: {
        type: mongoose.Schema.Types.ObjectId,
        //required: true,
        ref: 'ErasmusCoordinator'
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

courseTransferForm.methods.toJSON = function () {
    const form = this
    const formObject = form.toObject()

    delete formObject.password
    delete formObject.tokens
    delete formObject.avatar

    return formObject
}


const CourseTransferForm = mongoose.model('CourseTransferForm', courseTransferForm)

module.exports = CourseTransferForm