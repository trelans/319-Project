const express = require('express')
const User = require("../models/user");
const router = new express.Router()
const path = require ('path');
const multer = require ('multer');
const convertToJson = require('../convertor/convertToJson');
const fs = require('fs');
const {forEach} = require("react-bootstrap/ElementChildren");
const Department = require("../models/department");

// storage engine for multer
const storageEngine = multer.diskStorage ({
    destination: './public/uploads/',
    filename: function (req, file, callback) {
        callback (
            null,
            file.fieldname + path.extname (file.originalname)
        );
    },
});

// initialize multer
const upload = multer ({
    storage: storageEngine,
});

const acceptedIdList = []
const applicantIdList = []

function createAcceptedList(students, placedStudents) {
    const keys = Object.keys(students["Placed"][0]);
    const values = Object.values(students["Placed"][0]);
    for (let i = 1; i < students["Placed"].length; i++) {
        let placedStudent = {};
        for (let j = 0; j < keys.length; j++) {
            placedStudent[values[j]] = students["Placed"][i][keys[j]].toString()
        }
        placedStudents.push(placedStudent)
        acceptedIdList.push(placedStudent.id)
    }
    const content = JSON.stringify(placedStudents)

    fs.writeFile('./public/files/acceptedStudents.txt', content, err => {
        if (err) {
            console.error(err);
        }
        // file written successfully
    });
}

function createApplicantList(students, rankedApplicants) {
    const keys = Object.keys(students["Sayfa1"][0]);
    const values = Object.values(students["Sayfa1"][0]);
    for (let i = 1; i < students["Sayfa1"].length; i++) {
        let rankedApplicant = {};
        for (let j = 1; j < keys.length; j++) {
            let value = students["Sayfa1"][i][keys[j]] || "";
            rankedApplicant[values[j]] = value.toString()
        }
        rankedApplicants.push(rankedApplicant)
        applicantIdList.push(rankedApplicant["Student ID Number"])
    }
    const content = JSON.stringify(rankedApplicants)
    fs.writeFile('./public/files/rankedApplicants.txt', content, err => {
        if (err) {
            console.error(err);
        }
        // file written successfully
    });
}

function saveApplicantsIDs() {
    const content = JSON.stringify(applicantIdList)
    fs.writeFile('./public/files/applicantsIds.txt', content, err => {
        if (err) {
            console.error(err);
        }
        // file written successfully
    });
}

function createWaitingList(rankedApplicants, waitingList) {
    for (let i = 0; i < rankedApplicants.length; i++) {
        if (!acceptedIdList.includes(rankedApplicants[i]["Student ID Number"])){
            waitingList.push(rankedApplicants[i])
        }
    }
    const content = JSON.stringify(waitingList)
    fs.writeFile('./public/files/waitingList.txt', content, err => {
        if (err) {
            console.error(err);
        }
        // file written successfully
    });
}

// routing
router.post ('/upload-excel', upload.single ('applicantListsExcel'), (req, res) => {
    res.json (req.file).status (200);
    const students = convertToJson("applicantListsExcel.xlsx");
    let placedStudents = [];
    let rankedApplicants = []
    let waitingList = []
    createApplicantList(students, rankedApplicants);
    createAcceptedList(students, placedStudents);
    createWaitingList(rankedApplicants, waitingList)
    saveApplicantsIDs()
});

router.post('/applicants-list', async (req, res) => {
    console.log(req.body)
    try {
        let response;
        let list;
        // 0 POST, 1 GET
        if(req.body.type === "0"){
            delete req.type
            response = res.status(201)
        }else {
            if(req.body.listType === 1){
                fs.readFile('./public/files/rankedApplicants.txt', 'utf8', (err, data) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    list = JSON.parse(data)
                    res.status(302).send(list)
                });
            } else if(req.body.listType === 2){
                fs.readFile('./public/files/acceptedStudents.txt', 'utf8', (err, data) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    list = JSON.parse(data)
                    res.status(302).send(list)
                });
            } else if(req.body.listType === 3){
                fs.readFile('./public/files/waitingList.txt', 'utf8', (err, data) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    list = JSON.parse(data)
                    res.status(302).send(list)
                });
            }
            response = res.status(302)
        }

    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

module.exports = router