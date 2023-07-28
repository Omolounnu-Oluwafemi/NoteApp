import express, { NextFunction, Response, Request } from 'express';
import { signUp, getUser} from '../controller/usersController';


const router = express.Router();

/* GET users listing. */
router.get('/:id', getUser);

router.post('/', signUp )

export default router;
