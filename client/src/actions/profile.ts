import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '../reducers';
import { Action } from 'redux';
import {
	GetProfile,
	ProfileError,
	ProfileDataModel,
	ProfileActionTypes,
	UpdateProfile,
	ExpDataModel,
	EduDataModel,
	GetProfiles,
	ProfileFromResponse,
} from '../reducers/types';
import axios from 'axios';
import * as Actions from './types';
import { setAlert } from './alert';
import { History } from 'history';

export const getCurrentProfile = (): ThunkAction<void, RootState, null, Action<string>> => async (
	dispatch: ThunkDispatch<RootState, null, Action<string>>
) => {
	dispatch({ type: Actions.SET_LOADING });
	try {
		const res = await axios.get<ProfileFromResponse>('/api/profiles/me');

		const getProfile: GetProfile = {
			type: Actions.GET_PROFILE,
			payload: res.data,
		};
		dispatch(getProfile);
	} catch (error) {
		if (error.response) {
			const profileError: ProfileError = {
				type: Actions.PROFILE_ERROR,
				payload: {
					msg: error.response.data.msg as string,
					status: error.response.status as number,
				},
			};
			dispatch(profileError);
		}
	}
};

//Get all profiles

export const getProfiles = (): ThunkAction<void, RootState, null, Action<string>> => async (
	dispatch: ThunkDispatch<RootState, null, Action<string>>
) => {
	dispatch({ type: Actions.CLEAR_PROFILE });
	dispatch({ type: Actions.SET_LOADING });

	try {
		const res = await axios.get<ProfileFromResponse[]>('/api/profiles');

		const getProfile: GetProfiles = {
			type: Actions.GET_PROFILES,
			payload: res.data,
		};
		dispatch(getProfile);
	} catch (error) {
		if (error.response) {
			const profileError: ProfileError = {
				type: Actions.PROFILE_ERROR,
				payload: {
					msg: error.response.data.msg as string,
					status: error.response.status as number,
				},
			};
			dispatch(profileError);
		}
	}
};

//Get all profiles

export const getProfileById = (
	id: string
): ThunkAction<void, RootState, null, Action<string>> => async (
	dispatch: ThunkDispatch<RootState, null, Action<string>>
) => {
	dispatch({ type: Actions.SET_LOADING });
	try {
		const res = await axios.get<ProfileFromResponse>(`/api/profiles/user/${id}`);

		const getProfile: GetProfile = {
			type: Actions.GET_PROFILE,
			payload: res.data,
		};
		dispatch(getProfile);
	} catch (error) {
		if (error.response) {
			const profileError: ProfileError = {
				type: Actions.PROFILE_ERROR,
				payload: {
					msg: error.response.data.msg as string,
					status: error.response.status as number,
				},
			};
			dispatch(profileError);
		}
	}
};

//Get Github Repos

export const getGithubRepos = (
	username: string
): ThunkAction<void, RootState, null, Action<string>> => async (
	dispatch: ThunkDispatch<RootState, null, Action<string>>
) => {
	try {
		const res = await axios.get(`/api/profiles/github/${username}`);

		const getProfile = {
			type: Actions.GET_GITHUB,
			payload: res.data,
		};
		dispatch(getProfile);
	} catch (error) {
		if (error.response) {
			const profileError: ProfileError = {
				type: Actions.PROFILE_ERROR,
				payload: {
					msg: error.response.data.msg as string,
					status: error.response.status as number,
				},
			};
			dispatch(profileError);
		}
	}
};

// Create or update a profile
export const createProfile = (
	formData: ProfileDataModel,
	history: History,
	edit = false
): ThunkAction<void, RootState, null, Action<string>> => async (
	dispatch: ThunkDispatch<RootState, null, Action<string>>
) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.post<ProfileFromResponse>('/api/profiles', formData, config);
		const getProfile: GetProfile = {
			type: Actions.GET_PROFILE,
			payload: res.data,
		};
		dispatch(getProfile);

		dispatch(setAlert(edit ? 'Profile updated' : 'Profile created', 'success'));

		if (!edit) {
			history.push('/dashboard');
		}
	} catch (error) {
		const errors = error.response.data.errors;
		errors.forEach((error: { msg: string }) => {
			dispatch(setAlert(error.msg, 'danger'));
		});

		const regFail: ProfileActionTypes = {
			type: Actions.PROFILE_ERROR,
			payload: { msg: errors, status: error.response.status },
		};
		dispatch(regFail);

		throw error;
	}
};

