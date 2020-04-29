"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
const db = config_1.default.get('mongoURI');
exports.connectDB = async () => {
    try {
        await mongoose_1.default.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log('mongodb connected');
    }
    catch (err) {
        console.error(err.message);
        //Exit process with failure
        process.exit(1);
    }
};
