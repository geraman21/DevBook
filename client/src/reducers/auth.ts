import * as Actions from '../actions/types';
import { AuthState, AuthActionTypes } from './types';

const initialState: AuthState = {
	token: localStorage.getItem('token'),
	isAuthenticated: false,
	loading: true,
	user: null,
};

export default function (state = initialState, action: AuthActionTypes): AuthState {
	//const { type, payload } = action;

	switch (action.type) {
		case Actions.USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload,
			};
		case Actions.REGISTER_SUCCESS:
		case Actions.LOGIN_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: true,
			};

		case Actions.REGISTER_FAIL:
		case Actions.AUTH_ERROR:
		case Actions.LOGOUT:
		case Actions.ACCOUT_DELETED:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
			};
		default:
			return state;
	}
}
