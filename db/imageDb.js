import sequelize from "sequelize"
const DataTypes = sequelize.DataTypes;
import db from "./db.js"

const Pictures = db.define("image", {
    fileName: DataTypes.TEXT,
    owner: {type: DataTypes.TEXT, defaultValue: "admin"}
});

Pictures.sync()

export default {
    loadImage: async (fileName) => {
        const image = await Pictures.findOne({ where: { fileName: fileName } })
        return image.fileName
    },
    uploadImage: async (fileName) => {
        Pictures.create({
            fileName: fileName
        })
    }
}