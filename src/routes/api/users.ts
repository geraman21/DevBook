import { RequestHandler, Router, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import User, { UserInterface } from '../../models/User';
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import { Payload } from '../../models/Token';
export const users_router = Router();

// @route   GET api/users
// @desc    Register User
// @access  Public
users_router.post(
	'/',
	[
		check('name', 'name is required').not().isEmpty(),
		check('email', 'please provide valid email').isEmail(),
		check('password', 'Please enter a password with 6 or more charachters').isLength({
			min: 6,
		}),
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			if (user) {
				res.status(400).json({ errors: [{ msg: 'User already exists' }] });
			}

			const avatar: string = gravatar.url(email, {
				s: '200',
				r: 'pg',
				d: 'mm',
			});

			user = new User({
				name,
				email,
				avatar,
				password,
			});

			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();

			const payload: Payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(payload, config.get('jwtToken'), { expiresIn: 360000 }, (err, token) => {
				if (err) throw err;
				res.json({ token });
			});
		} catch (err) {
			console.log(err.message);
			res.status(500).send('Server Error');
		}
	}
);
