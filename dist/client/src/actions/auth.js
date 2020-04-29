"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const Actions = __importStar(require("./types"));
const alert_1 = require("./alert");
const setAuthToken_1 = __importDefault(require("../utils/setAuthToken"));
//Load User
exports.loadUser = () => async (dispatch) => {
    if (localStorage.getItem('token')) {
        setAuthToken_1.default(localStorage.getItem('token'));
    }
    try {
        const res = await axios_1.default.get('/api/auth');
        const userDataResponse = {
            type: Actions.USER_LOADED,
            payload: res.data,
        };
        dispatch(userDataResponse);
    }
    catch (error) {
        const authError = {
            type: Actions.AUTH_ERROR,
        };
        dispatch(authError);
    }
};
//Login as a user
exports.login = ({ email, password, }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify({ email, password });
    try {
        const res = await axios_1.default.post('/api/auth', body, config);
        const loginSuccess = {
            type: Actions.LOGIN_SUCCESS,
            payload: res.data,
        };
        dispatch(loginSuccess);
        dispatch(exports.loadUser());
    }
    catch (error) {
        if (error && error.response) {
            const errors = error.response.data.errors;
            errors.forEach((error) => {
                dispatch(alert_1.setAlert(error.msg, 'danger'));
            });
        }
        const loginFail = {
            type: Actions.AUTH_ERROR,
        };
        dispatch(loginFail);
        throw error;
    }
};
// Register User
exports.register = ({ name, email, password, }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify({ name, email, password });
    try {
        const res = await axios_1.default.post('/api/users', body, config);
        const regSuccess = {
            type: Actions.REGISTER_SUCCESS,
            payload: res.data,
        };
        dispatch(regSuccess);
        dispatch(exports.loadUser());
    }
    catch (error) {
        if (error && error.response) {
            const errors = error.response.data.errors;
            errors.forEach((error) => {
                dispatch(alert_1.setAlert(error.msg, 'danger'));
            });
        }
        const regFail = {
            type: Actions.REGISTER_FAIL,
        };
        dispatch(regFail);
        throw error;
    }
};
exports.logout = () => async (dispatch) => {
    dispatch({ type: Actions.CLEAR_PROFILE });
    dispatch({ type: Actions.LOGOUT });
};
