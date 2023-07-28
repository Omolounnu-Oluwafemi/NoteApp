import { Sequelize } from "sequelize";

const database = new Sequelize("database", "MyNotes", "password",{
    dialect: 'sqlite',
    storage: "./database.sqlite",
    logging: false
})

export default database

