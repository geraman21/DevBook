import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../reducers';
import { getPost } from '../../actions/post';
import { RouteComponentProps, Link } from 'react-router-dom';
import PostItem from '../posts/PostItem';
import Spinner from '../layouts/spinner';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

interface PostProps extends propsFromRedux, RouteComponentProps<{ id: string }> {}

const Post: React.FC<PostProps> = ({ getPost, post: { post, loading }, match }) => {
	useEffect(() => {
		getPost(match.params.id);
	}, [getPost, match.params.id]);

	return loading || post === null ? (
		<Spinner />
	) : (
		<div className="container">
			<Link to="/posts" className="btn">
				Back to Posts
			</Link>
			<PostItem post={post} showActions={false} />
			<CommentForm postId={post._id!} />
			<div className="comments">
				{post.comments?.map((comment) => (
					<CommentItem key={comment._id} comment={comment} postId={post._id!} />
				))}
			</div>
		</div>
	);
};

const mapStateToProps = (state: RootState) => ({
	post: state.post,
});

const connector = connect(mapStateToProps, { getPost });
type propsFromRedux = ConnectedProps<typeof connector>;

export default connector(Post);
