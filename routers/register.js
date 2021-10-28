import express from "express"
import userDB from "../db/userDB.js"
import jwt from "jsonwebtoken"

const router = express.Router()
const secret = process.env.SECRET

router.post("/register", async (req, res) => {
    const user = {
        "username": req.body.username,
        "password": req.body.password
    }

    const userFound = await userDB.findUserByUsername(user.username)

    if (!userFound) {
        await userDB.createUser(user)
        const token = jwt.sign(user, secret, { expiresIn: '1h' })
        res.json({ token: token })
    } else {
        res.status(400)
        res.json({ error: "User is already registered" })
    }
})

export default router;
