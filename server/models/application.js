const mongoose = require('mongoose')
const Form = require('./form')
const Department = require('./department')
const PreApproval = require('./preApprovalForm')
const LearningAgreement = require('./learningAgreementForm')
const CourseTransfer = require('./courseTransferForm')
const ErasmusCoordinator = require('./erasmusCoordinator')

const applicationSchema = new mongoose.Schema({
    status: {
        type: Number,
        default: 0,
        required: true
    },

    applicantCandidate: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'ErasmusCandidate'
    },

    appliedInstitution: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'University',
    },

    responsibleErasmusCoord: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'ErasmusCoordinator'
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
    await Form.deleteMany({ owner: _id })
    const query = await Application.deleteOne({ _id })
    // if (!application){
    //     throw new Error('Unable to find specified Application')
    // }
    return query
}

// applicationProgramType will be always 0 since student's minor application form will be evaluated by the corresponding Erasmus Coordinator of the major program
applicationSchema.statics.createApplication = async function (user, applicationProgramType = 0) {
    const erasmusCoord = await ErasmusCoordinator.findOne({ "assignedUniversities.universityId": user.nominatedUniversityId})

    const application = new Application({
        status: 0,
        applicantCandidate: user._id,
        appliedInstitution: user.nominatedUniversityId,
        responsibleErasmusCoord: erasmusCoord._id
    })

    // Manually creating object id and storing it on database after usage
    var id = new mongoose.Types.ObjectId();
    console.log(id)
    application["_id"] = id
    let form = new PreApproval({
        ownerApplication: id
    })
    await form.save()
    form = new LearningAgreement({
        ownerApplication: id
    })
    await form.save()
    form = new CourseTransfer({
        ownerApplication: id
    })
    await form.save()
    return application
}

applicationSchema.statics.discardPlacement = async function (_id) {
    await Form.deleteMany({ owner: _id })
    const query = await Application.deleteOne({ _id })
    // if (!application){
    //     throw new Error('Unable to find specified Application')
    // }
    return query
}

applicationSchema.statics.findByOwnerId = async (applicantUser) => {
    const application = await Application.findOne({ applicantUser })

    if (!application) {
        throw new Error('Unable to find Application of the given user')
    }

    return application
}

const Application = mongoose.model('Application', applicationSchema)

module.exports = Application