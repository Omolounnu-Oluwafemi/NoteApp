import { signtoken } from './utils';
import {NextFunction, Response, Request } from "express";
import jwt from 'jsonwebtoken';
import  {User}  from "../models/userModel";
import { v4 as uuidv4 } from "uuid";
import {Note} from "../models/notesModel";
import bcrypt from 'bcrypt'
import {signUpValidator, signInValidator, options} from '../utils/validate'


 // Generates a JSON Web Token (JWT) for a user.
const signToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN;

  if (!secret || !expiresIn) {
    throw new Error('JWT secret or expiration time not provided');
  }

  const token = jwt.sign({ userId }, secret, { expiresIn });

  return token;
};

export default signToken;



 //Creates a new user account.
export async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const saltRounds = 10;
    const userId = uuidv4();

    // Validate the user input data
    const { error } = signUpValidator.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message
      });
    }

    const { username, email, firstname, lastname } = req.body;

    // Check if the email or username already exists in the database
    const user = await User.findOne({ where: { email } || { username } });
    if (user) {
      return res.status(400).json({
        message: "Email or username already exists"
      });
    }

    const plainPassword = req.body.password;

    // Hash the user's password
    const password = await bcrypt.hash(plainPassword, saltRounds);

    // Generate a JWT token for the user
    const token = signToken(userId);

    // Create a new user in the database
    const newUser = await User.create({
      username,
      email,
      firstname,
      lastname,
      userId,
      password
    });

    return res.status(201).json({
      message: "New User created",
      token,
      data: { newUser }
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error"
    });
  }
}
export async function signIn (req: Request, res: Response, next:NextFunction) {

    const validate = signInValidator.validate(req.body, options)

    if(validate.error){
        return res.status(400).json({
            Error: validate.error.details[0].message
        })
    }
    const {username, password} = req.body
   
    try {
        const {dataValues: userData} = await User?.findOne( { where: {username}, include: [Note]  })

        if(!userData){
            return res.status(401).json({
                status: "404",
                message: 'Invalid username or password'
            })
        }  

        const passwordMatch = await bcrypt.compare(password, userData.password )

        if(!passwordMatch){
            return res.status(401).json({
                status: "404",
                message: 'Invalid username or password'
            })
        }  


        const token = signToken(userData.userId) 
        res.status(200).json({
            message: "Login successful",
            token,
            user:  userData
        })
    
    } catch (error) {
        res.status(500).json({
            error: "Internal server error"
        })
    }
   
  }

  export async function deleteAccount(req: Request, res:Response, next: NextFunction){
    const userId = req.params.id
    
        const accToDelete = await User.findOne( {where: {userId}})
        
        try{
            if(!accToDelete){
               return res.status(400).json({
                    error: "User already deleted"
                })
            }
            await accToDelete?.destroy()

            res.status(200).json({
                message: "Account deleted succesfully"
            })
        }catch (error){
            res.status(501).json({
            error: "Internal server error"
        })
        }
        

        

   
  }