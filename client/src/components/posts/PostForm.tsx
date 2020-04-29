import React, { useState } from 'react';
import { addPost } from '../../actions/post';
import { ConnectedProps, connect } from 'react-redux';

interface PostFormProps extends propsFromRedux {}

const PostForm: React.FC<PostFormProps> = ({ addPost }) => {
	const [text, setText] = useState('');

	return (
		<div className="post-form">
			<div className="bg-primary p">
				<h3>Say Something...</h3>
			</div>
			<form
				className="form my-1"
				onSubmit={(e) => {
					e.preventDefault();
					addPost({ text });
					setText('');
				}}
			>
				<textarea
					name="text"
					cols={30}
					rows={5}
					placeholder="Create a post"
					value={text}
					onChange={(e) => setText(e.target.value)}
					required
				></textarea>
				<input type="submit" className="btn btn-dark my-1" value="Submit" />
			</form>
		</div>
	);
};

const connector = connect(null, { addPost });
type propsFromRedux = ConnectedProps<typeof connector>;

export default connector(PostForm);
