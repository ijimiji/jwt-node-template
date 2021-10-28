import express from "express"
import userDB from "../db/userDB.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const router = express.Router()
const secret = process.env.SECRET;

router.post("/login", async (req, res) => {
    const user = {
        "username": req.body.username,
        "password": req.body.password
    }

    const userFound = await userDB.findUserByUsername(user.username)

    if (userFound) {
        const passwordIsRight = await bcrypt.compare(user.password, userFound.password)
        if (passwordIsRight) {
            const token = jwt.sign(user, secret, { expiresIn: '1h' })
            res.json({ token: token })
        } else {
            res.status(400)
            res.json({ error: "Wrong password" })
        }
    } else {
        res.status(400)
        res.json({ error: "User is not registered" })
    }
})

export default router;
