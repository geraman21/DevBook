import React, { Fragment, useState } from 'react';
import LoginFormDataModel from '../../models/LoginFormModel';
//import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { login } from '../../actions/auth';
import { RootState } from '../../reducers';

interface LoginProps extends PropsFromRedux {}

const Login: React.SFC<LoginProps> = (props) => {
	const [formData, setFormData] = useState<LoginFormDataModel>({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		props.login({ email, password });
	};

	//Redirct if logged in

	if (props.isAuthenticated) {
		return <Redirect to="/dashboard" />;
	}

	return (
		<Fragment>
			<div className="container">
				{' '}
				<h1 className="large text-primary">Sign In</h1>
				<p className="lead">
					<i className="fas fa-user"></i> Sign into your Account
				</p>
				<form className="form" action="create-profile.html" onSubmit={(e) => onSubmit(e)}>
					<div className="form-group">
						<input
							type="email"
							placeholder="Email Address"
							name="email"
							value={email}
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
					<div className="form-group">
						<input
							type="password"
							placeholder="Password"
							name="password"
							value={password}
							minLength={6}
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
					<input type="submit" className="btn btn-primary" value="Login" />
				</form>
				<p className="my-1">
					Dont have an account? <Link to="/register">Sign Un</Link>
				</p>
			</div>
		</Fragment>
	);
};

const mapStateToProps = (state: RootState) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

const connector = connect(mapStateToProps, { setAlert, login });

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Login);
