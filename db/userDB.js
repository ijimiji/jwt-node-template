import sequelize from "sequelize"
const { Sequelize, DataTypes } = sequelize;
import bcrypt from "bcrypt"

const saltRounds = Number(process.env.SALT);

const dbConnection = new Sequelize('postgres', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
});

const User = dbConnection.define("user", {
    username: DataTypes.TEXT,
    password: DataTypes.TEXT,
});


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
