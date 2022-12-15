const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')


const wishedCourse = mongoose.Schema( {
    course: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Course'
    }

}, {_id: false});

const courseToTransfer = mongoose.Schema( {
    course: {
        type: mongoose.Schema.Types.ObjectId,
        //required: true,
        ref: 'Course'
    },
    grade: String

}, {_id: false});

const componentOfStudyProgramAtReceivingIns = mongoose.Schema({
    componentCode: {
        type: String,
        required: true
    },
    componentTitle: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    ectsCredits: {
        type: Number,
        required: true
    }
}, {_id: false});


const componentOfRecognitionAtSendingIns = mongoose.Schema({
    componentCode: {
        type: String,
        required: true
    },
    componentTitle: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    ectsCredits: {
        type: Number,
        required: true
    }
}, {_id: false});

const componentOfChangedStudyProgram = mongoose.Schema({
    componentCode: {
        type: String,
        required: true
    },
    componentTitle: {
        type: String,
        required: true
    },
    isComponentAdded: {
        type: Boolean,
        required: true
    },
    isComponentDeleted: {
        type: Boolean,
        required: true
    },
    reasonForChange: {
        type: String,
        required: true
    },
    ectsCredits: {
        type: Number,
        required: true
    }
}, {_id: false});

const componentOfChangedRecognitionTable = mongoose.Schema({
    componentCode: {
        type: String,
        required: true
    },
    componentTitle: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    ectsCredits: {
        type: Number,
        required: true
    }
}, {_id: false});

const componentOfAcademicOutcomesAtReceivingIns = mongoose.Schema({
    componentCode: {
        type: String,
        required: true
    },
    componentTitle: {
        type: String,
        required: true
    },
    isComponentComplete: {
        type: Boolean,
        required: true
    },
    ectsCredits: {
        type: Number,
        required: true
    },
    grade: {
        type: String,
        required: true
    }
}, {_id: false});

const componentOfRecognitionOfOutcomesAtSendingIns = mongoose.Schema({
    componentCode: {
        type: String,
        required: true
    },
    componentTitle: {
        type: String,
        required: true
    },
    ectsCredits: {
        type: Number,
        required: true
    },
    grade: {
        type: String,
        required: false
    }
}, {_id: false});




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

const token = mongoose.Schema({
    token: {
        type: String,
        required: true
    }

}, {_id : false});

const ownerApplicant = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

