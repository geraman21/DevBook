import React, { useEffect, Fragment } from 'react';
import { RootState } from '../../reducers';
import { getProfiles } from '../../actions/profile';
import { connect, ConnectedProps } from 'react-redux';
import Spinner from '../layouts/spinner';
import ProfileItem from './ProfileItem';

interface ProfilesProps extends propsFromRedux {}

const Profiles: React.FC<ProfilesProps> = ({ getProfiles, profile: { profiles, loading } }) => {
	useEffect(() => {
		getProfiles();
		// eslint-disable-next-line
	}, []);
	return (
		<Fragment>
			{loading ? (
				<Spinner />
			) : (
				<Fragment>
					<div className="container">
						<h1 className="large text-primary">Developers</h1>
						<p className="lead">
							<i className="fab fa-connectdevelop"></i> Browse and connect with
							Developers
						</p>
						<div className="profiles">
							{profiles.length > 0 ? (
								profiles.map((profile) => {
									return <ProfileItem key={profile._id} profile={profile} />;
								})
							) : !loading ? (
								<h4>No profiles found...</h4>
							) : (
								<Spinner />
							)}
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

const mapStateToProps = (state: RootState) => ({
	profile: state.profile,
});

const connector = connect(mapStateToProps, { getProfiles });

type propsFromRedux = ConnectedProps<typeof connector>;

export default connector(Profiles);
