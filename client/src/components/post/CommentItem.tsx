import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { deleteComment } from '../../actions/post';
import { Comment } from '../../reducers/types';
import { RootState } from '../../reducers';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

interface CommentItemProps extends propsFromRedux {
	postId: string;
	comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({
	postId,
	comment: { _id, text, name, avatar, user, date },
	deleteComment,
	auth,
}) => {
	return (
		<div className="post bg-white p-1 my-1">
			<div>
				<Link to={`/profiles/${user}`}>
					<img className="round-img" src={avatar} alt="" />
					<h4>{name}</h4>
				</Link>
			</div>
			<div>
				<p className="my-1">{text}</p>
				<p className="post-date">
					Posted on <Moment format="YYYY/MM/DD HH:MM:SS">{date}</Moment>
				</p>
				{!auth.loading && user === auth.user?._id && (
					<button className="btn btn-danger" onClick={() => deleteComment(_id!, postId)}>
						<i className="fas fa-times"></i>
					</button>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = (state: RootState) => ({
	auth: state.auth,
});
const connector = connect(mapStateToProps, { deleteComment });
type propsFromRedux = ConnectedProps<typeof connector>;

export default connector(CommentItem);
