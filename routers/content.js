import express from "express"

const router = express.Router()

router.get("/content", async (req, res) => {
    res.json({ data: "Hello!" })
})

export default router
