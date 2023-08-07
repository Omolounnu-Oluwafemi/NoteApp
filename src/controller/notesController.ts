import { Request, Response, NextFunction } from "express"
import  {Note} from "../models/notesModel"
import { v4 as uui44 } from "uuid"



export const getNote = async (req: Request, res: Response, next: NextFunction) =>{ 
    
    const oneNote = await Note.findByPk(req.params.id)

      try{  
        if(!oneNote){
            res.status(404).json({
                message: "Note not found"
            })
        }
        res.status(200).json({
        Notes: oneNote
      })
    }
    catch{
        console.error("Error updating note:");
        res.status(500).json({ error: "Internal server error" });
    }
  }
  
  export const createNote = async (req: Request, res: Response, next: NextFunction) =>{
    const userId = req.params.id
    const {title,  description, DueDate, status} = req.body

    try {
    const newNote = await Note.create({
        title,
        description,
        DueDate,        
        status,
        noteId: uui44(),
        userId
    })
    res.status(201).json({
     "Notes": newNote
    }) 

} catch (error) {
    console.log(error)
}
    
}
  export const updateNote = async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, DueDate, status } = req.body;

    try {
        const noteToUpdate= await Note.findByPk(req.params.id);

        if (!noteToUpdate) {
            return res.status(404).json({ error: "Note not found" });
        }

        
        if (title) {
            noteToUpdate.title = title;
        }
        if (description) {
            noteToUpdate.description = description;
        }
        if (DueDate) {
            noteToUpdate.DueDate = DueDate;
        }
        if (status) {
            noteToUpdate.status = status;
        }
        
        await noteToUpdate.save();

        res.status(200).json({
            Notes: noteToUpdate
        });
    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

  export const deleteNote = async (req: Request, res: Response, next: NextFunction)=>{
    const id: string = req.params.id

    try{
        const deleteNote = await Note.findByPk(id)
        
        if (!deleteNote) {
            return res.status(404).json({ error: "Cannot delete note" });
        }

        res.status(200).json({
        message: "Note deleted succesfully"
      })

      await deleteNote.destroy();

    }
    catch (error){
        console.error("Error deleting note:", error);
        res.status(500).json({ error: "Internal server error" });
    
    }
  }
  