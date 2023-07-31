"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.createNote = exports.getNote = void 0;
const notesModel_1 = require("../models/notesModel");
const uuid_1 = require("uuid");
const getNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const oneNote = yield notesModel_1.Note.findByPk(req.params.id);
    try {
        if (!oneNote) {
            res.status(404).json({
                message: "Note not found"
            });
        }
        res.status(200).json({
            Notes: oneNote
        });
    }
    catch (_a) {
        console.error("Error updating note:");
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getNote = getNote;
const createNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const { title, description, DueDate, status } = req.body;
    try {
        const newNote = yield notesModel_1.Note.create({
            title,
            description,
            DueDate,
            status,
            noteId: (0, uuid_1.v4)(),
            userId
        });
        res.status(201).json({
            "Notes": newNote
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.createNote = createNote;
const updateNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, DueDate, status } = req.body;
    try {
        const noteToUpdate = yield notesModel_1.Note.findByPk(req.params.id);
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
        yield noteToUpdate.save();
        res.status(200).json({
            Notes: noteToUpdate
        });
    }
    catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateNote = updateNote;
const deleteNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const deleteNote = yield notesModel_1.Note.findByPk(id);
        if (!deleteNote) {
            return res.status(404).json({ error: "Cannot delete note" });
        }
        res.status(200).json({
            message: "Note deleted succesfully"
        });
        yield deleteNote.destroy();
    }
    catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.deleteNote = deleteNote;
