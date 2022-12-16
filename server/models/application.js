const mongoose = require('mongoose')
const Form = require('./form')
const Department = require('./department')
const User = require('./user')
const University = require('./university')

const applicationSchema = new mongoose.Schema({
    status: {
        type: Number,
        default: 0,
        required: true
    },

    applicantCandidate: {
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
        ref: 'User'
    },

    /*
    formsIds: {
        PFId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PreApprovalForm'
        },

        LAFId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'LearningAgreementForm'
        },

        CTFId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CourseTransferForm'
        }
    },

     */

}, {
    timestamps: true
})

// not stored in db for mongoose
applicationSchema.virtual('forms', {
    ref: 'Form',
    localField: '_id',
    foreignField: 'owner'
})

applicationSchema.statics.cancelApplication = async function (_id) {
    await Form.deleteMany({owner: _id})
    const query = await Application.deleteOne({_id})
    // if (!application){
    //     throw new Error('Unable to find specified Application')
    // }
    return query
}

// applicationProgramType will be always 0 since student's minor application form will be evaluated by the corresponding Erasmus Coordinator of the major program
applicationSchema.statics.createApplication = async function (user,applicationProgramType = 0) {
    // Bu kısımı hoca uidan girecek
    const formDeadlines = {
        PADeadline: "30.01.23",
        LAFDeadline: "30.02.23",
        CTFDeadline: "30.05.23"
    }

    const erasmusCoord = await User.findOne({"erasmusCoordinator.assignedUniversities.universityId": user.erasmusCandidateData.nominatedUniversityId})
    if (erasmusCoord === null) {
        return
    }

    const department = await Department.findOne({"name": erasmusCoord.erasmusCoordinatorData.department})
    const hostUniversity = await University.findById(user.erasmusCandidateData.nominatedUniversityId)

    const application = new Application({
        applicantCandidate: user._id,
        appliedInstitution: user.erasmusCandidateData.nominatedUniversityId,
        responsibleErasmusCoord: erasmusCoord._id
    })

    // Manually creating object id and storing it on database after usage
    var id = new mongoose.Types.ObjectId();

    application["_id"] = id
    let form = new Form({
        owner: user._id,
        ownerApplication: id,
        deadline: formDeadlines.PADeadline,
        status: 1 //There is no not available option for PA form
    })
    await form.save()
    form = new Form({
        owner: user._id,
        ownerApplication: id,
        deadline: formDeadlines.LAFDeadline,
        formType: 1,
        learningAgreementForm: {
            subjectAreaCode: department.areaCode,
            sendingInstitution: {
                name: "İhsan Doğramacı Bilkent University",
                faculty: department.faculty,
                erasmusCode: "TR ANKARA07",
                departmentName: department.name,
                address: "University Street Bilkent University",
                country: "Turkey",
                contactPerson: {
                    name: "Ayşegül Başol",
                    email: "exchange@bilkent.edu.tr",
                    phoneNumber: "+90 312 290 2435"
                }
            },

            receivingInstitution: {
                name: hostUniversity.name,
                // If host department name is not Cs, it is candidate responsibility to update later
                faculty: department.faculty, // If host department name is not Cs, it is candidate responsibility to update later
                departmentName: department.name,
                erasmusCode: hostUniversity.erasmusCode,
                address: hostUniversity.address,
                country: hostUniversity.country,
            }
        }
    })

    await form.save()
    form = new Form({
        owner: user._id,
        ownerApplication: id,
        deadline: formDeadlines.CTFDeadline,
        formType: 2
    })
    await form.save()
    return application
}

applicationSchema.statics.discardPlacement = async function (_id) {
    await Form.deleteMany({owner: _id})
    const query = await Application.deleteOne({_id})
    // if (!application){
    //     throw new Error('Unable to find specified Application')
    // }
    return query
}

applicationSchema.statics.findByOwnerId = async (applicantUser) => {
    const application = await Application.findOne({applicantUser})

    if (!application) {
        throw new Error('Unable to find Application of the given user')
    }

    return application
}

const Application = mongoose.model('Application', applicationSchema)

module.exports = Application