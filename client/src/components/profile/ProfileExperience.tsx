import React from 'react';
import { ExpDataModel } from '../../reducers/types';
import Moment from 'react-moment';

interface ProfileExperienceProps {
	key: string;
	experience: ExpDataModel;
}

const ProfileExperience: React.FC<ProfileExperienceProps> = ({
	experience: { company, title, location, current, to, from, description },
}) => {
	return (
		<div>
			<h3 className="text-dark">
				{company} {location}
			</h3>

			<p>
				<Moment format="YYYY/MM/DD">{from}</Moment> -{' '}
				{current ? ' Now' : <Moment format="YYYY/MMYDD">{to}</Moment>}
			</p>
			<p>
				<strong>Position </strong> {title}
			</p>
			<p>
				<strong>Description </strong> {description}
			</p>
		</div>
	);
};

export default ProfileExperience;
