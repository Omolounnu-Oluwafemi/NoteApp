import { Sequelize } from "sequelize";

const database = new Sequelize("database", process.env.USERNAME, process.env.PASSWORD,{
    dialect: 'sqlite',
    storage: "./database.sqlite",
    logging: false
})

export default database