// Add experience
export const addExperience = (
	formData: ExpDataModel,
	history: History
): ThunkAction<void, RootState, null, Action<string>> => async (
	dispatch: ThunkDispatch<RootState, null, Action<string>>
) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.put<ProfileFromResponse>(
			'/api/profiles/experience',
			formData,
			config
		);
		const updateProfile: UpdateProfile = {
			type: Actions.UPDATE_PROFILE,
			payload: res.data,
		};
		dispatch(updateProfile);

		dispatch(setAlert('Experience Added', 'success'));

		history.push('/dashboard');
	} catch (error) {
		const errors = error.response.data.errors;
		errors.forEach((error: { msg: string }) => {
			dispatch(setAlert(error.msg, 'danger'));
		});

		const regFail: ProfileActionTypes = {
			type: Actions.PROFILE_ERROR,
			payload: { msg: errors, status: error.response.status },
		};
		dispatch(regFail);

		throw error;
	}
};

// Add education
export const addEducation = (
	formData: EduDataModel,
	history: History
): ThunkAction<void, RootState, null, Action<string>> => async (
	dispatch: ThunkDispatch<RootState, null, Action<string>>
) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.put<ProfileFromResponse>(
			'/api/profiles/education',
			formData,
			config
		);
		const updateProfile: UpdateProfile = {
			type: Actions.UPDATE_PROFILE,
			payload: res.data,
		};
		dispatch(updateProfile);

		dispatch(setAlert('Education Added', 'success'));

		history.push('/dashboard');
	} catch (error) {
		const errors = error.response.data.errors;
		errors.forEach((error: { msg: string }) => {
			dispatch(setAlert(error.msg, 'danger'));
		});

		const regFail: ProfileActionTypes = {
			type: Actions.PROFILE_ERROR,
			payload: { msg: errors, status: error.response.status },
		};
		dispatch(regFail);

		throw error;
	}
};

export const deleteExperience = (
	id: string
): ThunkAction<void, RootState, null, Action<string>> => async (
	dispatch: ThunkDispatch<RootState, null, Action<string>>
) => {
	try {
		const res = await axios.delete<ProfileFromResponse>(`/api/profiles/experience/${id}`);

		const updateProfile: UpdateProfile = {
			type: Actions.UPDATE_PROFILE,
			payload: res.data,
		};
		dispatch(updateProfile);
		dispatch(setAlert('Experience Removed', 'success'));
	} catch (error) {
		const errors = error.response.data.errors;
		errors.forEach((error: { msg: string }) => {
			dispatch(setAlert(error.msg, 'danger'));
		});

		const regFail: ProfileActionTypes = {
			type: Actions.PROFILE_ERROR,
			payload: { msg: errors, status: error.response.status },
		};
		dispatch(regFail);

		throw error;
	}
};

export const deleteEducation = (
	id: string
): ThunkAction<void, RootState, null, Action<string>> => async (
	dispatch: ThunkDispatch<RootState, null, Action<string>>
) => {
	try {
		const res = await axios.delete<ProfileFromResponse>(`/api/profiles/education/${id}`);

		const updateProfile: UpdateProfile = {
			type: Actions.UPDATE_PROFILE,
			payload: res.data,
		};
		dispatch(updateProfile);
		dispatch(setAlert('Education Removed', 'success'));
	} catch (error) {
		const errors = error.response.data.errors;
		errors.forEach((error: { msg: string }) => {
			dispatch(setAlert(error.msg, 'danger'));
		});

		const regFail: ProfileActionTypes = {
			type: Actions.PROFILE_ERROR,
			payload: { msg: errors, status: error.response.status },
		};
		dispatch(regFail);

		throw error;
	}
};

export const deleteAccount = (): ThunkAction<void, RootState, null, Action<string>> => async (
	dispatch: ThunkDispatch<RootState, null, Action<string>>
) => {
	if (window.confirm('Are you sure? This action cannot be undone')) {
		try {
			await axios.delete('/api/profiles');

			dispatch({ type: Actions.CLEAR_PROFILE });
			dispatch({ type: Actions.ACCOUT_DELETED });
			dispatch(setAlert('Account Deleted', ''));
		} catch (error) {
			const errors = error.response.data.errors;
			errors.forEach((error: { msg: string }) => {
				dispatch(setAlert(error.msg, 'danger'));
			});

			const regFail: ProfileActionTypes = {
				type: Actions.PROFILE_ERROR,
				payload: { msg: errors, status: error.response.status },
			};
			dispatch(regFail);

			throw error;
		}
	}
};
