import {DataTypes, Model} from 'sequelize'
import database from '../config/db.config'


interface UserAttributes{
    id: string;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
}

export class User extends Model <UserAttributes> {}

User.init(
    {
    id:{
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    firstname:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    },
{
    sequelize: database,
    modelName: "User",
}
)