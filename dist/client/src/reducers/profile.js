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
const initialState = {
    profile: {},
    profiles: [],
    repos: [],
    loading: true,
    error: {},
};
function default_1(state = initialState, action) {
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
exports.default = default_1;
