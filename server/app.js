const express = require('express')
require('./db/mongoose') //connect to db
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const loginRouter = require('./routers/loginPages')
const applicationRouter = require('./routers/application')
const formRouter = require('./routers/form')
const port = process.env.PORT || 8080
const cors = require("cors");

const app = express()
const excelToJson = require('./convertor/convertToJson')
//const mailSender = require('./utils/mailSender')

// required to send requests from client side that is run in the same pc with the server
// (probably it will be deleted after deploying)
app.use(cors());

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
app.use(loginRouter)
app.use(applicationRouter)
app.use(formRouter)

/*
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
*/

//console.log(excelToJson)
//mailSender.transporter

module.exports = app
