"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const users_1 = require("./routes/api/users");
const profiles_1 = require("./routes/api/profiles");
const posts_1 = require("./routes/api/posts");
const auth_1 = require("./routes/api/auth");
const app = express_1.default();
//COnnect DB
db_1.connectDB();
//Init middleware
app.use(express_1.default.json());
app.get('/', (req, res) => res.send('API Running'));
// Define routes
app.use('/api/users', users_1.users_router);
app.use('/api/posts', posts_1.posts_router);
app.use('/api/profiles', profiles_1.profiles_router);
app.use('/api/auth', auth_1.auth_router);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server startedon Port ${PORT}`);
});
