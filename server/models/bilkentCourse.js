const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')


const exemptedCourse = mongoose.Schema({
    courseName: {
        type: String,
        trim: true,
    },
    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'ForeignUniversityCourse'
    }
}, {_id: false});

const university = mongoose.Schema({
    universityName: {
        type: String,
        trim: true,
    },
    universityID: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'University'
    },
    exemptedCourses: [exemptedCourse]
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
        trim: true,
        uppercase: true
    },
    courseType: {
        type: String,
        required: true,
        trim: true
    },

    foreignUniversities: [university],

    ectsCredits: {
        type: Number,
        required: true,
        trim: true
    },
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})



const BilkentCourse = mongoose.model('BilkentCourse', courseSchema)

module.exports = BilkentCourse