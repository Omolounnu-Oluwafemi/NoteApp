"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize("database", "MyNotes", "password", {
    dialect: 'sqlite',
    storage: "../..database.sqlite",
    logging: false
});
exports.default = sequelize;
