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
exports.getUser = exports.signUp = void 0;
const userModel_1 = require("../models/userModel");
const uuid_1 = require("uuid");
function signUp(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const Id = (0, uuid_1.v4)();
        const { username, email, firstname, lastname } = req.body;
        const newUser = yield userModel_1.User.create({
            id: Id,
            username,
            email,
            firstname,
            lastname
        });
        console.log(newUser);
        res.status(201).json({
            data: { newUser }
        });
    });
}
exports.signUp = signUp;
function getUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield userModel_1.User.findByPk(req.params.id);
        if (!user) {
            res.status(404).json({
                status: "404",
                message: 'User not found'
            });
        }
        res.status(200).json({
            user: user
        });
    });
}
exports.getUser = getUser;
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
