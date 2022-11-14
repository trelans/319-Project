const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const erasmusCoordinatorSchema = new mongoose.Schema({
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
    department: {
        type: String,
        default: "noDepartment"
    },
    coordinatorID: {
        type: Number,
        required: true        
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
    //default hali olmalı boş uni arr olarak?
    assignedUniversities: [{
        university: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'University'
        }
    }],
    assignedTasks: [{
        task: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Task' 
        }
    }],
    signature: {
        type: String,
        required: true,
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
erasmusCoordinatorSchema.virtual('tasks', {
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

erasmusCoordinatorSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

erasmusCoordinatorSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET, { expiresIn: '1h' })

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

erasmusCoordinatorSchema.statics.findByCredentials = async (email, password) => {
    const user = await ErasmusCoordinator.findOne({email})
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
 erasmusCoordinatorSchema.pre('save', async function (next) {
    const user = this

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

/**
 * Delete user tasks when the user is removed
 */
 erasmusCoordinatorSchema.pre('remove', async function (next) {
    const user = this

    await Task.deleteMany({owner: user._id})

    next()
})

const ErasmusCoordinator = mongoose.model('ErasmusCoordinator', erasmusCoordinatorSchema)

module.exports = ErasmusCoordinator