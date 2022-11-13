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
    alternativeCourses: [{
        course: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Course'
        }
    }],
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

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
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
userSchema.pre('save', async function (next) {
    const user = this

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

/**
 * Delete user tasks when the user is removed
 */
userSchema.pre('remove', async function (next) {
    const user = this

    await Task.deleteMany({owner: user._id})

    next()
})

const Course = mongoose.model('Course', courseSchema)

module.exports = Course