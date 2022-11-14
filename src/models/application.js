const mongoose = require('mongoose')
const Form = require('./form')
const Department = require('./department')

const applicationSchema = new mongoose.Schema({
    status: {
        type: Number,
        default: 0,
        required: true
    },

    applicantUser: {
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

    forms: [{
        form: {
            type: Form,
            required: true,
            ref: 'Form'
        }
    }],



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

applicationSchema.statics.createApplication = async function (user, applicationProgramType = 0) {
    const application = {
        status: 0,
        applicantUser: user._id,
        appliedInstitution: user.appliedInstitution,
        responsibleErasmusCoord: await User.find({ assignedUniversities: { $all: [user.appliedInstitution] }, department: await user.departments.find(element => element.type == applicationProgramType).department }),
        forms: [{
            // Form lazım initialize etmek için         
        }],
    }
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