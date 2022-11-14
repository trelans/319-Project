const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    quota: {
        type: Number,
        default: 0,
    },

    erasmusCoordinator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },

    ownerUniversityId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'University'
    },

    fallSuitability: {
        type: Boolean,
        required: true
    },

    springSuitability: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
})

const Department = mongoose.model('Department', departmentSchema)

module.exports = Department