import express, { urlencoded } from "express"
const app = express()

app.use(express.urlencoded({extended:true}))

import userRouter from "./routes/user.routes.js"
app.use("/", userRouter)
export {app}