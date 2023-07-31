import {NextFunction, Response, Request } from "express";
import  {User}  from "../models/userModel";
import { v4 as uuidv4 } from "uuid";
import {Note} from "../models/notesModel";
import bcrypt from 'bcrypt'


export async function signUp (req: Request, res:Response, next: NextFunction){
const userId = uuidv4();
const saltRounds = 10
let plainPassword = req.body.password;
const {username, email, firstname, lastname } = req.body

const password = await bcrypt.hash(plainPassword, saltRounds)

try {
    const newUser = await User.create({
        username,
        email,
        firstname,
        lastname,
        userId: userId,
        password
    })
       res.status(201).json({
        message: "New User created",
        data: {newUser}
       })
} catch (error) {
        res.status(500).json({
        error: "Internal server error"
    })
}

   
}
export async function signIn (req: Request, res: Response, next:NextFunction) {

    const {username, password} = req.body
   
    try {
        const {dataValues: userData} = await User?.findByPk(username, {include: [Note]})
      
        if(!userData){
            res.status(401).json({
                status: "404",
                message: 'Invalid username or password'
            })
        }   

        if(userData?.password !== password){ 
            res.status(401).json({
                status: "404",
                message: 'Invalid username or password'
            })
        }
        res.status(200).json({
            message: "Login successful",
            user:  userData
        })
    
    } catch (error) {
        res.status(500).json({
            error: "Internal server error"
        })
    }
   
  }
// function signIn (req: Request, res: Response, next: NextFunction){
//     const  {username, email} = req.body

//     try{
//         const user = User.findOne({ username });

//         if(!user){

//         }
//     }
//     catch{

//     }
// }