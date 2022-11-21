const express = require('express')
require('./db/mongoose') //connect to db
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const loginRouter = require('./routers/loginPages')
const applicationRouter = require('./routers/application')
const port = process.env.PORT || 8080
const cors = require("cors");

const app = express()

// required to send requests from client side that is run in the same pc with the server
// (probably it will be deleted after deploying)
app.use(cors());

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
//app.use(loginRouter)
//app.use(applicationRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

module.exports = app
