import express, { NextFunction, Response, Request } from 'express';
import { signUp } from '../controller/usersController';


const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', signUp )

export default router;
