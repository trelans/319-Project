const express = require('express')
const Notification = require('../models/notification')
const auth = require('../middleware/auth')
const router = new express.Router()


router.post('/createNotification', auth, async (req,res) => {
    const notification = new Notification({
        ...req.body,
        owner: req.user._id
    })

    try {
        await notification.save()
        res.send(notification)
    } catch(e) {
        res.status(400)
        res.send(e)
    }
})


router.get('/notifications', auth, async (req,res) => {

    const match = {}
    const sort = {}

    if(req.query.completed) {
        match.completed = (req.query.completed === 'true')
    }

    if(req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {

        await req.user.populate({
            path: 'notifications', 
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort: {updatedAt: -1}
            }
        })
        
        res.send(req.user.notifications)
    } catch(e) {
        console.log(e)
        res.status(500).send(e)
    }
    
})

router.post("/readNotification", auth, async (req,res) => {
    const notification = Notification.findById(req.body.id) 
    notification.read = true;
    notification.save()
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
*/

router.delete('/notifications/:id', auth, async (req,res) => {
    try {
        const notification = await Notification.findOneAndDelete({_id: req.params.id, owner: req.user._id})

        if(!notification) {
            return res.status(404).send()
        }

        res.send(notification)
    }catch(e) { 
        res.status(500).send()
    }
})


module.exports = router