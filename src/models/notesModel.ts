import { DataTypes, Model } from "sequelize";
import database from "../config/db.config";
import {User}  from "./userModel";

interface NotesAttributes{
    title: string;
    description: string;
    DueDate: string;
    status: string;
    noteId: string;
    userId: string;
}

export class Note extends Model <NotesAttributes> {
}

Note.init(
    {
    title:{
            type: DataTypes.STRING,
            allowNull: false
        },
    description: {
            type: DataTypes.STRING,
            allowNull: false
        },
    DueDate: {
            type: DataTypes.STRING,
            allowNull: false
        },
    status: {
            type: DataTypes.STRING,
            allowNull: false
        },
    noteId:{
            type: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
    userId:{
            type: DataTypes.UUIDV4,
            allowNull: false,
        }
    },
    {
    sequelize: database,
    modelName: "Note"
    }
);




