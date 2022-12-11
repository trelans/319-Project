const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')
const Enum = require('enum')
const User = require('./user')

/*
Course Coordinator -- 1
Erasmus Coordinator -- 2
Erasmus Candidate -- 3
Incoming Student -- 4
 */

const userTypeEnum = new Enum({
    'Course Coordinator': 0,
    'Erasmus Coordinator': 1,
    'Erasmus Candidate': 2,
    'Incoming Student': 3,
    'Default User': 4
})


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
}, {_id: false});

const preferredUniversity = mongoose.Schema({
    university: {
        type: mongoose.Schema.Types.ObjectId,
        //required: true,
        ref: 'University'
    }

}, {_id: false});

const token = mongoose.Schema({
    token: {
        type: String,
        //required: true
    }


}, {_id: false});

const erasmusCandidateSchema = mongoose.Schema({

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
    userType: {
        type: Number,
        //enum: ['Erasmus Candidate'],
        default: 0,


        validate(value) {
            if (value < 0 || value > 5) {
                throw new Error('User Type must be greater than zero')
            }
        }
    },

    email: {
        type: String,
        unique: true,
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

    avatar: {
        type: Buffer
    },

    tokens: [token],


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
    }

}, {
    timestamps: true
}) )

//const erasmusCandidate = User.discriminator('ErasmusCandidate', erasmusCandidateSchema);

// not stored in db for mongoose
/*
erasmusCandidateSchema.virtual('applications', {
    ref: 'Application',
    localField: '_id',
    foreignField: 'applicantCandidate'
})
*/

erasmusCandidateSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

erasmusCandidateSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET, {expiresIn: '1h'})

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

erasmusCandidateSchema.statics.findByCredentials = async (email, password) => {
    const user = await ErasmusCandidate.findOne({email})
    console.log(user)

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
erasmusCandidateSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
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