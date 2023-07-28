import express, {Request, Response, NextFunction} from "express";

const router = express.Router();


const getNotes = (req: Request, res: Response, next: NextFunction) =>{ 
  res.status(200).json({
    "status": 'sucess',
    "message": "All notes will be seen here"
  })
}

const createNote = (req: Request, res: Response, next: NextFunction) =>{
  res.status(200).json({
    "status": 'sucess',
    "message": "Only users can post a new note"
  })
}

const updateNote = (req: Request, res: Response, next: NextFunction) =>{
  res.status(200).json({
    "status": 'sucess',
    "message": "Only users can edit their created notes"
  })
}
const deleteNote = (req: Request, res: Response, next: NextFunction) =>{
  res.status(200).json({
    "status": 'sucess',
    "message": "Only users can delete their created notes"
  })
}


router.get('/', getNotes);
router.post('/:id', createNote);
router.put('/:id', updateNote)
router.delete('/:id', deleteNote)

  export default router;
  