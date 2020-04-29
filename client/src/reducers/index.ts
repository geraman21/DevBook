import { combineReducers } from 'redux';
import Alert from './alert';
import Auth from './auth';
import Profile from './profile';
import Post from './post';

const rootReducer = combineReducers({ alert: Alert, auth: Auth, profile: Profile, post: Post });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
