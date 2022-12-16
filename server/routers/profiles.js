const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const BilkentCourse = require("../models/bilkentCourse")
const University = require("../models/university")
const router = new express.Router()

router.post('/profile-others-incoming', async (req, res) => {
    console.log("entered profile course router")
    try {

        let response;
        let user;

        // 0 POST, 1 GET
        if (req.body.type === "1") {
            user = await User.findOne({'tokens.token': req.body.token})
            console.log("user found: " + user.name + " " + user.surname)
            response = res.status(201)
        } else {
            response = res.status(302)
        }

        console.log("sending responses...")

        response.send({

            "name": user.name,
            "surname": user.surname,
            "email": user.email,
            "studentId": user.studentId,
            "department": user.department,
            "studyCycle": user.incomingStudentData.studyCycle,
            "sendingInstitution": user.incomingStudentData.sendingInstitution,

        })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.post('/profile-own-incoming', async (req, res) => {
    console.log("entered profile own incoming router")
    try {

        let response;
        let user;

        // 0 POST, 1 GET
        if (req.body.type === "1") {
            user = await User.findOne({'tokens.token': req.body.token})
            console.log("user found: " + user.name + " " + user.surname)
            response = res.status(201)
        } else {
            response = res.status(302)
        }

        console.log("sending responses...")

        response.send({

            "name": user.name,
            "surname": user.surname,
            "email": user.email,
            "studentId": user.studentId,
            "department": user.department,
            "studyCycle": user.incomingStudentData.studyCycle,
            "sendingInstitution": user.incomingStudentData.sendingInstitution,

        })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})
router.post('/profile-others-others', async (req, res) => {
    console.log("entered profile others-others router")
    try {

        let response;
        let user;

        // 0 POST, 1 GET
        if (req.body.type === "1") {
            user = await User.findOne({'surname': req.body.surname})
            console.log("user found: " + user.name + " " + user.surname)
            response = res.status(201)
        } else {
            response = res.status(302)
        }

        console.log("sending responses...")

        response.send({

            "name": user.name,
            "surname": user.surname,
            "email": user.email,
            "studentId": user.studentId,
            "role": "Coordinator"

        })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})
router.post('/profile-own-others', async (req, res) => {
    console.log("entered profile own-others router")
    try {

        let response;
        let user;

        // 0 POST, 1 GET
        if (req.body.type === "1") {
            user = await User.findOne({'surname': req.body.surname})
            console.log("user found: " + user.name + " " + user.surname)
            response = res.status(201)
        } else {
            response = res.status(302)
        }

        console.log("sending responses...")

        response.send({

            "name": user.name,
            "surname": user.surname,
            "email": user.email,
            "studentId": user.studentId,
            "role": "Coordinator"

        })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})



router.post('/profile-others-student', async (req, res) => {
    console.log("entered profile others-student router")
    try {

        let response;
        let user;

        // 0 POST, 1 GET
        if (req.body.type === "1") {
            user = await User.findOne({'surname': req.body.surname})
            console.log("user found: " + user.name + " " + user.surname)
            response = res.status(201)
        } else {
            response = res.status(302)
        }

        console.log("sending responses...")

        response.send({

            "name": user.name,
            "surname": user.surname,
            "email": user.email,
            "studentId": user.studentId,
            "department": user.department,
            "receivingInstitution": user.receivingInstitution,
            "totalPoints": user.totalPoints,
            "studyCycle": "Bachelor's"

        })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.post('/profile-university', async (req, res) => {
    console.log("entered profile university router")
    try {

        let response;
        let university;

        // 0 POST, 1 GET
        if (req.body.type === "1") {
            university = await University.findOne({'name': req.body.name})
            console.log("university found: " + university.name)
            response = res.status(201)
        } else {
            response = res.status(302)
        }

        console.log("sending responses...")

        response.send({

            "name": university.name,
            "country": university.country,
            "mobilityPeriod": university.mobilityPeriod,
            "erasmusCode": university.erasmusCode,
            "feedbacks": university.feedbacks,
            "websiteLink": "no link provided"

        })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.post('/profile-course', async (req, res) => {
    console.log("entered profile others incoming router")
    try {

        let response;
        let course;

        // 0 POST, 1 GET
        if (req.body.type === "1") {
            course = await BilkentCourse.findOne({'courseCode': req.body.courseCode})
            console.log("course found: " + course)
            response = res.status(201)
        } else {
            response = res.status(302)
        }

        console.log("sending responses...")

        response.send({
            "courseName": course.name,
            "courseCode": course.courseCode,
            "requiredLanguage": "English",
            "websiteLink": "No link provided.",
            "syllabusLink": "No link provided.",
            "university": "Bilkent",
            "ectsCredits": course.ectsCredits,
            "comments": "no comments yet"
        })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})



router.patch('/profile-course', auth, async (req, res) => {
})


module.exports = router