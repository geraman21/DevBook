"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../../models/User"));
const gravatar_1 = __importDefault(require("gravatar"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
exports.users_router = express_1.Router();
// @route   GET api/users
// @desc    Register User
// @access  Public
exports.users_router.post('/', [
    express_validator_1.check('name', 'name is required').not().isEmpty(),
    express_validator_1.check('email', 'please provide valid email').isEmail(),
    express_validator_1.check('password', 'Please enter a password with 6 or more charachters').isLength({
        min: 6,
    }),
], async (req, res) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
        let user = await User_1.default.findOne({ email });
        if (user) {
            res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }
        const avatar = gravatar_1.default.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm',
        });
        user = new User_1.default({
            name,
            email,
            avatar,
            password,
        });
        const salt = await bcryptjs_1.default.genSalt(10);
        user.password = await bcryptjs_1.default.hash(password, salt);
        await user.save();
        const payload = {
            user: {
                id: user.id,
            },
        };
        jsonwebtoken_1.default.sign(payload, config_1.default.get('jwtToken'), { expiresIn: 360000 }, (err, token) => {
            if (err)
                throw err;
            res.json({ token });
        });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
