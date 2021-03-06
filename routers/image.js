import express from "express"
import multer from "multer"
import imageController from "../controllers/image.js"

const router = express.Router()

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads')
        },
        filename: function (req, file, cb) {
            const extension = file.originalname.split(".").slice(-1)[0]
            const timestamp = String(+Date.now())
            cb(null, `${timestamp}.${extension}`)
        }
    })
})
router.post("/image/upload", upload.single("image"), imageController)

export default router