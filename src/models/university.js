const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const universitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    departments:[{
        department: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Department',
        },
    }],

    universityId: {
        type: Number,
        default: 0
    },

    fallSuitability: {
        type: Boolean,
        required: true
    },

    springSuitability: {
        type: Boolean,
        required: true
    },

    applicationLink: {
        type: String,
        default: 'No application link provided...'
    },
    
    mobilityPeriod: {
        type: String,
        required: true
    },
    
    // userType: {
    //     type: Number,
    //     default: 0,
    //     validate(value) {
    //         if(value < 0) {
    //             throw new Error('User Type must be greater than zero')
    //         }
    //     }
    // },
    
    feedbacks: [{
        feedback: {
            type: String,
            required: true
        },
        feedbackOwner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ErasmusCandidate'
        }
    }],
    
    appliedStudents: [{
        student: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'ErasmusCandidate'
        }
    }],
    
    languageRequirement: [{
        requiredLanguages: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})


/*
userSchema.virtual('university', {
    ref: 'University',
    localField: '_id',
    foreignField: 'owner'
})
*/



universitySchema.methods.toJSON = function () {
    const university = this
    const universityObject = university.toObject()
    
    return universityObject
}


universitySchema.statics.findByName = async (name) => {
    const university = await University.findOne({name})

    if(!university) {
        throw new Error('Unable to the university')
    }

    return university
}

const University = mongoose.model('University', universitySchema)

module.exports = University