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

    erasmusCoordinators: [{
        erasmusCoordinator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ErasmusCoordinator',
        }
    }],

    hostUniversities: [{
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
    }]
}, {
    timestamps: true
})

const Department = mongoose.model('Department', departmentSchema)

module.exports = Department