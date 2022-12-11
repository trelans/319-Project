const express = require('express')
const User = require('../models/user')
const ErasmusCandidate = require("../models/erasmusCandidate")
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const Department = require("../models/department")
const Application = require("../models/application")
const University = require("../models/university")
const LearningAgreement = require("../models/learningAgreementForm")
const PreApproval = require("../models/preApprovalForm")
const CourseTransfer = require("../models/courseTransferForm")
const ErasmusCoordinator = require("../models/erasmusCoordinator")
const router = new express.Router()

router.post('/application-page1', async (req, res) => {
    try {

        let response;
        let application;
        let appliedInstitution;
        let preApproval;
        let learningAgreement;
        let erasmusCoordinator;
        // 0 POST, 1 GET
        if (req.body.type === "1") {
            const user = await ErasmusCandidate.findOne({'tokens.token': req.body.token})
            // The field after "," below is for getting only the required fields from database
            application = await Application.findOne({'applicantCandidate': user._id})
            erasmusCoordinator = await ErasmusCoordinator.findById(application.responsibleErasmusCoord)
            appliedInstitution = await University.findById(application.appliedInstitution)
            preApproval = await PreApproval.findOne({'ownerApplication': application._id})
            learningAgreement = await LearningAgreement.findOne({'ownerApplication': application._id})
            response = res.status(201)
        } else {
            response = res.status(302)
        }
        response.send({"status": application.status,
            "erasmusCoordinator": erasmusCoordinator.name + " " + erasmusCoordinator.surname,
            "appliedInstitution": appliedInstitution.name,
            "mobilityPeriod": appliedInstitution.mobilityPeriod,
            "PFStatus": 0, // change later
            "PFDeadline": "12.12.12", // change later
            "LAFStatus": 0, // change later
            "LAFDeadline": "12.12.12", // change later
            "CTFStatus": 0, // change later
            "CTFDeadline": "12.12.12" // change later
            })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.patch('/application', auth, async (req, res) => {
})

router.delete('/application', auth, async (req, res) => {
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