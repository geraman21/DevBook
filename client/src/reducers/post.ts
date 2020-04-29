import { PostState, PostActionTypes, PostDataModel } from './types';
import * as Actions from '../actions/types';
const initPostState: PostDataModel = {
	text: '',
	name: '',
	avatar: '',
	user: '',
	date: '',
	comments: [],
	likes: [],
};
const initialState: PostState = {
	posts: [],
	post: initPostState,
	loading: true,
	error: {},
};

export default function (state = initialState, action: PostActionTypes): PostState {
	switch (action.type) {
		case Actions.GET_POSTS:
			return {
				...state,
				posts: action.payload,
				post: initPostState,
				loading: false,
			};
		case Actions.GET_POST:
			return {
				...state,
				post: action.payload,
				loading: false,
			};
		case Actions.POST_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case Actions.UPDATE_LIKES:
			return {
				...state,
				posts: state.posts.map((post) => {
					return post._id === action.payload.id
						? { ...post, likes: action.payload.likes }
						: post;
				}),
				loading: false,
			};
		case Actions.DELETE_POST:
			return {
				...state,
				posts: state.posts.filter((post) => post._id !== action.payload),
				loading: false,
			};
		case Actions.ADD_POST:
			return {
				...state,
				posts: [action.payload, ...state.posts],
				loading: false,
			};
		case Actions.ADD_COMMENT:
			return {
				...state,
				post: { ...state.post, comments: action.payload },
				loading: false,
			};

		case Actions.REMOVE_COMMENT:
			return {
				...state,
				post: {
					...state.post,
					comments: state.post.comments?.filter(
						(comment) => comment._id !== action.payload
					),
				},
				loading: false,
			};
		case Actions.SET_LOADING:
			return {
				...state, loading: true
			}
		default:
			return state;
	}
}
