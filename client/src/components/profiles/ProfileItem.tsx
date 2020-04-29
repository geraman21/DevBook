import React from 'react';
import { ProfileFromResponse } from '../../reducers/types';
import { Link } from 'react-router-dom';

interface ProfileItem {
	profile: ProfileFromResponse;
}

const ProfileItem: React.FC<ProfileItem> = ({
	profile: { user, status, company, location, skills },
}) => {
	return (
		<div className="profile bg-light">
			<img src={user?.avatar} alt="" className="round-img" />
			<div>
				<h2>{user?.name}</h2>
				<p>
					{status} {company && <span> at {company}</span>}
				</p>
				<p className="my-1"> {location && <span>{location}</span>} </p>
				<Link to={`/profiles/user/${user?._id}`} className="btn btn-primary">
					View Profile
				</Link>
			</div>
			<ul>
				{skills &&
					skills.slice(0, 4).map((skill, index) => (
						<li key={index} className="text-primary">
							<i className="fas fa-check"></i> {skill}
						</li>
					))}
			</ul>
		</div>
	);
};

export default ProfileItem;
