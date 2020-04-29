import React, { Fragment } from 'react';
import { PostFromresponse } from '../../reducers/types';
import { RootState } from '../../reducers';
import { connect, ConnectedProps } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { addLike, removeLike, deletePost } from '../../actions/post';
interface PostItemProps extends propsFromRedux {
	post: PostFromresponse;
	showActions?: boolean;
}

const PostItem: React.FC<PostItemProps> = ({
	post: { _id, text, name, avatar, user, likes, comments, date },
	auth,
	addLike,
	removeLike,
	deletePost,
	showActions,
}) => {
	return (
		<div className="post bg-white p-1 my-1">
			<div>
				<Link to={`/profiles/user/${user}`}>
					<img className="round-img" src={avatar} alt="" />
					<h4>{name}</h4>
				</Link>
			</div>
			<div>
				<p className="my-1">{text}</p>
				<p className="post-date">
					Posted on <Moment format="YYYY/MM/DD HH:MM:SS">{date}</Moment>
				</p>
				{showActions && (
					<Fragment>
						{' '}
						<button
							type="button"
							className="btn btn-light"
							onClick={() => addLike(_id!)}
						>
							<i className="fas fa-thumbs-up"></i>{' '}
							{likes && likes.length > 0 && <span>{likes?.length}</span>}
						</button>
						<button
							type="button"
							className="btn btn-light"
							onClick={() => removeLike(_id!)}
						>
							<i className="fas fa-thumbs-down"></i>
						</button>
						<Link to={`/posts/${_id}`} className="btn btn-primary">
							Discussion{' '}
							{comments && comments.length > 0 && (
								<span className="comment-count">{comments.length}</span>
							)}
						</Link>
						{!auth.loading && user === auth.user?._id && (
							<button
								type="button"
								className="btn btn-danger"
								onClick={() => deletePost(_id!)}
							>
								<i className="fas fa-times"></i>
							</button>
						)}
					</Fragment>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = (state: RootState) => ({
	auth: state.auth,
});

type propsFromRedux = ConnectedProps<typeof connector>;

PostItem.defaultProps = {
	showActions: true,
};

const connector = connect(mapStateToProps, { addLike, removeLike, deletePost });

export default connector(PostItem);
