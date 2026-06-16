import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express"
import { errorMiddleware } from "./middleware/error.js";
import userRouter from "./routes/userRouter.js"
import shopRouter from "./routes/shopRouter.js"
import connectDb from "./db/Database.js";
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use('/api/v1/user', userRouter)
app.use('/api/v1/seller', shopRouter)

app.get('/', (req, res) => {res.json({success: true, message: "server is running"})})
app.use(errorMiddleware)


const PORT = process.env.PORT || 8000

await connectDb(); 
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})


process.on("unhandledRejection", (err) => {
    console.log(`Shutting down the server for ${err.message}`)
    console.log(`Shutting down the server for unhandled promise rejection`)
    server.close(() => {
        process.exit(1)
    })
})


