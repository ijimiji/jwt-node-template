import jwt from "jsonwebtoken"

export default async (req, res, next) => {
    try {
        const decoded = jwt.verify(req.body.token, process.env.SECRET)
        next()
    } catch {
        res.status(401)
        res.json({ error: "User is not logged in" })
    }
}
