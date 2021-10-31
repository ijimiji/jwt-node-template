import userDB from "../db/userDb.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const secret = process.env.SECRET;

export default async (req, res) => {
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
            res.status(400).json({ error: "Wrong password" })
        }
    } else {
        res.status(400).json({ error: "User is not registered" })
    }
}
