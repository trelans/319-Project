const express = require('express')
require('./db/mongoose') //connect to db
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const loginRouter = require('./routers/loginPages')
const applicationRouter = require('./routers/application')
const formRouter = require('./routers/form')
const listRouter = require('./routers/list')
const port = process.env.PORT || 8080
const cors = require("cors");
const messageRouter = require('./routers/message')
const profileRouter = require('./routers/profiles')

const app = express()
const excelToJson = require('./convertor/convertToJson')
const bodyParser = require("body-parser");

//const mailSender = require('./utils/mailSender')

// required to send requests from client side that is run in the same pc with the server
// (probably it will be deleted after deploying)
// middleware
app.use (bodyParser.json ());
app.use (bodyParser.urlencoded ({extended: true}));
app.use (cors ());

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
app.use(loginRouter)
app.use(applicationRouter)
app.use(formRouter)
app.use(messageRouter)
app.use(listRouter)
app.use(profileRouter)

/*
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
*/

//console.log(excelToJson)
//mailSender.transporter

module.exports = app
