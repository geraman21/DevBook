import React from 'react';
import { EduDataModel } from '../../reducers/types';
import Moment from 'react-moment';

interface ProfileEducationProps {
	key: string;
	education: EduDataModel;
}

const ProfileEducation: React.FC<ProfileEducationProps> = ({
	education: { school, degree, fieldofstudy, current, to, from, description },
}) => {
	return (
		<div>
			<h3 className="text-dark">
				{school} {degree}
			</h3>
			<p>
				<Moment format="YYYY/MM/DD">{from}</Moment> -{' '}
				{current ? ' Now' : <Moment format="YYYY/MMYDD">{to}</Moment>}
			</p>
			<p>
				<strong>Position </strong> {fieldofstudy}
			</p>
			<p>
				<strong>Description </strong> {description}
			</p>
		</div>
	);
};

export default ProfileEducation;
