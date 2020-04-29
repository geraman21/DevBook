"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const redux_devtools_extension_1 = require("redux-devtools-extension");
const redux_thunk_1 = __importDefault(require("redux-thunk"));
const index_1 = __importDefault(require("./reducers/index"));
const initialState = {};
const middleware = [redux_thunk_1.default];
const store = redux_1.createStore(index_1.default, initialState, redux_devtools_extension_1.composeWithDevTools(redux_1.applyMiddleware(...middleware)));
exports.default = store;
