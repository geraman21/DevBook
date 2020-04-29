import React, { Fragment, CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { RootState } from '../../reducers';
import { connect, ConnectedProps } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar: React.SFC<propsFromRedux> = (props) => {
	const authLinks = (
		<ul>
			<li>
				<Link to="/profiles">Developers</Link>
			</li>
			<li>
				<Link to="/posts">Posts</Link>
			</li>
			<li>
				<Link to="/dashboard">
					<i className="fa fa-user" /> <span className="hide-sm">Dashboard</span>
				</Link>
			</li>
			<li>
				<Link to="/dashboard" onClick={props.logout}>
					<i className="fas fa-sign-out-alt" /> <span className="hide-sm">Logout</span>
				</Link>
			</li>
		</ul>
	);

	const guestLinls = (
		<ul>
			<li>
				<Link to="/profiles">Developers</Link>
			</li>
			<li>
				<Link to="/register">Register</Link>
			</li>
			<li>
				<Link to="/login">Login</Link>
			</li>
		</ul>
	);

	return (
		<nav className="navbar bg-dark">
			<h1 style={{ fontSize: '2em' } as CSSProperties}>
				<Link to="/">
					<i className="fas fa-code"></i> DevConnector
				</Link>
			</h1>
			{!props.auth.loading && (
				<Fragment>{props.auth.isAuthenticated ? authLinks : guestLinls}</Fragment>
			)}
		</nav>
	);
};

const mapStateToProps = (state: RootState) => ({
	auth: state.auth,
});

const connector = connect(mapStateToProps, { logout });

type propsFromRedux = ConnectedProps<typeof connector>;

export default connector(Navbar);
