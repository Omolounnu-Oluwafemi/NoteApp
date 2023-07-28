"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.createNote = exports.getNotes = void 0;
const getNotes = (req, res, next) => {
    res.status(200).json({
        "status": 'sucess',
        "message": "All notes will be seen here"
    });
};
exports.getNotes = getNotes;
const createNote = (req, res, next) => {
    const id = req.params.id;
    res.status(200).json({
        "id": id,
        "status": 'sucess',
        "message": "Only users can post a new note"
    });
};
exports.createNote = createNote;
const updateNote = (req, res, next) => {
    res.status(200).json({
        "status": 'sucess',
        "message": "Only users can edit their created notes"
    });
};
exports.updateNote = updateNote;
const deleteNote = (req, res, next) => {
    res.status(200).json({
        "status": 'sucess',
        "message": "Only users can delete their created notes"
    });
};
exports.deleteNote = deleteNote;