//general form schema
const formSchema = new mongoose.Schema({

    //owner user -- required data will be taken from the user.
    owner: ownerApplicant,

    learningAgreementForm : {

        status: {
            type: Number,
            default: 1
        },

        LAFDeadline: {
            type: String,
            required: true
        },

        studyCycle: {
            type: String,
            //require: true
        },

        subjectAreaCode: {
            type: String, //sample subject area code: 01.5 or 13.6 -- double / string ??
            //require: true
        },

        sendingInstitution: {
            type: mongoose.Schema.Types.ObjectId,
            //required: true,
            ref: 'University',
        },

        sendingFaculty: {
            type: String,
            //required: true,
        },

        sendingDepartment: {
            type: mongoose.Schema.Types.ObjectId,
            //required: true,
            ref: 'Department'
        },

        sendingContactPerson: {
            sendingContactPersonName: {
                type: String,
                //required: true
            },
            sendingContactPersonEmail: {
                type: String,
                //required: true
            },
            sendingContactPersonPhone: {
                type: String,
                //required: true
            }
        },

        receivingInstitution: {
            type: mongoose.Schema.Types.ObjectId,
            //required: true,
            ref: 'University',
        },

        receivingFaculty: {
            type: String,
            //required: true,
        },

        receivingDepartment: {
            type: mongoose.Schema.Types.ObjectId,
            //required: true,
            ref: 'Department'
        },

        receivingContactPerson: {
            receivingContactPersonName: {
                type: String,
                //required: true
            },
            receivingContactPersonEmail: {
                type: String,
                //required: true
            },
            receivingContactPersonPhone: {
                type: String,
                //required: true
            }
        },

        studyProgramAtReceivingIns: {
            componentsOfStudyProgramAtReceivingIns: [componentOfStudyProgramAtReceivingIns],
            totalEctsCredits: {
                type: Number,
                //required: true
            }
        },


        recognitionAtSendingIns:  {
            componentsOfRecognitionAtSendingIns: [componentOfRecognitionAtSendingIns],
            totalEctsCredits: {
                type: Number,
                //required: true
            }
        },

        responsiblePersonAtReceivingIns: {
            name: {
                type: String,
                //required: true
            },
            personFunction: {
                type: String,
                //required: true
            },
            phoneNumber: {
                type: String,
                //required: true
            },
            email: {
                type: String,
                //required: true
            },
            date: {
                type: String,
                //required: true
            },
            signature: {
                type: String,
                //required: true
            }
        },

        responsiblePersonFromSendingIns: {
            name: {
                type: String,
                //required: true
            },
            personFunction: {
                type: String,
                //required: true
            },
            phoneNumber: {
                type: String,
                //required: true
            },
            email: {
                type: String,
                //required: true
            },
            date: {
                type: String,
                //required: true
            },
            signature: {
                type: String,
                //required: true
            }
        },

        //below is needed for "during mobility period", most of above was for "before mobility period".

        //change for study program and its approval tables
        changedStudyProgram: {
            componentsOfChangedStudyProgram: [componentOfChangedStudyProgram],
            totalEctsCredits: {
                type: Number,
                //required: true
            }
        },


        changedRecognitionTable:  {
            componentsOfChangedRecognitionTable: [componentOfChangedRecognitionTable],
            totalEctsCredits: {
                type: Number,
                //required: true
            }
        },

        changedResponsiblePersonAtReceivingIns: {
            name: {
                type: String,
                //required: true
            },
            personFunction: {
                type: String,
                //required: true
            },
            phoneNumber: {
                type: String,
                //required: true
            },
            email: {
                type: String,
                //required: true
            },
            date: {
                type: String,
                //required: true
            },
            signature: {
                type: String,
                //required: true
            }
        },

        changedResponsiblePersonFromSendingIns: {
            name: {
                type: String,
                //required: true
            },
            personFunction: {
                type: String,
                //required: true
            },
            phoneNumber: {
                type: String,
                //required: true
            },
            email: {
                type: String,
                //required: true
            },
            date: {
                type: String,
                //required: true
            },
            signature: {
                type: String,
                //required: true
            }
        },

        //below parts is for "after mobility period".
        academicOutcomesAtReceivingIns: {
            componentsOfAcademicOutcomesAtReceivingIns: [componentOfAcademicOutcomesAtReceivingIns],
            totalPoints: {
                type: Number,
                //required: true
            }
        },


        recognitionOfOutcomesAtSendingIns: {
            componentsOfRecognitionOfOutcomesAtSendingIns: [componentOfRecognitionOfOutcomesAtSendingIns],
            totalPoints: {
                type: Number,
                //required: true
            }
        }

    },

    preApprovalForm : {

        ownerApplication: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Application'
        },

        courses: [wishedCourse],

        totalEctsCredits: {
            type: Number,
            required: true,
            default: 0
        },

        status: {
            type: Number,
            default: 1
        },

        PFDeadline: {
            type: String,
            required: true
        }

    },

    courseTransferForm: {

        ownerApplication: {
            type: mongoose.Schema.Types.ObjectId,
            //required: true,
            ref: 'Application'
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

        coursesToTransfer: [courseToTransfer],

        approveChair: {
            type: String,
            //required: true
        },
        approveExchangeCoordinator: {
            type: mongoose.Schema.Types.ObjectId,
            //required: true,
            ref: 'ErasmusCoordinator'
        },

        status: {
            type: Number,
            default: 1
        },

        PFDeadline: {
            type: String,
            required: true
        }

    },

    incomingStudentsWishedCoursesForm: {
        ownerApplication: {
            type: mongoose.SchemaType.Type.ObjectId,
            required: true,
            ref: 'Application'
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

        wishedCourses: [wishedCourse]
    }


}, {
    timestamps: true
})

// not stored in db for mongoose
formSchema.virtual('tasks', {
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

formSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

formSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET, { expiresIn: '1h' })

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

formSchema.statics.findByCredentials = async (email, password) => {
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
formSchema.pre('save', async function (next) {
    const user = this

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

/**
 * Delete user tasks when the user is removed
 */
formSchema.pre('remove', async function (next) {
    const user = this

    await Task.deleteMany({owner: user._id})

    next()
})

const User = mongoose.model('Form', formSchema)

module.exports = User