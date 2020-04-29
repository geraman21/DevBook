import React, { Fragment } from 'react';
import Moment from 'react-moment';
import { Education as EducationType } from '../../../../src/models/Profile';
import { connect, ConnectedProps } from 'react-redux';
import { deleteEducation } from '../../actions/profile';

interface ExperienceProps extends propsFromRedux {
	education?: EducationType[];
}

const Education: React.FC<ExperienceProps> = ({ education, deleteEducation }) => {
	const educations = education?.map((education) => {
		return (
			<tr key={education._id}>
				<td>{education.school}</td>
				<td className="hide-sm">{education.degree}</td>
				<td>
					<Moment format="YYYY/MM/DD">{education.from}</Moment> -{' '}
					{education.to === null ? (
						' Now'
					) : (
						<Moment format="YYYY/MM/DD">{education.to}</Moment>
					)}
				</td>
				<td>
					<button
						onClick={() => deleteEducation(education._id!)}
						className="btn btn-danger"
					>
						Delete
					</button>
				</td>
			</tr>
		);
	});

	return (
		<Fragment>
			<h2 className="my-2">Education Credentials</h2>
			<table className="table">
				<thead>
					<tr>
						<th>School</th>
						<th className="hide-sm">Degree</th>
						<th className="hide-sm">Years</th>
						<th />
					</tr>
				</thead>
				<tbody>{educations}</tbody>
			</table>
		</Fragment>
	);
};

const connector = connect(null, { deleteEducation });

type propsFromRedux = ConnectedProps<typeof connector>;

export default connector(Education);
