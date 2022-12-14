const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    bilkentExemption: {
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

    universityName: {
        type: String,
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

const ForeignUniversityCourse = mongoose.model('ForeignUniversityCourse', courseSchema)

module.exports = ForeignUniversityCourse