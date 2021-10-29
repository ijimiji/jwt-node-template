import multer from "multer"
import express from "express"
import imageDb from "../db/imageDb.js"
const router = express.Router()
const upload = multer({ //dest: 'uploads/', 
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

router.post("/image/upload", upload.single("image"), async (req, res) => {
    res.json({ filename: req.file.filename })
})

export default router