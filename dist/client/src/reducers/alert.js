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
const initialState = [];
function default_1(state = initialState, action) {
    switch (action.type) {
        case Actions.SET_ALERT:
            return [...state, action.payload];
        case Actions.DELETE_ALERT:
            return state.filter((alert) => alert.id !== action.payload);
        default:
            return state;
    }
}
exports.default = default_1;
