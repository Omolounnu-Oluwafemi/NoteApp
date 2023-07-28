"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const getNotes = (req, res, next) => {
    res.status(200).json({
        "status": 'sucess',
        "message": "All notes will be seen here"
    });
};
const createNote = (req, res, next) => {
    res.status(200).json({
        "status": 'sucess',
        "message": "Only users can post a new note"
    });
};
const updateNote = (req, res, next) => {
    res.status(200).json({
        "status": 'sucess',
        "message": "Only users can edit their created notes"
    });
};
const deleteNote = (req, res, next) => {
    res.status(200).json({
        "status": 'sucess',
        "message": "Only users can delete their created notes"
    });
};
router.get('/', getNotes);
router.post('/:id', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);
exports.default = router;
