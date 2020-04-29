import React, { Fragment, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import FormDataModel from '../../models/RegisterFormMode';
//import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { RootState } from '../../reducers';

interface RegisterProps extends PropsFromRedux {}

const Register: React.FC<RegisterProps> = (props) => {
	const [formData, setFormData] = useState<FormDataModel>({
		name: '',
		email: '',
		password: '',
		password2: '',
	});

	const { name, email, password, password2 } = formData;

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (password !== password2) {
			props.setAlert('password do no match', 'danger');
		} else {
			props.register({ name, email, password });
			console.log('success');
		}
	};

	//Redirct if logged in

	if (props.isAuthenticated) {
		return <Redirect to="/dashboard" />;
	}

	return (
		<Fragment>
			<div className="container">
				{' '}
				<h1 className="large text-primary">Sign Up</h1>
				<p className="lead">
					<i className="fas fa-user"></i> Create Your Account
				</p>
				<form className="form" action="create-profile.html" onSubmit={(e) => onSubmit(e)}>
					<div className="form-group">
						<input
							type="text"
							placeholder="Name"
							name="name"
							value={name}
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
					<div className="form-group">
						<input
							type="email"
							placeholder="Email Address"
							name="email"
							value={email}
							onChange={(e) => onChange(e)}
							required
						/>
						<small className="form-text">
							This site uses Gravatar so if you want a profile image, use a Gravatar
							email
						</small>
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
					<div className="form-group">
						<input
							type="password"
							placeholder="Confirm Password"
							name="password2"
							value={password2}
							minLength={6}
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
					<input type="submit" className="btn btn-primary" value="Register" />
				</form>
				<p className="my-1">
					Already have an account? <Link to="/login">Sign In</Link>
				</p>
			</div>
		</Fragment>
	);
};

const mapStateToProps = (state: RootState) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

const connector = connect(mapStateToProps, { setAlert, register });

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Register);
