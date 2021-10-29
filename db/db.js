import sequelize from "sequelize"
const Sequelize = sequelize.Sequelize;


const dbConnection = new Sequelize('postgres', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
});

export default dbConnection