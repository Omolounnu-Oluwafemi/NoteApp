import { DataTypes, Model } from "sequelize";
import database from "../config/db.config";

interface NotesAttributes{
    title: string;
    description: string;
    DueDate: string;
    status: string;
    id: string;
}

export class Note extends Model <NotesAttributes> {}

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
        id:{
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        }
    },
    {
    sequelize: database,
    modelName: "Note"
    }
)

