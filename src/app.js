const express = require('express')
require('./db/mongoose') //connect to db
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
//const loginRouter = require('./routers/login-pages')
const path = require('path')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
//app.use(loginRouter)
app.use(express.static(publicDirectoryPath))

module.exports = app