// Get Posts
import * as Actions from './types';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '../reducers';
import { Action } from 'redux';
import Axios from 'axios';
import { PostFromresponse, LikeFromResponse, PostDataModel } from '../reducers/types';
import { PostError } from '../reducers/types';
import { setAlert } from './alert';

export const getPosts = (): ThunkAction<void, RootState, null, Action<string>> => async (
	dispatch: ThunkDispatch<RootState, null, Action<string>>
) => {
	try {
		const res = await Axios.get<PostFromresponse[]>('/api/posts');
		dispatch({ type: Actions.GET_POSTS, payload: res.data });
	} catch (error) {
		if (error.response) {
			const postError: PostError = {
				type: Actions.POST_ERROR,
				payload: {
					msg: error.response.data.msg as string,
					status: error.response.status as number,
				},
			};
			dispatch(postError);
		}
	}
};

export const addLike = (id: string): ThunkAction<void, RootState, null, Action<string>> => async (
	dispatch: ThunkDispatch<RootState, null, Action<string>>
) => {
	try {
		const res = await Axios.put<LikeFromResponse[]>(`/api/posts/likes/${id}`);
		dispatch({ type: Actions.UPDATE_LIKES, payload: { id, likes: res.data } });
	} catch (error) {
		if (error.response) {
			const postError: PostError = {
				type: Actions.POST_ERROR,
				payload: {
					msg: error.response.data.msg as string,
					status: error.response.status as number,
				},
			};
			dispatch(postError);
		}
	}
};

export const removeLike = (
	id: string
): ThunkAction<void, RootState, null, Action<string>> => async (
	dispatch: ThunkDispatch<RootState, null, Action<string>>
) => {
	try {
		const res = await Axios.put<LikeFromResponse[]>(`/api/posts/unlikes/${id}`);
		dispatch({ type: Actions.UPDATE_LIKES, payload: { id, likes: res.data } });
	} catch (error) {
		if (error.response) {
			const postError: PostError = {
				type: Actions.POST_ERROR,
				payload: {
					msg: error.response.data.msg as string,
					status: error.response.status as number,
				},
			};
			dispatch(postError);
		}
	}
};

//Remove post

export const deletePost = (
	id: string
): ThunkAction<void, RootState, null, Action<string>> => async (
	dispatch: ThunkDispatch<RootState, null, Action<string>>
) => {
	try {
		const res = await Axios.delete<{ msg: string }>(`/api/posts//${id}`);
		dispatch({ type: Actions.DELETE_POST, payload: id });
		dispatch(setAlert(res.data.msg, 'success'));
	} catch (error) {
		if (error.response) {
			const postError: PostError = {
				type: Actions.POST_ERROR,
				payload: {
					msg: error.response.data.msg as string,
					status: error.response.status as number,
				},
			};
			dispatch(postError);
		}
	}
};

//Add post

export const addPost = (formData: {
	text: string;
}): ThunkAction<void, RootState, null, Action<string>> => async (
	dispatch: ThunkDispatch<RootState, null, Action<string>>
) => {
	const config = {
		headers: { 'Content-Type': 'application/json' },
	};

	try {
		const res = await Axios.post<PostDataModel>(`/api/posts/`, formData, config);
		dispatch({ type: Actions.ADD_POST, payload: res.data });
		dispatch(setAlert('Post Created', 'success'));
	} catch (error) {
		if (error.response) {
			const postError: PostError = {
				type: Actions.POST_ERROR,
				payload: {
					msg: error.response.data.msg as string,
					status: error.response.status as number,
				},
			};
			dispatch(postError);
		}
	}
};

export const getPost = (id: string): ThunkAction<void, RootState, null, Action<string>> => async (
	dispatch: ThunkDispatch<RootState, null, Action<string>>
) => {
	dispatch({ type: Actions.SET_LOADING });
	try {
		const res = await Axios.get<PostFromresponse>(`/api/posts/${id}`);
		dispatch({ type: Actions.GET_POST, payload: res.data });
	} catch (error) {
		if (error.response) {
			const postError: PostError = {
				type: Actions.POST_ERROR,
				payload: {
					msg: error.response.data.msg as string,
					status: error.response.status as number,
				},
			};
			dispatch(postError);
		}
	}
};

//Remove post

export const addComment = (
	formData: {
		text: string;
	},
	id: string
): ThunkAction<void, RootState, null, Action<string>> => async (
	dispatch: ThunkDispatch<RootState, null, Action<string>>
) => {
	const config = {
		headers: { 'Content-Type': 'application/json' },
	};

	try {
		const res = await Axios.post<PostDataModel>(`/api/posts/comments/${id}`, formData, config);
		dispatch({ type: Actions.ADD_COMMENT, payload: res.data.comments });
		dispatch(setAlert('Comment Added', 'success'));
	} catch (error) {
		if (error.response) {
			const postError: PostError = {
				type: Actions.POST_ERROR,
				payload: {
					msg: error.response.data.msg as string,
					status: error.response.status as number,
				},
			};
			dispatch(postError);
		}
	}
};

export const deleteComment = (
	commentId: string,
	postId: string
): ThunkAction<void, RootState, null, Action<string>> => async (
	dispatch: ThunkDispatch<RootState, null, Action<string>>
) => {
	try {
		await Axios.post<PostDataModel>(`/api/posts/comment/${postId}/${commentId}`);
		dispatch({ type: Actions.REMOVE_COMMENT, payload: commentId });
		dispatch(setAlert('Comment Deleted', 'success'));
	} catch (error) {
		if (error.response) {
			const postError: PostError = {
				type: Actions.POST_ERROR,
				payload: {
					msg: error.response.data.msg as string,
					status: error.response.status as number,
				},
			};
			dispatch(postError);
		}
	}
};
