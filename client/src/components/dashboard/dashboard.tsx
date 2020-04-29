import React, { useEffect, Fragment } from 'react';
import { RootState } from '../../reducers';
import { connect, ConnectedProps } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layouts/spinner';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

export interface DashboardProps extends propsFromRedux {}

const Dashboard: React.FC<DashboardProps> = (props) => {
	useEffect(() => {
		props.getCurrentProfile();
		// eslint-disable-next-line
	}, []);

	return props.profile.loading && Object.keys(props.profile.profile).length === 0 ? (
		<div className="container">
			{' '}
			<Spinner />{' '}
		</div>
	) : (
		<div className="container">
			<Fragment>
				<h1 className="large text-primary">Dashboard</h1>
				<p className="lead">
					<i className="fas fa-user"></i> Welcome{' '}
					{props.auth.user && props.auth.user.name}
				</p>
				{Object.keys(props.profile.profile).length !== 0 ? (
					<Fragment>
						<DashboardActions />
						<Experience experience={props.profile.profile.experience!} />
						<Education education={props.profile.profile.education}></Education>
					</Fragment>
				) : (
					<Fragment>
						<p>You have not yet set up a profile, please add some info</p>
						<Link to="/create-profile" className="btn btn-primary my-1">
							Create Profile
						</Link>
					</Fragment>
				)}
				<div className="my-2">
					<button className="btn btn-danger" onClick={() => props.deleteAccount()}>
						<i className="fas fa-user-minus"></i> Delete My Account
					</button>
				</div>
			</Fragment>
		</div>
	);
};

// dashboard.propTypes = {};

const mapStateToProps = (state: RootState) => ({
	profile: state.profile,
	auth: state.auth,
});

const connector = connect(mapStateToProps, { getCurrentProfile, deleteAccount });

type propsFromRedux = ConnectedProps<typeof connector>;

export default connector(Dashboard);
