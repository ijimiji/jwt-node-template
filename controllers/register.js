import userDB from "../db/userDb.js"
import jwt from "jsonwebtoken"

const secret = process.env.SECRET

export default async (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
    };

    const userFound = await userDB.findUserByUsername(user.username);

    if (!userFound) {
        await userDB.createUser(user);
        const token = jwt.sign(user, secret, { expiresIn: "1h" });
        res.json({ token: token });
    } else {
        res.status(400).json({ error: "User is already registered" });
    }
};