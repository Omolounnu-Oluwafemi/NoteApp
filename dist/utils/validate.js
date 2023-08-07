"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.signInValidator = exports.signUpValidator = void 0;
const joi_1 = __importDefault(require("joi"));
exports.signUpValidator = joi_1.default.object().keys({
    username: joi_1.default.string().required(),
    email: joi_1.default.string().email({ minDomainSegments: 2 }).lowercase().required(),
    firstname: joi_1.default.string().alphanum().required(),
    lastname: joi_1.default.string().alphanum().required(),
    password: joi_1.default.string().min(3).max(30).required(),
});
exports.signInValidator = joi_1.default.object().keys({
    username: joi_1.default.string().required(),
    password: joi_1.default.string().min(3).max(30).required(),
});
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: "",
        }
    }
};
