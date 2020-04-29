"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const setAuthToken = (token) => {
    if (token) {
        axios_1.default.defaults.headers.common['x-auth-token'] = token;
    }
    else {
        delete axios_1.default.defaults.headers.common['x-auth-token'];
    }
};
exports.default = setAuthToken;
