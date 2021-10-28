import dotenv from "dotenv"

dotenv.config({
    path: "./common/.env",
    silent: process.env.NODE_ENV === 'production'
})
