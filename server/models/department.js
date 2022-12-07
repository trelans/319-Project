const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

erasmusCoordinator = mongoose.Schema({
    coordinator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ErasmusCoordinator',
    }

}, {_id: false});

hostUniversity = mongoose.Schema({
    universityId: {
        type: Number,
        required: true,
        ref: 'University'
    },
    quota: {
        type: Number,
        default: 0,
    },
    fallSuitability: {
        type: Boolean,
        default: false
    },

    springSuitability: {
        type: Boolean,
        default: false
    }
}, {_id: false});


const departmentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    erasmusCoordinators: [erasmusCoordinator],

    hostUniversities: [hostUniversity]

}, {
    timestamps: true
})

const Department = mongoose.model('Department', departmentSchema)

module.exports = Department