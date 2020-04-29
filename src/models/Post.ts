import mongoose, { Schema, mongo, Document } from 'mongoose';

interface PostUser {
	user: string;
}

export interface Comment extends PostUser {
	text: string;
	name: string;
	avatar: string;
	date?: Date;
	_id?: string;
}

export interface PostObject {
	user: string;
	text: string;
	name: string;
	avatar: string;
	likes?: PostUser[];
	comments?: Comment[];
	date: string;
}

interface PostInterface extends PostObject, Document {}

const PostSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
	text: {
		type: String,
		required: true,
	},
	name: {
		type: String,
	},
	avatar: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	likes: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'user',
			},
		},
	],
	comments: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'user',
			},
			text: {
				type: String,
				required: true,
			},
			name: {
				type: String,
			},
			avatar: {
				type: String,
			},
			date: {
				type: Date,
				default: Date.now,
			},
		},
	],
});

const Post = mongoose.model<PostInterface>('post', PostSchema);

export default Post;
