const mongoose = require('mongoose')
//const validator = require('validator')

const MessageSchema = new mongoose.Schema({
    Chatusers: {
        type: Array,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    Sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {timestamps: true})

const Message = mongoose.model('Message', MessageSchema)

module.exports = Message