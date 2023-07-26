import { Sequelize } from "sequelize";

const sequelize = new Sequelize("database", "MyNotes", "password",{
    dialect: 'sqlite',
    storage: "../..database.sqlite",
    logging: false
})

export default sequelize