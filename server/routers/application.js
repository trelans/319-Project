const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const Department = require("../models/department")
const Application = require("../models/application")
const University = require("../models/university")
const Form = require("../models/form")
const router = new express.Router()

router.post('/application-page1', async (req, res) => {
    try {

        let response;
        let application;
        let appliedInstitution;
        let PAF;
        let LAF;
        let CTF;
        // 0 POST, 1 GET
        if (req.body.type === "1") {
            const user = await User.findOne({'tokens.token': req.body.token})
            application = await Application.findOne({'applicantCandidate': user._id})
            console.log(application)
            erasmusCoordinator = await User.findById(application.responsibleErasmusCoord)
            appliedInstitution = await University.findById(application.appliedInstitution)
            PAF = await Form.findOne({'ownerApplication': application._id, 'formType': 0})
            LAF = await Form.findOne({'ownerApplication': application._id, 'formType': 1})
            CTF = await Form.findOne({'ownerApplication': application._id, 'formType': 2})
            response = res.status(201)
        } else {
            response = res.status(302)
        }

        response.send({
            "status": application.status,
            "erasmusCoordinator": erasmusCoordinator.name + " " + erasmusCoordinator.surname,
            "appliedInstitution": appliedInstitution.name,
            "mobilityPeriod": appliedInstitution.mobilityPeriod,
            "PFStatus": PAF.status,
            "PFDeadline": PAF.deadline,
            "LAFStatus": LAF.status,
            "LAFDeadline": LAF.deadline,
            "CTFStatus": CTF.status,
            "CTFDeadline": CTF.deadline,
            "applicationID": application._id
        })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})


router.post('/application-page-coordinator', async (req, res) => {
    try {
        let response;
        let application;
        let appliedInstitution;
        let PAF;
        let LAF;
        let CTF;
        let user;
        // 0 POST, 1 GET
        if (req.body.type === "1") {
            console.log(req.body.candidateID)
            user = await User.findById(req.body.candidateID)
            application = await Application.findOne({'applicantCandidate': user._id})
            console.log(application)
            erasmusCoordinator = await User.findById(application.responsibleErasmusCoord)
            appliedInstitution = await University.findById(application.appliedInstitution)
            PAF = await Form.findOne({'ownerApplication': application._id, 'formType': 0})
            LAF = await Form.findOne({'ownerApplication': application._id, 'formType': 1})
            CTF = await Form.findOne({'ownerApplication': application._id, 'formType': 2})
            response = res.status(201)
        } else {
            response = res.status(302)
        }

        response.send({
            "status": application.status,
            "erasmusCoordinator": erasmusCoordinator.name + " " + erasmusCoordinator.surname,
            "appliedInstitution": appliedInstitution.name,
            "mobilityPeriod": appliedInstitution.mobilityPeriod,
            "PFStatus": PAF.status,
            "PFDeadline": PAF.deadline,
            "LAFStatus": LAF.status,
            "LAFDeadline": LAF.deadline,
            "CTFStatus": CTF.status,
            "CTFDeadline": CTF.deadline,
            "applicationID": application._id,
            "studentName": user.name,
            "studentSurname": user.surname
        })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})
router.patch('/application-page1', auth, async (req, res) => {
})

router.delete('/application-page1', auth, async (req, res) => {
    try {
        if (req.deleteType == "discard") {
            // TODO: Add student to the waiting list
        }
        res.send(await Application.removeApplication(req.application._id)) // Returned query will be sent to frontend
    } catch (e) {
        res.status(500).send(e.message)
    }
})

module.exports = router