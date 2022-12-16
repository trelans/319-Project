const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const router = new express.Router()
const Application = require('../models/application')
const Department = require("../models/department");

router.post('/create/newDepartment', async (req, res) => {
    console.log(req.body)
    try {
        let department;
        let response;
        // 0 POST, 1 GET
        if(req.body.type === "0"){
            delete req.type
            department = new Department(req.body);
            response = res.status(201)
        }else {
            department = await Department.findById(req.body.depId);
            response = res.status(302)
        }
        await department.save()
        console.log(department)
        response.send(department)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

module.exports = router