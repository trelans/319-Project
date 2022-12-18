const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')


const wishedCourse = mongoose.Schema( {
    bilkentCourseCode: {
        type: String
    },

    foreignUniversityCourseCode: {
        type: String
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
        //required: true
    },
    componentTitle: {
        type: String,
        //required: true
    },
    semester: {
        type: String,
        //required: true
    },
    ectsCredits: {
        type: Number,
        //required: true
    }
}, {_id: false});


const componentOfRecognitionAtSendingIns = mongoose.Schema({
    componentCode: {
        type: String,
        //required: true
    },
    componentTitle: {
        type: String,
        //required: true
    },
    semester: {
        type: String,
        //required: true
    },
    ectsCredits: {
        type: Number,
        //required: true
    }
}, {_id: false});

const componentOfChangedStudyProgram = mongoose.Schema({
    componentCode: {
        type: String,
        //required: true
    },
    componentTitle: {
        type: String,
        //required: true
    },
    isComponentAdded: {
        type: Boolean,
        //required: true
    },
    isComponentDeleted: {
        type: Boolean,
        //required: true
    },
    reasonForChange: {
        type: String,
        //required: true
    },
    ectsCredits: {
        type: Number,
        //required: true
    }
}, {_id: false});

const componentOfChangedRecognitionTable = mongoose.Schema({
    componentCode: {
        type: String,
        //required: true
    },
    componentTitle: {
        type: String,
        //required: true
    },
    semester: {
        type: String,
        //required: true
    },
    ectsCredits: {
        type: Number,
        //required: true
    }
}, {_id: false});

const componentOfAcademicOutcomesAtReceivingIns = mongoose.Schema({
    componentCode: {
        type: String,
        //required: true
    },
    componentTitle: {
        type: String,
        //required: true
    },
    isComponentComplete: {
        type: Boolean,
        //required: true
    },
    ectsCredits: {
        type: Number,
        //required: true
    },
    grade: {
        type: String,
        //required: true
    }
}, {_id: false});

const componentOfRecognitionOfOutcomesAtSendingIns = mongoose.Schema({
    componentCode: {
        type: String,
        //required: true
    },
    componentTitle: {
        type: String,
        //required: true
    },
    ectsCredits: {
        type: Number,
        //required: true
    },
    grade: {
        type: String,
        //required: false
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

//general form schema
const formSchema = new mongoose.Schema({

    //owner user -- required data will be taken from the user.
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    ownerApplication: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Application'
    },

    status: {
        type: Number,
        default: 0
    },

    formType: {
        type: Number,
        default: 0
    },

    deadline: {
        type: String,
        required: true
    },

    learningAgreementForm : {
        studyCycle: {
            type: String,
            default: "Bachelor" // Alpha Version of the application is for only Bachelor students
        },

        subjectAreaCode: {
            type: String
        },

        dateofBirth: {
            type: String
        },

        nationality: {
            type: String
        },

        gender: {
            type: String
        },

        sendingInstitution: {
            name: {
                type: String
            },

            faculty: {
                type: String
            },

            erasmusCode: {
                type: String
            },

            departmentName: {
                type: String
            },

            address: {
                type: String
            },

            country: {
                type: String
            },

            contactPerson: {
                name: {
                    type: String
                },
                email: {
                    type: String
                },
                phoneNumber: {
                    type: String
                }
            }
        },

        receivingInstitution: {
            name: {
                type: String
            },

            faculty: {
                type: String
            },

            erasmusCode: {
                type: String
            },

            departmentName: {
                type: String
            },

            address: {
                type: String
            },

            country: {
                type: String
            },

            contactPerson: {
                name: {
                    type: String
                },
                email: {
                    type: String
                },
                phoneNumber: {
                    type: String
                }
            }
        },

        studyProgramAtReceivingIns: {
            componentsOfStudyProgramAtReceivingIns: [componentOfStudyProgramAtReceivingIns],
            totalEctsCredits: {
                type: Number
            }
        },


        recognitionAtSendingIns:  {
            componentsOfRecognitionAtSendingIns: [componentOfRecognitionAtSendingIns],
            totalEctsCredits: {
                type: Number
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
            personWorkPosition: {
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

        courses: [wishedCourse],

        totalEctsCredits: {
            type: Number,
            default: 0
        },

    },

    courseTransferForm: {

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
            ref: 'User'
        },
    },

    incomingStudentsWishedCoursesForm: {
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

const Form = mongoose.model('Form', formSchema)

module.exports = Form