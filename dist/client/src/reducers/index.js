"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const alert_1 = __importDefault(require("./alert"));
const auth_1 = __importDefault(require("./auth"));
const profile_1 = __importDefault(require("./profile"));
const post_1 = __importDefault(require("./post"));
const rootReducer = redux_1.combineReducers({ alert: alert_1.default, auth: auth_1.default, profile: profile_1.default, post: post_1.default });
exports.default = rootReducer;
