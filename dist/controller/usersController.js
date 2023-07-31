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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const userModel_1 = require("../models/userModel");
const uuid_1 = require("uuid");
const notesModel_1 = require("../models/notesModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
function signUp(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = (0, uuid_1.v4)();
        const saltRounds = 10;
        let plainPassword = req.body.password;
        const { username, email, firstname, lastname } = req.body;
        const password = yield bcrypt_1.default.hash(plainPassword, saltRounds);
        try {
            const newUser = yield userModel_1.User.create({
                username,
                email,
                firstname,
                lastname,
                userId: userId,
                password
            });
            res.status(201).json({
                message: "New User created",
                data: { newUser }
            });
        }
        catch (error) {
            res.status(500).json({
                error: "Internal server error"
            });
        }
    });
}
exports.signUp = signUp;
function signIn(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        try {
            const { dataValues: userData } = yield (userModel_1.User === null || userModel_1.User === void 0 ? void 0 : userModel_1.User.findByPk(username, { include: [notesModel_1.Note] }));
            if (!userData) {
                res.status(401).json({
                    status: "404",
                    message: 'Invalid username or password'
                });
            }
            if ((userData === null || userData === void 0 ? void 0 : userData.password) !== password) {
                res.status(401).json({
                    status: "404",
                    message: 'Invalid username or password'
                });
            }
            res.status(200).json({
                message: "Login successful",
                user: userData
            });
        }
        catch (error) {
            res.status(500).json({
                error: "Internal server error"
            });
        }
    });
}
exports.signIn = signIn;
// function signIn (req: Request, res: Response, next: NextFunction){
//     const  {username, email} = req.body
//     try{
//         const user = User.findOne({ username });
//         if(!user){
//         }
//     }
//     catch{
//     }
// }
