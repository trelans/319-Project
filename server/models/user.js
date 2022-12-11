const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')
const ErasmusCandidate = require('./erasmusCandidate')


//var userKinds = { discriminatorKey: 'userType' };


const userSchema = new mongoose.Schema({
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
    userType: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error('User Type must be greater than zero')
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
    },


    //optional part for other users



    erasmusCandidate : {
        data : ErasmusCandidate
    }

    /*
    erasmusCoordinator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ErasmusCoordinator'
    },

    courseCoordinator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CourseCoordinator'
    },

    incomingStudent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'IncomingStudent'
    }

*/

    /*
    //erasmusCandidate
    erasmusCandidate: {
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
    },



     */






}, {
    timestamps: true
});

// not stored in db for mongoose
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

/*
userSchema.virtual('university', {
    ref: 'University',
    localField: '_id',
    foreignField: 'owner'
})
*/

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
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET, { expiresIn: '1h' })

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    console.log("user:" + user)
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

const User = mongoose.model('User', userSchema)

module.exports = User