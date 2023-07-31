import {DataTypes, Model} from 'sequelize'
import database from '../config/db.config'
import  {Note} from "./notesModel"


interface UserAttributes{
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    userId: string;
    password: string
}

export class User extends Model <UserAttributes> {}

User.init(
    {
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
        unique: true,
        primaryKey: true,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId:{
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    },
{
    sequelize: database,
    modelName: "User",
}
)

User.hasMany( Note, {
    foreignKey: 'userId'
})

Note.belongsTo(User, {
    foreignKey: 'userId'
})
