const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const alternativeCourse = mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Course'
    }

}, {_id: false});

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    courseCode: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    courseType: {
        type: Number,
        required: true,
        trim: true
    },
    courseID: {
        type: Number,
        required: true,
        trim: true
    },

    alternativeCourses: [alternativeCourse],

    syllabusLink: {
        type: String,
        required: false,
        trim: true,
        default: 'No link provided'   
    },
    courseWebPage: {
        type: String,
        required: false,
        trim: true,
        default: 'No Webpage Provided'    
    },
    universityID: {
        type: Number,
        required: true,
        trim: true
    },
    ectsCredits: {
        type: Number,
        required: true,
        trim: true
    },
    courseLanguage: {
        type: String,
        required: true,
        trim: true
    },
    previousAcceptance: {
        type: Boolean,
        required: false,
        trim: true,
        default: false
    },
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

// not stored in db for mongoose
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}



const Course = mongoose.model('Course', courseSchema)

module.exports = Course