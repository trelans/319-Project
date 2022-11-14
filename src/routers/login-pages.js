const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const router = new express.Router()

router.post('/login', async (req,res) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        if(user.active) {
            const token = await user.generateAuthToken()
            res.send({user, token})
        } else {
            res.status(401).send("The account is not active")
        }
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.post('/create-account', async (req,res) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        if(user.active) {
            const token = await user.generateAuthToken()
            res.send({user, token})
        } else {
            res.status(401).send("The account is not active")
        }
    } catch (e) {
        res.status(400).send(e.message)
    }
})