import { NextFunction, Response,Request } from "express";
import { User } from "../models/userModel";
import { v4 as uuidv4 } from "uuid";


export async function signUp (req: Request, res:Response, next: NextFunction){
const Id = uuidv4()
const {username, email, firstname, lastname } = req.body

const newUser = await User.create({
    id: Id,
    username,
    email,
    firstname,
    lastname
})
   console.log(newUser);

   res.status(201).json({
    data: {newUser}
   })
   
}
export async function getUser (req: Request, res: Response, next:NextFunction) {

    const user = await User.findByPk(req.params.id)
    if(!user){
        res.status(404).json({
            status: "404",
            message: 'User not found'
        })
    }   
    res.status(200).json({
        user: user
    })

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