/*
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

/*
componentOfStudyProgramAtReceivingIns
componentOfRecognitionAtSendingIns
componentOfChangedStudyProgram
componentOfChangedRecognitionTable
componentOfAcademicOutcomesAtReceivingIns
componentOfRecognitionOfOutcomesAtSendingIns


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



const learningAgreementFormSchema = new mongoose.Schema({

    status: {
        type: Number,
        default: 1
    },

    LAFDeadline: {
        type: String,
        required: true
    },

    ownerApplication: {
        type: mongoose.Schema.Types.ObjectId,
        //required: true,
        ref: 'Application'
    },
    
    ownerStudent: {
        type: mongoose.Schema.Types.ObjectId,
        //required: true,
        ref: 'ErasmusCandidate'
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
    /*
    studyProgramAtReceivingIns: [{
        component: {
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
        }
    }],

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



}, {
    timestamps: true
})





const LearningAgreementForm = mongoose.model('Forms/LearningAgreement', learningAgreementFormSchema)

module.exports = LearningAgreementForm
*/
