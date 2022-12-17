const express = require('express')
const User = require('../models/user')
const University = require('../models/university')
const Department = require("../models/department")
const Application = require("../models/application")
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const router = new express.Router()
const path = require('path')
const Task = require("../models/task");

// Transport these to profiles routes Later
router.get('/profiles/universities/:id', async (req,res) => {
    const _id = req.params.id
    try {
        const university = await University.findOne({_id})
        console.log(university)
        return res.send(university)
    }catch (e) {
        res.status(500).send(e)
    }
})

/*
router.post('/profiles/universities/:id', async (req,res) => {
    const _id = req.params.id
    try {
        const university = await University.findOne({_id})
        console.log(university)
        return res.send(university)
    }catch (e) {
        res.status(500).send(e)
    }
})
*/

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


router.post('/create/newCandidate', async (req, res) => {
    const university = await University.findOne({ "name": req.body.nominatedUniversity })
    const departments = []

    // Do NOT use forEach with await functions, use this method instead
    await Promise.all(req.body.departments.map(async (e) => {
        const department = await Department.findOne({ "name": e.name})
        departments.push({"id": department._id, "type": e.type})
    }))

    delete req.body.nominatedUniversity
    delete req.body.departments

    req.body.erasmusCandidateData.departments = departments

    req.body.erasmusCandidateData.nominatedUniversityId = university._id
    const user = new User(req.body);

    try {
        const application = await Application.createApplication(user)
        await application.save()
        await user.save()
        res.status(201).send({ user, token, application })
    } catch (e) {
        // console.log(e)
        res.status(400).send(e)
    }
})

router.post('/create/newErasmusCoordinator', async (req, res) => {
    const user = new User(req.body);
    console.log(user)
    try {
        await user.save()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

/*
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
*/

// Only in dev mode (once every department in Bilkent created, the method will serve its purpose)
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

router.post('/dashboard', async (req, res) => {
    console.log(req.body)
    try {
        const user = await User.findById(req.body.id)

        // 0 POST, 1 GET
        if(req.body.type === "0"){
            // TODO IF there is any post, it will get there
        }else {
            res.status(302).send(user)
        }
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

/*
router.get('/create/loginpage', async (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/login.html'))
})
*/


router.get('/getAllUsers', auth, async (req,res) => {

    try {
        const users = await User.find();
        res.send(users)
    } catch(e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.post('/users', async (req,res) => {
    const user = new User(req.body);

    try {
        await user.save()
        res.status(201).send({user,token})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        if (user.active) {
            const token = await user.generateAuthToken()
            res.send({ user, token })
        } else {
            throw new Error('The Account is not active!')
        }
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        //remove the specific token
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        //remove all tokens
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


router.post('/users/initContacts', async (req, res) => {
    try {
        var users = await User.find();

        contacts = users.map((cnt) => {
            return {
                name: cnt.name,
                surname: cnt.surname,
                objectId : cnt._id
            }
        })

        //update contacts
        for(let i = 0; i < users.length; i++) {
            users[i].contacts = contacts
            await users[i].save()
        }

        res.send("successful")
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.post('/users/contacts', auth, async (req, res) => {
    try {
        const type = req.user.userType
        var contacts = await User.find();

        /*
        if(type == 0) {
            contacts = await User.find( {
                userType: {
                    $all: 1
                }
            })
        }
        else {
            contacts = await User.find( {
                userType: {
                    $all: 0
                }
            })
        }
        */

        contacts = contacts.map((cnt) => {
            return {
                name: cnt.name,
                surname: cnt.surname,
                objectId : cnt._id
            }
        })

        //update contacts 
        req.user.contacts = contacts
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})


router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates!' })
    }

    try {
        const user = req.user

        updates.forEach((update) => {
            user[update] = req.body[update]
        })

        await user.save()
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {

        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error('Please upload an image'))
            return
        }

        cb(undefined, true)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {

    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer

    await req.user.save()

    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', auth, async (req, res) => {

    req.user.avatar = undefined
    await req.user.save()

    res.status(200).send()
})

router.get('/user/:id', async (req, res) => {

    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            throw new Error()
        }

        res.send(user)

    } catch (e) {
        res.status(404).send()
    }
})

router.get('/users/:id/avatar', async (req, res) => {

    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)

    } catch (e) {
        res.status(404).send()
    }
})

router.delete('/users/me', auth, async (req, res) => {

    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router