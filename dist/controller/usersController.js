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
exports.deleteAccount = exports.signIn = exports.signUp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../models/userModel");
const uuid_1 = require("uuid");
const notesModel_1 = require("../models/notesModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const validate_1 = require("../utils/validate");
// Generates a JSON Web Token (JWT) for a user.
const signToken = (userId) => {
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN;
    if (!secret || !expiresIn) {
        throw new Error('JWT secret or expiration time not provided');
    }
    const token = jsonwebtoken_1.default.sign({ userId }, secret, { expiresIn });
    return token;
};
exports.default = signToken;
//Creates a new user account.
function signUp(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const saltRounds = 10;
            const userId = (0, uuid_1.v4)();
            // Validate the user input data
            const { error } = validate_1.signUpValidator.validate(req.body);
            if (error) {
                return res.status(400).json({
                    error: error.details[0].message
                });
            }
            const { username, email, firstname, lastname } = req.body;
            // Check if the email or username already exists in the database
            const user = yield userModel_1.User.findOne({ where: { email } || { username } });
            if (user) {
                return res.status(400).json({
                    message: "Email or username already exists"
                });
            }
            const plainPassword = req.body.password;
            // Hash the user's password
            const password = yield bcrypt_1.default.hash(plainPassword, saltRounds);
            // Generate a JWT token for the user
            const token = signToken(userId);
            // Create a new user in the database
            const newUser = yield userModel_1.User.create({
                username,
                email,
                firstname,
                lastname,
                userId,
                password
            });
            return res.status(201).json({
                message: "New User created",
                token,
                data: { newUser }
            });
        }
        catch (error) {
            return res.status(500).json({
                error: "Internal server error"
            });
        }
    });
}
exports.signUp = signUp;
function signIn(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const validate = validate_1.signInValidator.validate(req.body, validate_1.options);
        if (validate.error) {
            return res.status(400).json({
                Error: validate.error.details[0].message
            });
        }
        const { username, password } = req.body;
        try {
            const { dataValues: userData } = yield (userModel_1.User === null || userModel_1.User === void 0 ? void 0 : userModel_1.User.findOne({ where: { username }, include: [notesModel_1.Note] }));
            if (!userData) {
                return res.status(401).json({
                    status: "404",
                    message: 'Invalid username or password'
                });
            }
            const passwordMatch = yield bcrypt_1.default.compare(password, userData.password);
            if (!passwordMatch) {
                return res.status(401).json({
                    status: "404",
                    message: 'Invalid username or password'
                });
            }
            const token = signToken(userData.userId);
            res.status(200).json({
                message: "Login successful",
                token,
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
function deleteAccount(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.params.id;
        const accToDelete = yield userModel_1.User.findOne({ where: { userId } });
        try {
            if (!accToDelete) {
                return res.status(400).json({
                    error: "User already deleted"
                });
            }
            yield (accToDelete === null || accToDelete === void 0 ? void 0 : accToDelete.destroy());
            res.status(200).json({
                message: "Account deleted succesfully"
            });
        }
        catch (error) {
            res.status(501).json({
                error: "Internal server error"
            });
        }
    });
}
exports.deleteAccount = deleteAccount;
