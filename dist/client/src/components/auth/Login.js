"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
//import axios from 'axios';
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const alert_1 = require("../../actions/alert");
const auth_1 = require("../../actions/auth");
const Login = (props) => {
    const [formData, setFormData] = react_1.useState({
        email: '',
        password: '',
    });
    const { email, password } = formData;
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async (e) => {
        e.preventDefault();
        props.login({ email, password });
    };
    //Redirct if logged in
    if (props.isAuthenticated) {
        return <react_router_dom_1.Redirect to="/dashboard"/>;
    }
    return (<react_1.Fragment>
			<div className="container">
				{' '}
				<h1 className="large text-primary">Sign In</h1>
				<p className="lead">
					<i className="fas fa-user"></i> Sign into your Account
				</p>
				<form className="form" action="create-profile.html" onSubmit={(e) => onSubmit(e)}>
					<div className="form-group">
						<input type="email" placeholder="Email Address" name="email" value={email} onChange={(e) => onChange(e)} required/>
					</div>
					<div className="form-group">
						<input type="password" placeholder="Password" name="password" value={password} minLength={6} onChange={(e) => onChange(e)} required/>
					</div>
					<input type="submit" className="btn btn-primary" value="Login"/>
				</form>
				<p className="my-1">
					Dont have an account? <react_router_dom_1.Link to="/register">Sign Un</react_router_dom_1.Link>
				</p>
			</div>
		</react_1.Fragment>);
};
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});
const connector = react_redux_1.connect(mapStateToProps, { setAlert: alert_1.setAlert, login: auth_1.login });
exports.default = connector(Login);
