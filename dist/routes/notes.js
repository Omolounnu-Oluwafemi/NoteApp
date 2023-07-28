"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notesController_1 = require("../controller/notesController");
const router = express_1.default.Router();
router.get('/', notesController_1.getNotes);
router.post('/:id', notesController_1.createNote);
router.put('/:id', notesController_1.updateNote);
router.delete('/:id', notesController_1.deleteNote);
exports.default = router;
