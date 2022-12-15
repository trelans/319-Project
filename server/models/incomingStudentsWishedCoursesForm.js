/*
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

const incomingStudentWishedCoursesFormSchema = new mongoose.Schema({
    
    ownerApplication: {
        type: mongoose.SchemaType.Type.ObjectId,
        required: true,
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

    wishedCourses: [wishedCourse]

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


incomingStudentWishedCoursesFormSchema.methods.toJSON = function () {
    const form = this
    const formObject = form.toObject()

    delete formObject.password
    delete formObject.tokens
    delete formObject.avatar

    return formObject
}


const IncomingStudentsWishedCoursesForm = mongoose.model('IncomingStudentsWishedCoursesForm', incomingStudentWishedCoursesFormSchema)

module.exports = IncomingStudentsWishedCoursesForm
*/