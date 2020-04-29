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
const react_redux_1 = require("react-redux");
const alert_1 = require("../../actions/alert");
const auth_1 = require("../../actions/auth");
//import axios from 'axios';
const react_router_dom_1 = require("react-router-dom");
const Register = (props) => {
    const [formData, setFormData] = react_1.useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });
    const { name, email, password, password2 } = formData;
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            props.setAlert('password do no match', 'danger');
        }
        else {
            props.register({ name, email, password });
            console.log('success');
        }
    };
    //Redirct if logged in
    if (props.isAuthenticated) {
        return <react_router_dom_1.Redirect to="/dashboard"/>;
    }
    return (<react_1.Fragment>
			<div className="container">
				{' '}
				<h1 className="large text-primary">Sign Up</h1>
				<p className="lead">
					<i className="fas fa-user"></i> Create Your Account
				</p>
				<form className="form" action="create-profile.html" onSubmit={(e) => onSubmit(e)}>
					<div className="form-group">
						<input type="text" placeholder="Name" name="name" value={name} onChange={(e) => onChange(e)} required/>
					</div>
					<div className="form-group">
						<input type="email" placeholder="Email Address" name="email" value={email} onChange={(e) => onChange(e)} required/>
						<small className="form-text">
							This site uses Gravatar so if you want a profile image, use a Gravatar
							email
						</small>
					</div>
					<div className="form-group">
						<input type="password" placeholder="Password" name="password" value={password} minLength={6} onChange={(e) => onChange(e)} required/>
					</div>
					<div className="form-group">
						<input type="password" placeholder="Confirm Password" name="password2" value={password2} minLength={6} onChange={(e) => onChange(e)} required/>
					</div>
					<input type="submit" className="btn btn-primary" value="Register"/>
				</form>
				<p className="my-1">
					Already have an account? <react_router_dom_1.Link to="/login">Sign In</react_router_dom_1.Link>
				</p>
			</div>
		</react_1.Fragment>);
};
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});
const connector = react_redux_1.connect(mapStateToProps, { setAlert: alert_1.setAlert, register: auth_1.register });
exports.default = connector(Register);
