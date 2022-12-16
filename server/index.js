const app = require('./app')
const {Server}= require('socket.io')
const http = require("http");

/*
const Filter = require('bad-words')
const {generateMessage, generateLocationMessage} = require('./utils/messages')
const {addUser,removeUser,getUser,getUsersInRoom} = require('./utils/users')
*/

const port = process.env.PORT || 8080
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
})

server.listen(port, () => {
    console.log(`Server started on ${port}`)
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`)

    global.chatsocket = socket;

    socket.on("addUser", (id) => {
        console.log("addUser request")
        console.log(id)
        onlineUsers.set(id, socket.id)
        console.log(onlineUsers)
    })

    socket.on("send-msg", (data) => {
        console.log("hintli")
        console.log(onlineUsers)
        console.log(data)
        console.log(data.to)
        const sendUserSocket = onlineUsers.get(data.to)
        console.log("here")
        console.log(sendUserSocket)
        if(sendUserSocket) {
            console.log("I am ")
            socket.to(sendUserSocket).emit("msg-receive", data.message)
        }
    })
});


/*
const server = app.listen(port, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

const io = socket(server, {
    cors: {
      origin: "http://localhost:3000"
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`)

    socket.on("send_message", (data) => {
        console.log(data)
    })
    
    /*
    global.chatSocket = socket;

    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
  
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      }
    });
    */

/*
});
*/

/*
io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.on('join', ({username, room}, callback) => {
        const {error, user} = addUser({id: socket.id, username, room})

        if(error) {
            callback(error)
            return
        }

        socket.join(user.room)

        socket.emit('message', generateMessage('Admin','Welcome!'))
        socket.broadcast.to(user.room).emit('message', generateMessage('Admin',`${user.username} has joined!`))
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })

        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()

        const user = getUser(socket.id)

        if(filter.isProfane(message)) {
            return callback('Profanity is not allowed')
        }

        io.to(user.room).emit('message', generateMessage(user.username,message))
        callback();
    })

    socket.on('sendLocation', (pos,callback) => {

        const user = getUser(socket.id)

        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username,`https://google.com/maps?q=${pos.latitude},${pos.longitude}`))
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if(user) {
            io.to(user.room).emit('message', generateMessage('Admin',`${user.username} has left!`))
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
    })
})
*/

/*
server.listen(port, () => {
    console.log('Server is up on port ' + port)
})
*/
