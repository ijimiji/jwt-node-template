import express from "express"
import contentController from "../controllers/content.js"

const router = express.Router()

router.get("/content", contentController)

export default router
