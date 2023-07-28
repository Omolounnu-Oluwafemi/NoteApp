import express, {Request, Response, NextFunction} from "express";
import { createNote, deleteNote, getNotes, updateNote } from "../controller/notesController";

const router = express.Router();

router.get('/', getNotes);
router.post('/:id', createNote);
router.put('/:id', updateNote)
router.delete('/:id', deleteNote)

  export default router;
  