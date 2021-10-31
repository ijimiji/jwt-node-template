import imageDb from "../db/imageDb.js"


export default async (req, res) => {
    res.json({ filename: req.file.filename })
}