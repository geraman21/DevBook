import React, { useEffect } from 'react';
import { getGithubRepos } from '../../actions/profile';
import { RootState } from '../../reducers';
import { connect, ConnectedProps } from 'react-redux';
import Spinner from '../layouts/spinner';

interface ProfileGithubProps extends propsFromRedux {
	username: string;
}

const ProfileGithub: React.FC<ProfileGithubProps> = ({ username, repos, getGithubRepos }) => {
	useEffect(() => {
		getGithubRepos(username);
	}, [getGithubRepos, username]);

	return (
		<div className="profile-github">
			<h2 className="text-primary my-1">Github Repos</h2>
			{repos === null ? (
				<Spinner />
			) : (
				repos.map((repo) => {
					return (
						<div key={repo._id} className="repo bg-white p-1 my-1">
							<div>
								<h4>
									<a
										href={repo.html_url}
										target="_blank"
										rel="noopener noreferrer"
									>
										{repo.name}
									</a>
								</h4>
								<p>{repo.description}</p>
							</div>
							<div>
								<ul>
									<li className="badge badge-primary">
										Stars: {repo.stargazers_count}
									</li>
									<li className="badge badge-dark">
										Watchers: {repo.watchers_count}
									</li>
									<li className="badge badge-light">Forks: {repo.forks_count}</li>
								</ul>
							</div>
						</div>
					);
				})
			)}
		</div>
	);
};

const mapStateToProps = (state: RootState) => ({
	repos: state.profile.repos,
});

const connector = connect(mapStateToProps, { getGithubRepos });

type propsFromRedux = ConnectedProps<typeof connector>;

export default connector(ProfileGithub);
