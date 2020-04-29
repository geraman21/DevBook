"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Actions = __importStar(require("../actions/types"));
const initPostState = {
    text: '',
    name: '',
    avatar: '',
    user: '',
    _id: '',
    date: '',
};
const initialState = {
    posts: [],
    post: initPostState,
    loading: true,
    error: {},
};
function default_1(state = initialState, action) {
    switch (action.type) {
        case Actions.GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false,
            };
        case Actions.POST_ERROR:
            return {
                ...state,
                post: initPostState,
                loading: false,
                error: action.payload,
            };
        case Actions.UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    return post._id === action.payload.id
                        ? { ...post, likes: action.payload.likes }
                        : post;
                }),
                loading: false,
            };
        case Actions.DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== action.payload),
                loading: false,
            };
        case Actions.ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts],
                loading: false,
            };
        default:
            return state;
    }
}
exports.default = default_1;
