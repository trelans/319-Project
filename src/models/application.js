const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')
const Form = require('./')

const applicationSchema = new mongoose.Schema({
    status: {
        type: Number,
        default: 0,
        required: true
    },

    applicantUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    appliedInstitution: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'University',
    },

    responsibleErasmusCoord: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },

    forms: [{
        form: {
            type: 
            required: true
        }
    }]

    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],

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

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

/**
 * Hash the plain text password before saving
 */
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

/**
 * Delete user tasks when the user is removed
 */
userSchema.pre('remove', async function (next) {
    const user = this

    await Task.deleteMany({ owner: user._id })

    next()
})

const Application = mongoose.model('Application', applicationSchema)

module.exports = Application