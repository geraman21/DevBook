import React, { useState, Fragment, useEffect } from 'react';
import { ProfileDataModel } from '../../reducers/types';
import { connect, ConnectedProps } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { RootState } from '../../reducers';

interface ProfileProps extends propsFromRedux, RouteComponentProps<any> {}

const EditProfile: React.FC<ProfileProps> = (props) => {
	const [formData, setFormdata] = useState<ProfileDataModel>({
		company: '',
		website: '',
		location: '',
		status: '',
		skills: '',
		bio: '',
		githubusername: '',
		youtube: '',
		twitter: '',
		facebook: '',
		linkedin: '',
		instagram: '',
	});

	useEffect(() => {
		props.getCurrentProfile();

		setFormdata({
			company:
				props.profile.loading || !props.profile.profile?.company
					? ''
					: props.profile.profile.company,
			website:
				props.profile.loading || !props.profile.profile?.website
					? ''
					: props.profile.profile.website,
			location:
				props.profile.loading || !props.profile.profile?.location
					? ''
					: props.profile.profile.location,
			status:
				props.profile.loading || !props.profile.profile?.status
					? ''
					: props.profile.profile.status,
			skills:
				props.profile.loading || !props.profile.profile?.skills
					? ''
					: props.profile.profile.skills.join(','),
			githubusername:
				props.profile.loading || !props.profile.profile?.githubusername
					? ''
					: props.profile.profile.githubusername,
			bio:
				props.profile.loading || !props.profile.profile?.bio
					? ''
					: props.profile.profile.bio,
			twitter:
				props.profile.loading || !props.profile.profile?.social?.twitter
					? ''
					: props.profile.profile.social.twitter,
			facebook:
				props.profile.loading || !props.profile.profile?.social?.facebook
					? ''
					: props.profile.profile.social.facebook,
			youtube:
				props.profile.loading || !props.profile.profile?.social?.youtube
					? ''
					: props.profile.profile.social.youtube,
			linkedin:
				props.profile.loading || !props.profile.profile?.social?.linkedin
					? ''
					: props.profile.profile.social.linkedin,
			instagram:
				props.profile.loading || !props.profile.profile?.social?.instagram
					? ''
					: props.profile.profile.social.instagram,
		});
		// eslint-disable-next-line
	}, []);

	const onChange = (
		e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormdata({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		props.createProfile(formData, props.history, true);
	};

	const [displaySocials, setdisplaySocials] = useState(false);
	return (
		<Fragment>
			<div className="container">
				<h1 className="large text-primary">Create Your Profile</h1>
				<p className="lead">
					<i className="fas fa-user"></i> Let's get some information to make your profile
					stand out
				</p>
				<small>* = required field</small>
				<form className="form" onSubmit={(e) => onSubmit(e)}>
					<div className="form-group">
						<select name="status" value={formData.status} onChange={(e) => onChange(e)}>
							<option value="0">* Select Professional Status</option>
							<option value="Developer">Developer</option>
							<option value="Junior Developer">Junior Developer</option>
							<option value="Senior Developer">Senior Developer</option>
							<option value="Manager">Manager</option>
							<option value="Student or Learning">Student or Learning</option>
							<option value="Instructor">Instructor or Teacher</option>
							<option value="Intern">Intern</option>
							<option value="Other">Other</option>
						</select>
						<small className="form-text">
							Give us an idea of where you are at in your career
						</small>
					</div>
					<div className="form-group">
						<input
							type="text"
							placeholder="Company"
							name="company"
							value={formData.company}
							onChange={(e) => onChange(e)}
						/>
						<small className="form-text">
							Could be your own company or one you work for
						</small>
					</div>
					<div className="form-group">
						<input
							type="text"
							placeholder="Website"
							name="website"
							value={formData.website}
							onChange={(e) => onChange(e)}
						/>
						<small className="form-text">Could be your own or a company website</small>
					</div>
					<div className="form-group">
						<input
							type="text"
							placeholder="Location"
							name="location"
							value={formData.location}
							onChange={(e) => onChange(e)}
						/>
						<small className="form-text">City & state suggested (eg. Boston, MA)</small>
					</div>
					<div className="form-group">
						<input
							type="text"
							placeholder="* Skills"
							name="skills"
							value={formData.skills}
							onChange={(e) => onChange(e)}
						/>
						<small className="form-text">
							Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
						</small>
					</div>
					<div className="form-group">
						<input
							type="text"
							placeholder="Github Username"
							name="githubusername"
							value={formData.githubusername}
							onChange={(e) => onChange(e)}
						/>
						<small className="form-text">
							If you want your latest repos and a Github link, include your username
						</small>
					</div>
					<div className="form-group">
						<textarea
							placeholder="A short bio of yourself"
							name="bio"
							value={formData.bio}
							onChange={(e) => onChange(e)}
						></textarea>
						<small className="form-text">Tell us a little about yourself</small>
					</div>

					<div className="my-2">
						<button
							onClick={() => setdisplaySocials(!displaySocials)}
							type="button"
							className="btn btn-light"
						>
							Add Social Network Links
						</button>
						<span>Optional</span>
					</div>

					{displaySocials && (
						<Fragment>
							<div className="form-group social-input">
								<i className="fab fa-twitter fa-2x"></i>
								<input
									type="text"
									placeholder="Twitter URL"
									name="twitter"
									value={formData.twitter}
									onChange={(e) => onChange(e)}
								/>
							</div>

							<div className="form-group social-input">
								<i className="fab fa-facebook fa-2x"></i>
								<input
									type="text"
									placeholder="Facebook URL"
									name="facebook"
									value={formData.facebook}
									onChange={(e) => onChange(e)}
								/>
							</div>

							<div className="form-group social-input">
								<i className="fab fa-youtube fa-2x"></i>
								<input
									type="text"
									placeholder="YouTube URL"
									name="youtube"
									value={formData.youtube}
									onChange={(e) => onChange(e)}
								/>
							</div>

							<div className="form-group social-input">
								<i className="fab fa-linkedin fa-2x"></i>
								<input
									type="text"
									placeholder="Linkedin URL"
									name="linkedin"
									value={formData.linkedin}
									onChange={(e) => onChange(e)}
								/>
							</div>

							<div className="form-group social-input">
								<i className="fab fa-instagram fa-2x"></i>
								<input
									type="text"
									placeholder="Instagram URL"
									name="instagram"
									value={formData.instagram}
									onChange={(e) => onChange(e)}
								/>
							</div>
						</Fragment>
					)}
					<input type="submit" className="btn btn-primary my-1" />
					<Link to="/dashboard" className="btn btn-light my-1" href="dashboard.html">
						Go Back
					</Link>
				</form>
			</div>
		</Fragment>
	);
};

const mapStateToProps = (state: RootState) => ({
	profile: state.profile,
});

const connector = connect(mapStateToProps, { createProfile, getCurrentProfile });

type propsFromRedux = ConnectedProps<typeof connector>;

export default connector(withRouter(EditProfile));
