import { Request, Response, NextFunction } from "express"


export const getNotes = (req: Request, res: Response, next: NextFunction) =>{ 
    res.status(200).json({
      "status": 'sucess',
      "message": "All notes will be seen here"
    })
  }
  
  export const createNote = (req: Request, res: Response, next: NextFunction) =>{
    const id = req.params.id
    res.status(200).json({
        "id": id,
      "status": 'sucess',
      "message": "Only users can post a new note"
    })
  }
  
  export const updateNote = (req: Request, res: Response, next: NextFunction) =>{
    res.status(200).json({
      "status": 'sucess',
      "message": "Only users can edit their created notes"
    })
  }
  export const deleteNote = (req: Request, res: Response, next: NextFunction) =>{
    res.status(200).json({
      "status": 'sucess',
      "message": "Only users can delete their created notes"
    })
  }
  