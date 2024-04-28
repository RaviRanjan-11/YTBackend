import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: false
}))

app.use(express.json({
    // max limit for request
    limit: "16kb"
}))

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

app.use(cookieParser())


// Routes

app.use("/users", userRouter)

import userRouter from './routes/user.routes.js'
export {app}