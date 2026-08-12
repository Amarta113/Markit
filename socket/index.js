import { Server } from 'socket.io'
import http from 'http'
import express from 'express'
import cors from 'cors'
import "dotenv/config"

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(cors())
app.use(express.json())

let users = []

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) && users.push({userId, socketId})
}

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId)
}

const getUser = (receiverId) => {
    return users.find((user) => user.userId === receiverId)
}

// define a message object with seen property
const createMessage = ({senderId, receiverId, text, images}) => ({
    senderId,
    receiverId,
    text,
    images,
    seen: false
})

io.on("connection", (socket) => {
    // when connect
    console.log(`A user is connected`)

    // take user Id and socket id from user
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id)
        io.emit("getUsers", users)
    })

    // send and get msg
    const messages = {}
    socket.on("sendMessage", ({senderId, receiverId, text, images}) => {
        const message = createMessage({senderId, receiverId, text, images})
        const user = getUser(receiverId)

        // store the messages in the msg object
        if(!message[receiverId]){
            messages[receiverId] = [message]
        } else{
            messages[receiverId].push(message)
        }

        // Send the message to the receiver
        io.to(user?.socketId).emit("getMessage", message)
    })

    socket.on("messageSeen", ({senderId, receiverId, messageId}) => {
        const user = getUser(senderId)

        // update the seen flag for the msg
        if(message[senderId]){
            const message = messages[senderId].find((message) => message.receiverId === receiverId && message.id === messageId)
            if(message){
                message.seen = true
                
                // send a message seen event to the sender
                io.to(user?.socketId).emit("messageSeen", {
                    senderId,
                    receiverId,
                    messageId
                })
            }
        }
    })

    // update and get last message
    socket.on("updateLastMessage", ({lastMessage, lastMessagesId}) => {
        io.emit("getLastMessage", {
            lastMessage,
            lastMessagesId
        })
    })
})

io.on('disconnect', () => {
    console.log(`A user disconnected!`)
    removeUser(socket.id)
    io.emit("getUsers", users)
})

app.get('/', (req, res) => {
    console.log("Hello")
})

server.listen(process.env.PORT, () => {
    console.log(`Server is running on Port: ${process.env.PORT}`)
})