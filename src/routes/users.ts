import express, { NextFunction, Response, Request } from 'express';
import { signUp, signIn} from '../controller/usersController';


const router = express.Router();

/* GET users listing. */
router.post('/signin', signIn);

router.post('/signup', signUp)

export default router;
