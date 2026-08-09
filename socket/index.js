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

app.get('/', (req, res) => {
    app.send("Hello socket")
})

server.listen(process.env.PORT, () => {
    console.log(`Server is running on Port: ${process.env.PORT}`)
})