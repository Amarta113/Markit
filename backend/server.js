import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express"
import { errorMiddleware } from "./middleware/error.js";
import userRouter from "./routes/userRouter.js"
import shopRouter from "./routes/shopRouter.js"
import connectDb from "./db/Database.js";
import dns from "dns";
import productRouter from "./routes/productRouter.js";
import eventsRouter from "./routes/eventRouter.js";
import couponCodeRouter from "./routes/couponRouter.js";
import paymentRouter from "./routes/paymentRouter.js";
import conversationRouter from './routes/conversationRouter.js'
import messageRouter from "./routes/messageRouter.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express()

const allowedOrigins = new Set([
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "https://markit-rosy.vercel.app",
    "https://markit-backend-tau.vercel.app",
    process.env.FRONTEND_URL?.trim(),
    process.env.CLIENT_URL?.trim(),
    process.env.VERCEL ? `https://${process.env.VERCEL}` : null
].filter(Boolean));

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: (origin, callback) => {
        const normalizedOrigin = origin?.replace(/\/$/, "");
        if (!origin || allowedOrigins.has(normalizedOrigin) || normalizedOrigin?.includes(".vercel.app")) {
            callback(null, true);
            return;
        }

        callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}))
app.use('/api/v1/user', userRouter)
app.use('/api/v1/seller', shopRouter)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/event', eventsRouter)
app.use('/api/v1/coupon', couponCodeRouter)
app.use('/api/v1/payment', paymentRouter)
app.use('/api/v1/conversation', conversationRouter)
app.use('/api/v1/message', messageRouter)

app.get('/', (req, res) => {res.json({success: true, message: "server is running"})})
app.use(errorMiddleware)

const PORT = process.env.PORT || 8000;
let server;

await connectDb();

if (!process.env.VERCEL) {
    server = app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`)
    })
}

process.on("unhandledRejection", (err) => {
    console.log(`Shutting down the server for ${err.message}`)
    console.log(`Shutting down the server for unhandled promise rejection`)
    if (server && typeof server.close === "function") {
        server.close(() => {
            process.exit(1)
        })
    }
})

export default app;


