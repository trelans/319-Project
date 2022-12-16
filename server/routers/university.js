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
    departments.forEach(async depName => {
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
    delete req.body["departments"]
    delete req.body["quota"]
    delete req.body["fallSuitability"]
    delete req.body["springSuitability"]
    const university = new University(req.body);
    try {
        await university.save()
        res.status(201).send({ university })
    } catch (e) {
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

router.patch('/tasks/:id', auth, async (req,res) => {
    
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid Updates!'})
    }

    try{
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})

        if(!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => {
            task[update] = req.body[update]
        })

        await task.save()

        res.send(task)
    }catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req,res) => {

    try {
        //const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})

        if(!task) {
            return res.status(404).send()
        }

        res.send(task)
    }catch(e) { 
        res.status(500).send()
    }
})
*/

module.exports = router