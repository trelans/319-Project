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
            file.fieldname + '-' + Date.now () + path.extname (file.originalname)
        );
    },
});

// initialize multer
const upload = multer ({
    storage: storageEngine,
});

function createAcceptedList(students, placed_students) {
    const keys = Object.keys(students["Placed"][0]);
    const values = Object.values(students["Placed"][0]);
    for (let i = 1; i < students["Placed"].length; i++) {
        let placed_student = {};
        for (let j = 0; j < keys.length; j++) {
            placed_student[values[j]] = students["Placed"][i][keys[j]]
        }
        placed_students.push(placed_student)
    }
    const placedStudentsJSON = {"data": placed_students}
    const content = JSON.stringify(placedStudentsJSON)
    console.log(content)

    fs.writeFile('./public/files/acceptedStudents.txt', content, err => {
        if (err) {
            console.error(err);
        }
        // file written successfully
    });
}

// routing
router.post ('/upload-excel', upload.single ('uploadedFile'), (req, res) => {
    res.json (req.file).status (200);
    const students = convertToJson("uploadedFile-1670977312640.xlsx");
    let placed_students = [];
    let rankedApplicants = []
    console.log(students["Sayfa1"]);
    const keys = Object.keys(students["Sayfa1"][0]);
    const values = Object.values(students["Sayfa1"][0]);
    for (let i = 1; i < students["Sayfa1"].length; i++) {
        let rankedApplicant = {};
        for (let j = 1; j < keys.length; j++) {
            let value = students["Sayfa1"][i][keys[j]] || "";
            rankedApplicant[values[j]] = value
        }
        rankedApplicants.push(rankedApplicant)
    }
    console.log(rankedApplicants)
    const content = JSON.stringify(rankedApplicants)
    fs.writeFile('./public/files/rankedApplicants.txt', content, err => {
        if (err) {
            console.error(err);
        }
        // file written successfully
    });

    /*
    const placedStudentsJSON = {"data": placed_students}
    const content = JSON.stringify(placedStudentsJSON)
    console.log(content)

    fs.writeFile('./public/files/acceptedStudents.txt', content, err => {
        if (err) {
            console.error(err);
        }
        // file written successfully
    });
    //createAcceptedList(students, placed_students);
     */
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
            }
            response = res.status(302)
        }

    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

module.exports = router