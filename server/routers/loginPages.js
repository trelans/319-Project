const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const router = new express.Router()
const ErasmusCandidate = require('../models/erasmusCandidate')
const Application = require('../models/application')
const BilkentCourse = require('../models/bilkentCourse')
const ForeignUniversityCourse = require('../models/foreignUniversityCourse')

router.post('/login', async (req,res) => {
    console.log(req.body)
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        console.log("Found user: ", user)
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

    const user = await new User(req.body);

    try {
        const token = await user.generateAuthToken()
        if (user.userType === 0) {
            const application = await Application.createApplication(user);
            await application.save()
        }
        await user.save()
        res.status(201).send({user,token})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/create-bilkent-course', async (req,res) => {
    const bilkentCourse = await new BilkentCourse(req.body)
    await bilkentCourse.save()
})

router.post('/create-foreign-course', async (req,res) => {
    const foreignCourse = await new ForeignUniversityCourse(req.body)
    await foreignCourse.save()
})

module.exports = router