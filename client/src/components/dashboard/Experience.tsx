import React, { Fragment } from 'react';
import Moment from 'react-moment';
import { Experience as ExperienceType } from '../../../../src/models/Profile';
import { deleteExperience } from '../../actions/profile';
import { connect, ConnectedProps } from 'react-redux';

interface ExperienceProps extends propsFromRedux {
	experience?: ExperienceType[];
}

const Experience: React.FC<ExperienceProps> = ({ experience, deleteExperience }) => {
	const experiences = experience?.map((experience) => {
		// const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		// 	e.preventDefault();
		// 	deleteExperience(experience._id!);
		// };

		return (
			<tr key={experience._id}>
				<td>{experience.company}</td>
				<td className="hide-sm">{experience.company}</td>
				<td>
					<Moment format="YYYY/MM/DD">{experience.from}</Moment> -{' '}
					{experience.to === null ? (
						' Now'
					) : (
						<Moment format="YYYY/MM/DD">{experience.to}</Moment>
					)}
				</td>
				<td>
					<button
						className="btn btn-danger"
						onClick={() => deleteExperience(experience._id!)}
					>
						Delete
					</button>
				</td>
			</tr>
		);
	});

	return (
		<Fragment>
			<h2 className="my-2">Experience Credentials</h2>
			<table className="table">
				<thead>
					<tr>
						<th>Company</th>
						<th className="hide-sm">Title</th>
						<th className="hide-sm">Years</th>
						<th />
					</tr>
				</thead>
				<tbody>{experiences}</tbody>
			</table>
		</Fragment>
	);
};

const connector = connect(null, { deleteExperience });

type propsFromRedux = ConnectedProps<typeof connector>;

export default connector(Experience);
