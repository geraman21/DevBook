import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { addComment } from '../../actions/post';


interface CommentFormProps extends propsFromRedux {
	postId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ addComment, postId }) => {
	const [text, setText] = useState('');

	return (
		<div className="post-form">
			<div className="bg-primary p">
				<h3>Leave a Comment</h3>
			</div>
			<form
				className="form my-1"
				onSubmit={(e) => {
					e.preventDefault();
					addComment({ text }, postId);
					setText('');
				}}
			>
				<textarea
					name="text"
					cols={30}
					rows={5}
					placeholder="Write your comment here..."
					value={text}
					onChange={(e) => setText(e.target.value)}
					required
				></textarea>
				<input type="submit" className="btn btn-dark my-1" value="Submit" />
			</form>
		</div>
	);
};

const connector = connect(null, { addComment });
type propsFromRedux = ConnectedProps<typeof connector>;

export default connector(CommentForm);
