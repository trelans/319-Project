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
const ForeignUniversityCourse = require("../models/foreignUniversityCourse")
const Notification = require("../models/notification")
const Task = require('../models/task')

//get pre approval
router.post('/preapproval-student', async (req, res) => {
    try {
        let response;
        let appliedInstitution;
        let PAF;
        // 0 POST, 1 GET, 2 PATCH
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
            const wishCourses = []


            await Promise.all(PAF.preApprovalForm.courses.map(async (course) => {
                const bilkentCourse = await BilkentCourse.findOne({courseCode: course.bilkentCourseCode})
                const foreignCourse = await ForeignUniversityCourse.findOne({courseCode: course.foreignUniversityCourseCode})
                wishCourses.push({
                    courseCode: bilkentCourse.courseCode,
                    courseCodeEq: foreignCourse.courseCode,
                    courseName: bilkentCourse.name,
                    courseNameEq: foreignCourse.name,
                    credits: bilkentCourse.ectsCredits,
                    creditsEq: foreignCourse.ectsCredits,
                    elective: bilkentCourse.courseType
                })
            }))

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
                "bilkentCourses": courseMap,
                "wishCourses": wishCourses,
                "formStatus": PAF.status,
                "userType": user.userType
            })
        } else if (req.body.type === "2") {

            const user = await User.findOne({'tokens.token': req.body.token})
            const PAFWishCourses = []

            await Promise.all(req.body.wishCourses.map(async (wishCourse) => {
                PAFWishCourses.push({
                    bilkentCourseCode: wishCourse.courseCode,
                    foreignUniversityCourseCode: wishCourse.courseCodeEq
                })
            }))

            const form = await Form.findOneAndUpdate({'owner': user._id, 'formType': 0}, {
                preApprovalForm: {
                    courses: PAFWishCourses,
                    totalEctsCredits: req.body.ectsCredits
                },
                status: 2
            })

            const application = await Application.findByIdAndUpdate(form.ownerApplication, {status: 1})

            //notificconst application = ation to the student
            const notificationStudent = new Notification({
                owner: user._id,
                text: "You have submitted your approval form."
            })
            await notificationStudent.save()

            //notification to the erasmus coord
            const notificationCoord = new Notification({
                owner: application.responsibleErasmusCoord,
                text: user.name + " " + user.surname + " submitted their pre approval form."
            })
            await notificationCoord.save()

            //create to do for erasmuss coord
            const task = new Task({
                description: "Evaluate pre approval form of " + user.name + " " + user.surname + ".",
                owner: application.responsibleErasmusCoord,
                applicationId: application._id
            })
            await task.save()


            response = res.status(200)
            response.send({"message": "Form submitted"})
        } else {
            response = res.status(302)
            response.send({"message": "No Preapproval form found"})
        }

    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.post('/preapproval-student-popup', async (req, res) => {
    try {

        let response;
        const eqCourseData = [];
        // 0 POST, 1 GET
        if (req.body.type === "1") {
            const hostUniName = req.body.hostUniName
            const bilkentCourse = await BilkentCourse.findOne({"courseCode": req.body.courseCode})
            const courseList = bilkentCourse.foreignUniversities.find(
                university => university.universityName === hostUniName
            ).exemptedCourses
            await Promise.all(courseList.map(async (course) => {
                const foreignUniversityCourse = await ForeignUniversityCourse.findOne({name: course.courseName})
                eqCourseData.push({
                    courseName: foreignUniversityCourse.name,
                    courseCode: foreignUniversityCourse.courseCode,
                    credits: foreignUniversityCourse.ectsCredits,
                    partNo: 0
                })

            }))
            response = res.status(201)
            response.send({"eqCourseData": eqCourseData})
        } else {
            response = res.status(302)
            response.send("No Preapproval form found")
        }

    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.post('/preapproval-student-nominate-course', async (req, res) => {
    try {
        let response;

        // 0 POST, 1 GET
        if (req.body.type === "0") {
            console.log("REadsadsa")
            console.log(req.body)
            const user = await User.findOne({'tokens.token': req.body.token})
            const nominatedCourses = []
            await Promise.all(req.body.nominatedCoursesData.map(async (course) => {
                const nominatedCourse = {
                    name: course.courseName,
                    courseCode: course.courseCode,
                    syllabusLink: course.syllabus,
                    courseWebPage: course.website,
                    ectsCredits: course.credits
                }
                nominatedCourses.push(nominatedCourse)
            }))
            await BilkentCourse.findOneAndUpdate({courseCode: req.body.bilkentCourse.courseCode}, {
                nominatedForeignCourses: {
                    nominatedCourses,
                    hostUniName: req.body.hostUniName,
                    explanation: req.body.explanation,
                    proposingStudentName: user.name
                }
            })

            const erasmusCoordinator = await User.findOne({"erasmusCoordinator.assignedUniversities.universityId": user.erasmusCandidateData.nominatedUniversityId})
            const notification = new Notification({
                owner: erasmusCoordinator._id,
                text: user.name + " request a new exemption for " + req.body.bilkentCourse.courseCode + " at " + req.body.hostUniName
            })

            await notification.save()


            response = res.status(201)
            response.send({"status": "Ok"})
        } else {
            response = res.status(302)
            response.send("No Get status")
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
                    dateOfBirth: LAF.learningAgreementForm.dateofBirth,
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
            if (req.body.infoType === 1) {
                await Form.findByIdAndUpdate(id, {"learningAgreementForm.sendingInstitution": req.body.sendingInstitution})
            } else if (req.body.infoType === 0) {
                await User.findOneAndUpdate({"name": req.body.name}, {
                    "surname": req.body.lastName,
                    "erasmusCandidateData.academicYear": req.body.academicYear
                })
                await Form.findByIdAndUpdate(id, {
                    "learningAgreementForm.dateofBirth": req.body.dateOfBirth,
                    "learningAgreementForm.nationality": req.body.nationality,
                    "learningAgreementForm.gender": req.body.gender,
                    "learningAgreementForm.studyCycle": req.body.studyCycle,
                    "learningAgreementForm.subjectAreaCode": req.body.subjectAreaCode,
                })
            } else if (req.body.infoType === 2) {
                await Form.findByIdAndUpdate(id, {
                    "learningAgreementForm.receivingInstitution": req.body.receivingInstitution
                })
            }
        }

    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.post('/learning-agreement-2-3', async (req, res) => {
    console.log(req.body)
    try {
        let application
        let PAF
        let response
        let candidate
        // 0 POST, 1 GET, 2 PATCH
        if (req.body.type === "1") {
            const user = await User.findOne({'tokens.token': req.body.token})
            response = res.status(201)
            PAF = await Form.findOne({'owner': user._id, 'formType': 0})
            const bilkentCourses = []
            const foreignCourses = []

            await Promise.all(PAF.preApprovalForm.courses.map(async (course) => {
                const bilkentCourse = await BilkentCourse.findOne({courseCode: course.bilkentCourseCode})
                const foreignCourse = await ForeignUniversityCourse.findOne({courseCode: course.foreignUniversityCourseCode})
                bilkentCourses.push({
                        courseCode: bilkentCourse.courseCode,
                        courseName: bilkentCourse.name,
                        credits: bilkentCourse.ectsCredits
                    }
                )
                foreignCourses.push(
                    {
                        courseCode: foreignCourse.courseCode,
                        courseName: foreignCourse.name,
                        credits: foreignCourse.ectsCredits,
                    }
                )
            }))

            response.send({
                bilkentCourses: bilkentCourses,
                foreignCourses: foreignCourses,
                preferredSemester: user.erasmusCandidateData.preferredSemester
            })
        } else if (req.body.type === '2') {
            /*
            const id = req.body.id
            delete req.body.id
            if (req.body.infoType === 1) {
                await Form.findByIdAndUpdate(id, {"learningAgreementForm.sendingInstitution": req.body.sendingInstitution})
            } else if (req.body.infoType === 0) {
                await User.findOneAndUpdate({"name": req.body.name}, {
                    "surname": req.body.lastName,
                    "erasmusCandidateData.academicYear": req.body.academicYear
                })
                await Form.findByIdAndUpdate(id, {
                    "learningAgreementForm.dateofBirth": req.body.dateOfBirth,
                    "learningAgreementForm.nationality": req.body.nationality,
                    "learningAgreementForm.gender": req.body.gender,
                    "learningAgreementForm.studyCycle": req.body.studyCycle,
                    "learningAgreementForm.subjectAreaCode": req.body.subjectAreaCode,
                })
            } else if (req.body.infoType === 2) {
                await Form.findByIdAndUpdate(id, {
                    "learningAgreementForm.receivingInstitution": req.body.receivingInstitution
                })
            }

             */
        }

    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})


/*
router.patch('/pre-approval-form/:id', auth, async (req, res) => {

    const updates = Object.keys(req.body)

    try {
        const form = await Form.findOne({_id: req.params.id, owner: req.user._id})

        if (!form) {
            return res.status(404).send()
        }

        updates.forEach((update) => {
            form[update] = req.body[update]
        })

        await form.save()

        res.send(form)
    } catch (e) {
        res.status(400).send(e)
    }
})
 */


router.post('/learning-agreement-3-3', async (req, res) => {
    console.log(req.body)
    try {
        let application
        let response
        let candidate

        // 0 POST, 1 GET, 2 PATCH
        if (req.body.type === "1") {
            const user = await User.findOne({'tokens.token': req.body.token})
            application = await Application.findOne({'applicantCandidate': user._id})
            candidate = await User.findById(application.applicantCandidate)
            LAF = await Form.findOne({'ownerApplication': application._id, 'formType': 1})
            response = res.status(201)

            console.log("inside get 3-3")
            console.log(application)
            console.log(LAF)

            response.send({
                studentInfo: {
                    name: candidate.name,
                    lastName: candidate.surname,
                    dateOfBirth: LAF.learningAgreementForm.dateofBirth,
                    nationality: LAF.learningAgreementForm.nationality,
                    gender: LAF.learningAgreementForm.gender,
                    academicYear: candidate.erasmusCandidateData.academicYear,
                    studyCycle: LAF.learningAgreementForm.studyCycle,
                    subjectAreaCode: LAF.learningAgreementForm.subjectAreaCode
                },
                responsiblePersonAtReceivingInsInfo: LAF.learningAgreementForm.responsiblePersonAtReceivingIns,
                responsiblePersonFromSendingInsInfo: LAF.learningAgreementForm.responsiblePersonFromSendingIns,
                formID: LAF._id

            })
        } else if (req.body.type === '2') { // patch
            const id = req.body.id
            delete req.body.id
            if (req.body.infoType === 1) {
                await Form.findByIdAndUpdate(id, {"learningAgreementForm.responsiblePersonFromSendingIns": req.body.responsiblePersonFromSendingIns})
            } else if (req.body.infoType === 0) {
                await User.findOneAndUpdate({"name": req.body.name}, {
                    "surname": req.body.lastName,
                    "erasmusCandidateData.academicYear": req.body.academicYear
                })
                await Form.findByIdAndUpdate(id, {
                    "learningAgreementForm.dateofBirth": req.body.dateOfBirth,
                    "learningAgreementForm.nationality": req.body.nationality,
                    "learningAgreementForm.gender": req.body.gender,
                    "learningAgreementForm.studyCycle": req.body.studyCycle,
                    "learningAgreementForm.subjectAreaCode": req.body.subjectAreaCode,
                })
            } else if (req.body.infoType === 2) {
                await Form.findByIdAndUpdate(id, {
                    "learningAgreementForm.responsiblePersonAtReceivingIns": req.body.responsiblePersonAtReceivingIns
                })
            }
        }

    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

module.exports = router