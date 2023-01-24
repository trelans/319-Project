const express = require('express')
const University = require('../models/university')
const auth = require('../middleware/auth')
const Department = require("../models/department")
const router = new express.Router()

router.post('/create/newUniversity', async (req, res) => {
    const departments = req.body.departments
    const quota = req.body.quota
    const universityId = req.body.universityId
    const fallSuitability = req.body.fallSuitability
    const springSuitability = req.body.springSuitability

    /*
    if(departments) {
        departments?.forEach(async depName => {
            const department = await Department.findOne({ name: depName })
            if (department) {
                console.log(req.body.quota)
                department.hostUniversities.push({
                    universityId: universityId,
                    quota: quota,
                    fallSuitability: fallSuitability,
                    springSuitability: springSuitability
                })
                department.save()
            } else {
                console.log("Given Department is not yet created!")
            }
        })    
    }
    */

    delete req.body["departments"]
    delete req.body["quota"]
    delete req.body["fallSuitability"]
    delete req.body["springSuitability"]

    console.log("hello")
    console.log(req.body)
    const university = new University({...req.body, name: req.body.universityName});

    try {
        await university.save()
        res.status(201).send({ university })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})


router.get('/universities', auth, async (req,res) => {

    try {
        const universities = await University.find();
        res.send(universities)
    } catch(e) {
        console.log(e)
        res.status(500).send(e)
    }
    
})

router.post('/updateAllUniversities', async (req,res) => {
    
    const updates = Object.keys(req.body)

    try{
        const universities = await University.find()

        universities.forEach(async (university) => {
                updates.forEach((update) => {
                university[update] = req.body[update]
            })
            await university.save()
        })

        res.send("successful")
    }catch(e) {
        res.status(400).send(e)
    }
})

router.get('/university/:id', async (req, res) => {

    try {
        const university = await University.findById(req.params.id)

        if (!university) {
            throw new Error()
        }

        res.send(university)
    } catch (e) {
        res.status(404).send()
    }
})

/*
router.get('/tasks/:id', auth, async (req,res) => {

    const _id = req.params.id;

    try {
        const task = await Task.findOne({_id, owner: req.user._id})

        if(!task) {
            return res.status(404).send(task)
        }

        res.send(task)
    } catch(e) {
        res.status(500).send(e)
    }
})

*/
router.patch('/updateUniversity/:id', auth, async (req,res) => {
    
    const updates = Object.keys(req.body)

    try{
        const university = await University.findOne({_id: req.params.id})

        if(!university) {
            return res.status(404).send()
        }

        updates.forEach((update) => {
            university[update] = req.body[update]
        })

        await university.save()
        res.send(university)
    }catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/university/:id', auth, async (req,res) => {

    try {
        //const task = await Task.findByIdAndDelete(req.params.id)
        const university = await University.findOneAndDelete({_id: req.params.id})

        if(!university) {
            return res.status(404).send()
        }

        res.send(university)
    }catch(e) { 
        res.status(500).send(e)
    }
})


module.exports = router