import { ProfileState, ProfileActionTypes } from './types';
import * as Actions from '../actions/types';

const initialState: ProfileState = {
	profile: {},
	profiles: [],
	repos: [],
	loading: true,
	error: {},
};

export default function (state = initialState, action: ProfileActionTypes): ProfileState {
	switch (action.type) {
		case Actions.GET_PROFILE:
		case Actions.UPDATE_PROFILE:
			return {
				...state,
				profile: action.payload,
				loading: false,
				error: {},
			};
		case Actions.GET_PROFILES:
			return {
				...state,
				profiles: action.payload,
				loading: false,
			};
		case Actions.PROFILE_ERROR:
			return {
				...state,
				loading: false,
				profile: {},
				error: action.payload,
			};
		case Actions.CLEAR_PROFILE:
			return {
				...state,
				profile: {},
				repos: [],
				profiles: [],
				error: {},
				loading: false,
			};
		case Actions.GET_GITHUB:
			return {
				...state,
				repos: action.payload,
				loading: false,
			};
		case Actions.SET_LOADING:
			return {
				...state,
				loading: true,
			};
		default:
			return state;
	}
}
