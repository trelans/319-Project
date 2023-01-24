const users = []

const addUser = ({id,username,room}) => {

    //clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    //validate the data
    if(!username || !room) {
        return {
            error:'Invalid Login.'
        }
    }

    //check for existing user
    const existingUser = users.find( (user) => {
        return user.room === room && user.username === username
    })

    //validate username
    if(existingUser) {
        return {
            error: 'Username is already taken!'
        }
    }

    //store user
    const user = {id, username, room}
    users.push(user)
    return {user}
}

const removeUser = (id) => {
    const index = users.findIndex((user) => {
        return user.id === id
    })

    if(index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {

    const theUser = users.find( (user) => {
        return user.id === id
    })

    return theUser
}

const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase()

    const theUsers = users.filter( (user) => {
        return user.room === room
    })

    return theUsers
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}