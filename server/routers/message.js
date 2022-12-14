const express = require('express')
const message = require('../models/message')
const auth = require('../middleware/auth')
const Message = require('../models/message')
const router = new express.Router()

//create message
router.post("/msg", auth, async(req, res) => {
    try {
        const {from, to, message} = req.body;

        console.log("from: " + from);
        console.log("to " + to);
        console.log("message " + message);
        
        const newmessage = new Message({
            message: message,
            Chatusers:[from,to],
            Sender: from
        })

        /*
        const newmessage = await Message.create({
            message: message,
            Chatusers:[from,to],
            Sender: from
        })
        */

        await newmessage.save()
        res.send(newmessage)  

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

//fetch mesage
router.get("/get/chat/msg/:user1Id/:user2Id", async(req, res) => {
    
    try {
        const from = req.params.user1Id;
        const to = req.params.user2Id;

        const messages = await Message.find( {
            Chatusers: {
                $all:[from,to]
            }
        }).sort({updatedAt: -1})

        const allmessage = messages.map((msg)=> {
            return {
                myself:msg.Sender.toString() === from,
                message: msg.message
            }
        })

        res.send(allmessage) 

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

module.exports = router