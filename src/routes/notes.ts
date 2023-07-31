import express from "express";
import { createNote, deleteNote, getNote, updateNote } from "../controller/notesController";

const router = express.Router();

router.get('/:id', getNote);
router.post('/:id', createNote);
router.put('/:id', updateNote)
router.delete('/:id', deleteNote)

  export default router;
  