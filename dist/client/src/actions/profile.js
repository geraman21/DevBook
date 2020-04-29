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
exports.getCurrentProfile = () => async (dispatch) => {
    dispatch({ type: Actions.SET_LOADING });
    try {
        const res = await axios_1.default.get('/api/profiles/me');
        const getProfile = {
            type: Actions.GET_PROFILE,
            payload: res.data,
        };
        dispatch(getProfile);
    }
    catch (error) {
        if (error.response) {
            const profileError = {
                type: Actions.PROFILE_ERROR,
                payload: {
                    msg: error.response.data.msg,
                    status: error.response.status,
                },
            };
            dispatch(profileError);
        }
    }
};
//Get all profiles
exports.getProfiles = () => async (dispatch) => {
    dispatch({ type: Actions.CLEAR_PROFILE });
    dispatch({ type: Actions.SET_LOADING });
    try {
        const res = await axios_1.default.get('/api/profiles');
        const getProfile = {
            type: Actions.GET_PROFILES,
            payload: res.data,
        };
        dispatch(getProfile);
    }
    catch (error) {
        if (error.response) {
            const profileError = {
                type: Actions.PROFILE_ERROR,
                payload: {
                    msg: error.response.data.msg,
                    status: error.response.status,
                },
            };
            dispatch(profileError);
        }
    }
};
//Get all profiles
exports.getProfileById = (id) => async (dispatch) => {
    dispatch({ type: Actions.SET_LOADING });
    try {
        const res = await axios_1.default.get(`/api/profiles/user/${id}`);
        const getProfile = {
            type: Actions.GET_PROFILE,
            payload: res.data,
        };
        dispatch(getProfile);
    }
    catch (error) {
        if (error.response) {
            const profileError = {
                type: Actions.PROFILE_ERROR,
                payload: {
                    msg: error.response.data.msg,
                    status: error.response.status,
                },
            };
            dispatch(profileError);
        }
    }
};
//Get Github Repos
exports.getGithubRepos = (username) => async (dispatch) => {
    try {
        const res = await axios_1.default.get(`/api/profiles/github/${username}`);
        const getProfile = {
            type: Actions.GET_GITHUB,
            payload: res.data,
        };
        dispatch(getProfile);
    }
    catch (error) {
        if (error.response) {
            const profileError = {
                type: Actions.PROFILE_ERROR,
                payload: {
                    msg: error.response.data.msg,
                    status: error.response.status,
                },
            };
            dispatch(profileError);
        }
    }
};
// Create or update a profile
exports.createProfile = (formData, history, edit = false) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const res = await axios_1.default.post('/api/profiles', formData, config);
        const getProfile = {
            type: Actions.GET_PROFILE,
            payload: res.data,
        };
        dispatch(getProfile);
        dispatch(alert_1.setAlert(edit ? 'Profile updated' : 'Profile created', 'success'));
        if (!edit) {
            history.push('/dashboard');
        }
    }
    catch (error) {
        const errors = error.response.data.errors;
        errors.forEach((error) => {
            dispatch(alert_1.setAlert(error.msg, 'danger'));
        });
        const regFail = {
            type: Actions.PROFILE_ERROR,
            payload: { msg: errors, status: error.response.status },
        };
        dispatch(regFail);
        throw error;
    }
};
// Add experience
exports.addExperience = (formData, history) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const res = await axios_1.default.put('/api/profiles/experience', formData, config);
        const updateProfile = {
            type: Actions.UPDATE_PROFILE,
            payload: res.data,
        };
        dispatch(updateProfile);
        dispatch(alert_1.setAlert('Experience Added', 'success'));
        history.push('/dashboard');
    }
    catch (error) {
        const errors = error.response.data.errors;
        errors.forEach((error) => {
            dispatch(alert_1.setAlert(error.msg, 'danger'));
        });
        const regFail = {
            type: Actions.PROFILE_ERROR,
            payload: { msg: errors, status: error.response.status },
        };
        dispatch(regFail);
        throw error;
    }
};
// Add education
exports.addEducation = (formData, history) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const res = await axios_1.default.put('/api/profiles/education', formData, config);
        const updateProfile = {
            type: Actions.UPDATE_PROFILE,
            payload: res.data,
        };
        dispatch(updateProfile);
        dispatch(alert_1.setAlert('Education Added', 'success'));
        history.push('/dashboard');
    }
    catch (error) {
        const errors = error.response.data.errors;
        errors.forEach((error) => {
            dispatch(alert_1.setAlert(error.msg, 'danger'));
        });
        const regFail = {
            type: Actions.PROFILE_ERROR,
            payload: { msg: errors, status: error.response.status },
        };
        dispatch(regFail);
        throw error;
    }
};
exports.deleteExperience = (id) => async (dispatch) => {
    try {
        const res = await axios_1.default.delete(`/api/profiles/experience/${id}`);
        const updateProfile = {
            type: Actions.UPDATE_PROFILE,
            payload: res.data,
        };
        dispatch(updateProfile);
        dispatch(alert_1.setAlert('Experience Removed', 'success'));
    }
    catch (error) {
        const errors = error.response.data.errors;
        errors.forEach((error) => {
            dispatch(alert_1.setAlert(error.msg, 'danger'));
        });
        const regFail = {
            type: Actions.PROFILE_ERROR,
            payload: { msg: errors, status: error.response.status },
        };
        dispatch(regFail);
        throw error;
    }
};
exports.deleteEducation = (id) => async (dispatch) => {
    try {
        const res = await axios_1.default.delete(`/api/profiles/education/${id}`);
        const updateProfile = {
            type: Actions.UPDATE_PROFILE,
            payload: res.data,
        };
        dispatch(updateProfile);
        dispatch(alert_1.setAlert('Education Removed', 'success'));
    }
    catch (error) {
        const errors = error.response.data.errors;
        errors.forEach((error) => {
            dispatch(alert_1.setAlert(error.msg, 'danger'));
        });
        const regFail = {
            type: Actions.PROFILE_ERROR,
            payload: { msg: errors, status: error.response.status },
        };
        dispatch(regFail);
        throw error;
    }
};
exports.deleteAccount = () => async (dispatch) => {
    if (window.confirm('Are you sure? This action cannot be undone')) {
        try {
            await axios_1.default.delete('/api/profiles');
            dispatch({ type: Actions.CLEAR_PROFILE });
            dispatch({ type: Actions.ACCOUT_DELETED });
            dispatch(alert_1.setAlert('Account Deleted', ''));
        }
        catch (error) {
            const errors = error.response.data.errors;
            errors.forEach((error) => {
                dispatch(alert_1.setAlert(error.msg, 'danger'));
            });
            const regFail = {
                type: Actions.PROFILE_ERROR,
                payload: { msg: errors, status: error.response.status },
            };
            dispatch(regFail);
            throw error;
        }
    }
};
