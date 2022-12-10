const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const router = new express.Router()

router.get('/application', auth, async (req,res) => {
    
})

router.patch('/application', auth, async (req,res) => {
})

router.post('/application', auth, async (req,res) => {


})


router.delete('/application', auth, async (req,res) => {
    try {
        if (req.deleteType == "discard"){
            // TODO: Add student to the waiting list
        }
        res.send(await Application.removeApplication(req.application._id)) // Returned query will be sent to frontend
    }catch(e) { 
        res.status(500).send(e.message)
    }
})