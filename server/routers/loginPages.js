const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const router = new express.Router()

router.post('/login', async (req,res) => {
    console.log(req.body)
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        if(user.active) {
            const token = await user.generateAuthToken()
            res.send({user, token})
        } else {
            res.status(401).send("The account is not active")
        }
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.post('/create-account', async (req,res) => {

    const user = new User(req.body);

    try {
        const token = await user.generateAuthToken()
        await user.save()
        res.status(201).send({user,token})
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router