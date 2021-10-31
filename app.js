import "./config/dotenv.js"
import cors from "./middleware/cors.js"
import auth from "./middleware/auth.js"
import login from "./routers/login.js"
import image from "./routers/image.js"
import register from "./routers/register.js"
import content from "./routers/content.js"
import express from "express"

const port = 3000
const host = '127.0.0.1'

express()
    .use(express.json())
    .use(cors)
    .use(login)
    .use(register)
    .use(image)
    .use(auth, content)
    .listen(3000, host, _ => console.log(`Listening on http://${host}:${port}/`))
