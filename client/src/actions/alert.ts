import * as Actions from './types';
import uuid from 'uuid';
import { RootState } from '../reducers/index';
import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AlertActionTypes } from '../reducers/types';

export const setAlert = (
	message: string,
	type: string,
	timeout = 5000
): ThunkAction<void, RootState, null, Action<string>> => (dispatch: Dispatch<AlertActionTypes>) => {
	const id = uuid.v4();
	dispatch({
		type: Actions.SET_ALERT,
		payload: { message, type, id },
	});

	setTimeout(() => dispatch({ type: Actions.DELETE_ALERT, payload: id }), timeout);
};
