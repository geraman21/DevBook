import axios from 'axios';
import * as Actions from './types';
import { Action } from 'redux';
import {
	AuthActionTypes,
	RegistrationData,
	TokenResponse,
	UserDataResponse,
	LoginData,
} from '../reducers/types';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '../reducers';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

//Load User
export const loadUser = (): ThunkAction<void, RootState, null, Action<string>> => async (
	dispatch: ThunkDispatch<RootState, null, Action<string>>
) => {
	if (localStorage.getItem('token')) {
		setAuthToken(localStorage.getItem('token')!);
	}

	try {
		const res = await axios.get<UserDataResponse>('/api/auth');

		const userDataResponse: AuthActionTypes = {
			type: Actions.USER_LOADED,
			payload: res.data,
		};
		dispatch(userDataResponse);
	} catch (error) {
		const authError: AuthActionTypes = {
			type: Actions.AUTH_ERROR,
		};
		dispatch(authError);
	}
};

//Login as a user

export const login = ({
	email,
	password,
}: LoginData): ThunkAction<void, RootState, null, Action<string>> => async (
	dispatch: ThunkDispatch<RootState, null, Action<string>>
) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify({ email, password });

	try {
		const res = await axios.post<TokenResponse>('/api/auth', body, config);
		const loginSuccess: AuthActionTypes = {
			type: Actions.LOGIN_SUCCESS,
			payload: res.data,
		};
		dispatch(loginSuccess);
		dispatch(loadUser());
	} catch (error) {
		if (error && error.response) {
			const errors = error.response.data.errors;
			errors.forEach((error: { msg: string }) => {
				dispatch(setAlert(error.msg, 'danger'));
			});
		}
		const loginFail: AuthActionTypes = {
			type: Actions.AUTH_ERROR,
		};
		dispatch(loginFail);

		throw error;
	}
};

// Register User

export const register = ({
	name,
	email,
	password,
}: RegistrationData): ThunkAction<void, RootState, null, Action<string>> => async (
	dispatch: ThunkDispatch<RootState, null, Action<string>>
) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify({ name, email, password });

	try {
		const res = await axios.post<TokenResponse>('/api/users', body, config);
		const regSuccess: AuthActionTypes = {
			type: Actions.REGISTER_SUCCESS,
			payload: res.data,
		};
		dispatch(regSuccess);
		dispatch(loadUser());
	} catch (error) {
		if (error && error.response) {
			const errors = error.response.data.errors;
			errors.forEach((error: { msg: string }) => {
				dispatch(setAlert(error.msg, 'danger'));
			});
		}
		const regFail: AuthActionTypes = {
			type: Actions.REGISTER_FAIL,
		};
		dispatch(regFail);

		throw error;
	}
};

export const logout = (): ThunkAction<void, RootState, null, Action<string>> => async (
	dispatch: ThunkDispatch<RootState, null, Action<string>>
) => {
	dispatch({ type: Actions.CLEAR_PROFILE });
	dispatch({ type: Actions.LOGOUT });
};
