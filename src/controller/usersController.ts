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