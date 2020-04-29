import { AlertActionTypes, AlertState } from './types';
import * as Actions from '../actions/types';

const initialState: AlertState = [];

export default function (state = initialState, action: AlertActionTypes): AlertState {
	switch (action.type) {
		case Actions.SET_ALERT:
			return [...state, action.payload];
		case Actions.DELETE_ALERT:
			return state.filter((alert) => alert.id !== action.payload);
		default:
			return state;
	}
}
