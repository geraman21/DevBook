"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const privateRoute = ({ component: Component, auth, ...rest }) => (<react_router_dom_1.Route {...rest} render={(props) => !auth.isAuthenticated && !auth.loading ? (<react_router_dom_1.Redirect to="/login"/>) : (<Component {...props}/>)}/>);
const mapStateToProps = (state) => ({
    auth: state.auth,
});
const connector = react_redux_1.connect(mapStateToProps);
exports.default = connector(privateRoute);
