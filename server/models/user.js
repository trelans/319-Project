const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')
const {Model} = mongoose
//var userKinds = { discriminatorKey: 'userType' };

// Mongoose creates id for SubDocuments automatically, create this method to override it
const department = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    },
    //0 major, 1 minor
    type: {
        type: Number,
        default: 0
    }
}, {_id: false});

const preferredUniversity = mongoose.Schema({
    university: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'University'
    }

}, {_id: false});

// Erasmus Coordinator Schemas
const assignedUniversity = mongoose.Schema({
    universityId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'University'
    }
}, {_id: false});

const assignedTask = mongoose.Schema({
    task: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Task'
    }
}, {_id: false});


const token = mongoose.Schema({
    token: {
        type: String,
        //required: true
    }


}, {_id: false});


/*
const erasmusCandidate = mongoose.Schema({
    data : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'ErasmusCandidateModel',
        required : false,
    }
}, {_id: false});
*/

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
        //unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!(value.length > 6 && !(value.toLowerCase().includes("password")))) {
                throw new Error('Invalid password')
            }
        }
    },
    userType: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
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
    contacts: {
        type: Array,
        default: []
    },


    //optional part for other users

    erasmusCandidateData: {
        isActiveCandidate: {
            type: Boolean,
            default: false
        },

        // ENG notes + cpga ile hesaplanan erasmus placement puanı
        totalPoints: {
            type: Number,
            default: 0
        },

        preferredSemester: {
            type: Number,
            default: 0
            //required: true
        },

        nominatedUniversityId: {
            type: mongoose.Schema.Types.ObjectId,
            //required: true,
            ref: 'University'
        },

        signature: {
            type: String,
            //required: true
        },

        academicYear: {
            type: Number,
            //required: true
        },

        preferredUniversities: [preferredUniversity],
        departments: [department],

        studentId: {
            type: Number,
            default: 0
        },
    },


    erasmusCoordinatorData: {
        department: {
            type: String
        },
        coordinatorID: {
            type: Number
        },

        assignedUniversities: [assignedUniversity],
        assignedTasks: [assignedTask],
    },

    facultyMemberData: {
        faculty: {
            type: String
        }
    },

    courseCoordinatorData: {

        department: {
            type: String,
        },
        coordinatorID: {
            type: Number,
        },

        assignedTasks: [assignedTask],
    },


    incomingStudentData: {

        departments: [department],

        studentId: {
            type: Number,
        },

        sendingInstitution: {
            type: String,
            //required: true
        },

        studyCycle: {
            type: String,
            //required: true
        }
    }

}, {
    timestamps: true
});

// not stored in db for mongoose
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.virtual('notifications', {
    ref: 'Notification',
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

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({
        _id: user._id.toString(),
        name: user.name,
        surname: user.surname,
        userType: user.userType,
        contacts: user.contacts
    }, process.env.JWT_SECRET, {expiresIn: '1h'})

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})

    console.log("user:" + user)
    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login (passwords not match)')
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

    await Task.deleteMany({owner: user._id})

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User