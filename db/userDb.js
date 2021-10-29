import sequelize from "sequelize"
const DataTypes = sequelize.DataTypes;
import db from "./db.js"
import bcrypt from "bcrypt"

const saltRounds = Number(process.env.SALT);

const User = db.define("user", {
    username: DataTypes.TEXT,
    password: DataTypes.TEXT,
});

User.sync()

User.beforeSave(async (user, options) => {
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
});

export default {
    findUserByUsername: async (username) => {
        const user = await User.findOne({ where: { username: username } })
        return user
    },
    createUser: async (user) => {
        const res = await User.create(user)
        return res
    }
}
