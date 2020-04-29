import * as Actions from '../actions/types';
import * as Profile from '../../../src/models/Profile';
import * as Post from '../../../src/models/Post';
import { addComment } from '../actions/post';
// import * as Profile from '../../../src/models/'
// ALERTS
export interface Alert {
	message: string;
	type: string;
	id: string;
}

export type AlertState = Alert[];

interface SetAlertAction {
	type: typeof Actions.SET_ALERT;
	payload: Alert;
}

interface DeleteAlertAction {
	type: typeof Actions.DELETE_ALERT;
	payload: string;
}

export type AlertActionTypes = SetAlertAction | DeleteAlertAction;

//AUTH & REGISTRATION
export interface AuthState {
	token: string | null;
	isAuthenticated: boolean;
	loading: boolean;
	user: UserDataResponse | null;
}

export interface RegistrationData {
	name: string;
	email: string;
	password: string;
}

export interface TokenResponse {
	token: string;
}

export interface UserDataResponse {
	_id: string;
	name: string;
	email: string;
	avatar: string;
	date: Date;
}

interface GetUserSuccess {
	type: typeof Actions.USER_LOADED;
	payload: UserDataResponse;
}

interface GetTokenSuccess {
	type: typeof Actions.REGISTER_SUCCESS;
	payload: TokenResponse;
}

interface GetTokenFail {
	type: typeof Actions.REGISTER_FAIL;
}

interface AuthFail {
	type: typeof Actions.AUTH_ERROR;
}

export type AuthActionTypes =
	| GetTokenSuccess
	| GetTokenFail
	| GetUserSuccess
	| AuthFail
	| LoginSuccess
	| Logout
	| AccountDeleted;

// Login

export interface LoginData {
	email: string;
	password: string;
}

interface LoginSuccess {
	type: typeof Actions.LOGIN_SUCCESS;
	payload: TokenResponse;
}

interface Logout {
	type: typeof Actions.LOGOUT;
}

// Profile

type error = {
	msg: string | {};
	status: number;
};

export interface ProfileState {
	profile: ProfileFromResponse;
	profiles: ProfileFromResponse[];
	repos: any[];
	loading: boolean;
	error: error | {};
}

export interface GetProfile {
	type: typeof Actions.GET_PROFILE;
	payload: ProfileFromResponse;
}

interface User {
	_id: string;
	name: string;
	avatar: string;
}

export interface ProfileFromResponse extends Omit<Profile.ProfileObject, 'user'> {
	user?: User;
}

export interface GetProfiles {
	type: typeof Actions.GET_PROFILES;
	payload: ProfileFromResponse[];
}

export interface ClearProfile {
	type: typeof Actions.CLEAR_PROFILE;
}

export interface ProfileError {
	type: typeof Actions.PROFILE_ERROR;
	payload: error;
}

export interface ProfileDataModel {
	company: string;
	website: string;
	location: string;
	status: string;
	skills: string;
	bio: string;
	githubusername: string;
	youtube: string;
	twitter: string;
	facebook: string;
	linkedin: string;
	instagram: string;
}

export interface ExpDataModel extends Profile.Experience {}

export interface EduDataModel extends Profile.Education {}

export interface UpdateProfile {
	type: typeof Actions.UPDATE_PROFILE;
	payload: ProfileFromResponse;
}

export interface AccountDeleted {
	type: typeof Actions.ACCOUT_DELETED;
}

export interface GetGithub {
	type: typeof Actions.GET_GITHUB;
	payload: any[];
}

export interface SetLoading {
	type: typeof Actions.SET_LOADING;
}

export type ProfileActionTypes =
	| GetProfile
	| ProfileError
	| ClearProfile
	| UpdateProfile
	| GetProfiles
	| GetGithub
	| SetLoading;

// Posts

export interface PostFromresponse extends Post.PostObject {
	_id?: string;
}

export interface PostState {
	posts: PostFromresponse[];
	post: PostFromresponse;
	loading: boolean;
	error: error | {};
}

export interface GetPosts {
	type: typeof Actions.GET_POSTS;
	payload: PostFromresponse[];
}

export interface GetPost {
	type: typeof Actions.GET_POST;
	payload: PostFromresponse;
}

export interface PostError {
	type: typeof Actions.POST_ERROR;
	payload: error;
}

export interface LikeFromResponse {
	_id: string;
	user: string;
}

export interface UpdateLikes {
	type: typeof Actions.UPDATE_LIKES;
	payload: {
		id: string;
		likes: LikeFromResponse[];
	};
}

export interface DeletePost {
	type: typeof Actions.DELETE_POST;
	payload: string;
}

export type PostDataModel = Post.PostObject;

export interface AddPost {
	type: typeof Actions.ADD_POST;
	payload: PostDataModel;
}

export interface AddComment {
	type: typeof Actions.ADD_COMMENT;
	payload: Post.Comment[];
}

export type Comment = Post.Comment;

export interface RemoveComment {
	type: typeof Actions.REMOVE_COMMENT;
	payload: string;
}

export type PostActionTypes =
	| GetPosts
	| GetPost
	| PostError
	| UpdateLikes
	| DeletePost
	| AddPost
	| AddComment
	| RemoveComment
	| SetLoading;
