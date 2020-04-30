import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { RootState } from '../../reducers';
import { connect, ConnectedProps } from 'react-redux';

interface LandingProps extends propsFromRedux {}

const Landing: React.FC<LandingProps> = (props) => {
	if (props.isAuthenticated) {
		return <Redirect to="/dashboard" />;
	}
	return (
		<section className="landing">
			<div className="dark-overlay">
				<div className="landing-inner">
					<h1 className="x-large">Developers Book</h1>
					<p className="lead">
						Create a developer profile/portfolio, share posts and get help from other
						developers
					</p>
					<div className="buttons">
						<Link to="/register" className="btn btn-primary">
							Sign Up
						</Link>
						<Link to="/login" className="btn btn-light">
							Login
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

const mapStateToProps = (state: RootState) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

const connector = connect(mapStateToProps);

type propsFromRedux = ConnectedProps<typeof connector>;

export default connector(Landing);
