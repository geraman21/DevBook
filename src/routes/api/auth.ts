import { Router, Request, Response } from 'express';
import auth from '../../middleware/auth';
import User from '../../models/User';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import { Payload } from '../../models/Token';

export const auth_router = Router();

// @route   GET api/auth
// @desc    Test route
// @access  Private
auth_router.get('/', auth, async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: 'Server Error' });
	}
});

// @route   POST api/auth
// @desc    Authenticate User & get Token
// @access  Public
auth_router.post(
	'/',
	[
		check('email', 'please provide valid email').isEmail(),
		check('password', 'Please enter a password').exists(),
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
			}

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
