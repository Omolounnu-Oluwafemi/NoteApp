"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/* GET All Notes(All notes are visible) */
router.get('/', function (req, res, next) {
    res.status(200).json({
        "status": 'sucess',
        "message": "All notes will be seen here"
    });
});
/* Create a new Note*/
router.post('/:id', function (req, res, next) {
    res.status(200).json({
        "status": 'sucess',
        "message": "Only users can post a new note"
    });
});
/*Edit a note*/
router.put('/:id', function (req, res, next) {
    res.status(200).json({
        "status": 'sucess',
        "message": "Only users can edit their created notes"
    });
});
/* Delete a note */
router.delete('/:id', function (req, res, next) {
    res.status(200).json({
        "status": 'sucess',
        "message": "Only users can delete their created notes"
    });
});
exports.default = router;
