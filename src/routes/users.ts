import express from 'express';
import { signUp, signIn, deleteAccount} from '../controller/usersController';


const router = express.Router();

/* GET users listing. */
router.post('/signin', signIn);

router.post('/signup', signUp)

router.delete('/:id', deleteAccount);

export default router;
