const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

// Mongoose creates id for SubDocuments automatically, create this method to override it
const department = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        default: "noDepartment",
        ref: 'Department'
    },
    //0 major, 1 minor
    type: {
        type: Number,
        default: 0
    }
}, { _id : false });

const erasmusCandidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    active: {
        type: Boolean,
        default: false
    },
    isActiveCandidate: {
        type: Boolean,
        default: false
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

    // ENG notes + cpga ile hesaplanan erasmus placement puanı
    totalPoints: {
        type: Number,
        default: 0
    },

    preferredSemester: {
        type: Number,
        required: true
    },
    nominatedUniversityId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'University'
    },

    signature: {
        type: String,
        required: true
    },

    academicYear: {
        type: Number,
        required: true
    },

    //prefferred universities string arr mı olmalı
    //yoksa university arrayi mi
    preferredUniversities: [{
        University: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'University'
        }
    }],

    departments:[department],

    studentId: {
        type: Number,
        default: 0
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Invalid email!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if(!(value.length > 6 && !(value.toLowerCase().includes("password")))) {
                throw new Error('Invalid password')    
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

// not stored in db for mongoose
erasmusCandidateSchema.virtual('applications', {
    ref: 'Application',
    localField: '_id',
    foreignField: 'applicantCandidate'
})

erasmusCandidateSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

erasmusCandidateSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET, { expiresIn: '1h' })

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

erasmusCandidateSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    if(!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

/**
 * Hash the plain text password before saving
 */
erasmusCandidateSchema.pre('save', async function (next) {
    const user = this

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

/**
 * Delete user tasks when the user is removed
 */
erasmusCandidateSchema.pre('remove', async function (next) {
    const user = this

    await Task.deleteMany({owner: user._id})

    next()
})

const ErasmusCandidate = mongoose.model('ErasmusCandidate', erasmusCandidateSchema)

module.exports = ErasmusCandidate