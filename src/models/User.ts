import mongoose from 'mongoose';

export interface UserInterface extends mongoose.Document {
	name: string;
	email: string;
	password: string;
	avatar: string;
	date: Date;
}

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const User = mongoose.model<UserInterface>('user', UserSchema);

export default User;
