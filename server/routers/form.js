const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const router = new express.Router()
const Application = require('../models/application')
const Department = require("../models/department");
const University = require("../models/university");
const Form = require("../models/form");
const BilkentCourse = require("../models/bilkentCourse")

router.post('/preapproval-student', async (req, res) => {
    try {
        let response;
        let appliedInstitution;
        let PAF;
        // 0 POST, 1 GET
        if (req.body.type === "1") {
            const user = await User.findOne({'tokens.token': req.body.token})
            const department = await Department.findById(user.erasmusCandidateData.departments[0]["id"])
            appliedInstitution = await University.findById(user.erasmusCandidateData.nominatedUniversityId)
            const courseMap = {
                "CS Required Course": [],
                "CS Technical Elective": [],
                "CS HSS Elective": [],
                "CS General Elective": []
            };
            await BilkentCourse.find({}).then(function (courses) {
                courses.forEach(function (course) {
                    if (course.courseType === "CS Required Course") {
                        courseMap["CS Required Course"].push(course)
                    } else if (course.courseType === "CS Technical Elective") {
                        courseMap["CS Technical Elective"].push(course)
                    } else if (course.courseType === "CS HSS Elective") {
                        courseMap["CS HSS Elective"].push(course)
                    } else {
                        courseMap["CS General Elective"].push(course)
                    }
                })
            })
            PAF = await Form.findOne({'owner': user._id, 'formType': 0})
            response = res.status(201)
            response.send({
                "name": user.name,
                "surname": user.surname,
                "id": user.erasmusCandidateData.studentId,
                "department": department.name,
                "appliedInstitution": appliedInstitution.name,
                "duration": user.erasmusCandidateData.preferredSemester,
                "ECTSCredits": PAF.preApprovalForm.totalEctsCredits,
                "courses": PAF.preApprovalForm.courses,
                "bilkentCourses": courseMap
            })
        } else {
            response = res.status(302)
            response.send("No Preapproval form found")
        }

    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.post('/learning-agreement-1-3', async (req, res) => {
    console.log(req.body)
    try {
        let application
        let LAF
        let response
        let candidate
        // 0 POST, 1 GET, 2 PATCH
        if (req.body.type === "1") {
            const user = await User.findOne({'tokens.token': req.body.token})
            application = await Application.findOne({'applicantCandidate': user._id})
            candidate = await User.findById(application.applicantCandidate)
            LAF = await Form.findOne({'ownerApplication': application._id, 'formType': 1})
            response = res.status(201)
            response.send({
                studentInfo: {
                    name: candidate.name,
                    lastName: candidate.surname,
                    dateOfBirth: LAF.learningAgreementForm.dateOfBirth,
                    nationality: LAF.learningAgreementForm.nationality,
                    gender: LAF.learningAgreementForm.gender,
                    academicYear: candidate.erasmusCandidateData.academicYear,
                    studyCycle: LAF.learningAgreementForm.studyCycle,
                    subjectAreaCode: LAF.learningAgreementForm.subjectAreaCode
                },
                sendingInstitutionInfo: LAF.learningAgreementForm.sendingInstitution,
                receivingInstitutionInfo: LAF.learningAgreementForm.receivingInstitution,
                formID: LAF._id
            })
        } else if (req.body.type === '2') {
            const id = req.body.id
            delete req.body.id
            console.log(id)
            if (req.body.infoType === 1) {
                await Form.findByIdAndUpdate(id, {"learningAgreementForm.sendingInstitution": req.body.sendingInstitution})
            } else if (req.body.infoType === 0) {
                console.log("body" + req.body.studyCycle)
                await User.findOneAndUpdate({"name": req.body.name}, {
                    "surname": req.body.lastName,
                    "erasmusCandidateData.academicYear": req.body.academicYear
                })
                await Form.findByIdAndUpdate(id, {
                    "learningAgreementForm.dateofBirth": req.body.dateofBirth,
                    "learningAgreementForm.nationality": req.body.nationality,
                    "learningAgreementForm.gender": req.body.gender,
                    "learningAgreementForm.studyCycle": req.body.studyCycle,
                    "learningAgreementForm.subjectAreaCode": req.body.subjectAreaCode,
                    })
            } else if (req.body.infoType === 2) {

                console.log("name:" + req.body.name)
                console.log(id)

                await Form.findByIdAndUpdate(id, {"learningAgreementForm.receivingInstitution": req.body.receivingInstitution
                    /*
                    "learningAgreementForm.receivingInstitution.name": req.body.receivingInstitution.name,
                    "learningAgreementForm.receivingInstitution.faculty": req.body.receivingInstitution.faculty,
                    "learningAgreementForm.receivingInstitution.erasmusCode": req.body.receivingInstitution.erasmusCode,
                    "learningAgreementForm.receivingInstitution.departmentName": req.body.receivingInstitution.departmentName,
                    "learningAgreementForm.receivingInstitution.address": req.body.receivingInstitution.address,
                    "learningAgreementForm.receivingInstitution.country": req.body.receivingInstitution.country,
                    "learningAgreementForm.receivingInstitution.contactPerson.name": req.body.receivingInstitution.contactPerson.name,
                    "learningAgreementForm.receivingInstitution.contactPerson.email": req.body.receivingInstitution.contactPerson.email,
                    "learningAgreementForm.receivingInstitution.contactPerson.phoneNumber": req.body.receivingInstitution.contactPerson.phoneNumber,
                    */

                })
            }
        }

    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

module.exports = router