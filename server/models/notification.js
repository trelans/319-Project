const mongoose = require('mongoose')
//const validator = require('validator')

const notificationsSchema = new mongoose.Schema({
    text: {
        type: String,
        trim: true,
        required: true
    },
    read : {
        type: Boolean,
        deafult: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Notification = mongoose.model('Notification', notificationsSchema)

module.exports = Notification