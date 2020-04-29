import React, { useEffect, Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../reducers';
import { getPosts } from '../../actions/post';
import Spinner from '../layouts/spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';

interface PostsProps extends propsFromRedux {}

const Posts: React.FC<PostsProps> = ({ auth, getPosts, post: { posts, loading } }) => {
	useEffect(() => {
		getPosts();
	}, [getPosts]);

	return loading || auth.user === null ? (
		<Spinner />
	) : (
		<Fragment>
			<div className="container">
				<h1 className="large primary">Posts</h1>
				<p className="lead">
					<i className="fas fa-user"></i> Welcome to the Community
				</p>
				<PostForm />
				{posts.map((post) => (
					<PostItem key={post._id} post={post} />
				))}
			</div>
		</Fragment>
	);
};

const mapStateToProps = (state: RootState) => ({
	post: state.post,
	auth: state.auth,
});
const connector = connect(mapStateToProps, { getPosts });
type propsFromRedux = ConnectedProps<typeof connector>;

export default connector(Posts);
