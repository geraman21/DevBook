"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Get Posts
const Actions = __importStar(require("./types"));
const axios_1 = __importDefault(require("axios"));
const alert_1 = require("./alert");
exports.getPosts = () => async (dispatch) => {
    try {
        const res = await axios_1.default.get('/api/posts');
        dispatch({ type: Actions.GET_POSTS, payload: res.data });
    }
    catch (error) {
        if (error.response) {
            const postError = {
                type: Actions.POST_ERROR,
                payload: {
                    msg: error.response.data.msg,
                    status: error.response.status,
                },
            };
            dispatch(postError);
        }
    }
};
exports.addLike = (id) => async (dispatch) => {
    try {
        const res = await axios_1.default.put(`/api/posts/likes/${id}`);
        dispatch({ type: Actions.UPDATE_LIKES, payload: { id, likes: res.data } });
    }
    catch (error) {
        if (error.response) {
            const postError = {
                type: Actions.POST_ERROR,
                payload: {
                    msg: error.response.data.msg,
                    status: error.response.status,
                },
            };
            dispatch(postError);
        }
    }
};
exports.removeLike = (id) => async (dispatch) => {
    try {
        const res = await axios_1.default.put(`/api/posts/unlikes/${id}`);
        dispatch({ type: Actions.UPDATE_LIKES, payload: { id, likes: res.data } });
    }
    catch (error) {
        if (error.response) {
            const postError = {
                type: Actions.POST_ERROR,
                payload: {
                    msg: error.response.data.msg,
                    status: error.response.status,
                },
            };
            dispatch(postError);
        }
    }
};
//Remove post
exports.deletePost = (id) => async (dispatch) => {
    try {
        const res = await axios_1.default.delete(`/api/posts//${id}`);
        dispatch({ type: Actions.DELETE_POST, payload: id });
        dispatch(alert_1.setAlert(res.data.msg, 'success'));
    }
    catch (error) {
        if (error.response) {
            const postError = {
                type: Actions.POST_ERROR,
                payload: {
                    msg: error.response.data.msg,
                    status: error.response.status,
                },
            };
            dispatch(postError);
        }
    }
};
//Remove post
exports.addPost = (formData) => async (dispatch) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };
    try {
        const res = await axios_1.default.post(`/api/posts/`, formData, config);
        dispatch({ type: Actions.ADD_POST, payload: res.data });
        dispatch(alert_1.setAlert('Post Created', 'success'));
    }
    catch (error) {
        if (error.response) {
            const postError = {
                type: Actions.POST_ERROR,
                payload: {
                    msg: error.response.data.msg,
                    status: error.response.status,
                },
            };
            dispatch(postError);
        }
    }
};
