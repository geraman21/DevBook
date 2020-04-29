import React, { Fragment, useState } from 'react';
import { addEducation } from '../../actions/profile';
import { connect, ConnectedProps } from 'react-redux';
import { EduDataModel } from '../../reducers/types';
import { Link, RouteComponentProps } from 'react-router-dom';

interface AddEduProps extends propsFromRedux, RouteComponentProps<any> {}

const AddEdu: React.FC<AddEduProps> = (props) => {
	const [formData, setformData] = useState<EduDataModel>({
		school: '',
		degree: '',
		fieldofstudy: '',
		from: '',
		to: '',
		current: false,
		description: '',
	});

	const [toDateDisabled, toggleDisabled] = useState(false);

	const { school, degree, fieldofstudy, from, to, current, description } = formData;

	const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setformData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		props.addEducation(formData, props.history);
	};

	return (
		<Fragment>
			<section className="container">
				<h1 className="large text-primary">Add Education</h1>
				<p className="lead">
					<i className="fas fa-code-branch"></i> Add any Degree you achieved in the past
					or currently pursuing
				</p>
				<small>* = required field</small>
				<form className="form" onSubmit={(e) => onSubmit(e)}>
					<div className="form-group">
						<input
							type="text"
							placeholder="* University"
							name="school"
							value={school}
							required
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className="form-group">
						<input
							type="text"
							placeholder="* Degree"
							name="degree"
							value={degree}
							required
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className="form-group">
						<input
							type="text"
							placeholder="Field Of Study"
							name="fieldofstudy"
							value={fieldofstudy}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className="form-group">
						<h4>From Date</h4>
						<input
							type="date"
							name="from"
							value={from.toString()}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className="form-group">
						<p>
							<input
								type="checkbox"
								name="current"
								checked={current}
								onChange={(e) => {
									setformData({ ...formData, current: !current });
									toggleDisabled(!toDateDisabled);
								}}
							/>{' '}
							Currently Enrolled
						</p>
					</div>
					<div className="form-group">
						<h4>To Date</h4>
						<input
							type="date"
							name="to"
							value={to.toString()}
							onChange={(e) => onChange(e)}
							disabled={toDateDisabled}
						/>
					</div>
					<div className="form-group">
						<textarea
							name="description"
							cols={30}
							rows={5}
							placeholder="Degree Description"
							value={description}
							onChange={(e) => onChange(e)}
						></textarea>
					</div>
					<input type="submit" className="btn btn-primary my-1" />
					<Link to="/dashboard" className="btn btn-light my-1">
						Go Back
					</Link>
				</form>
			</section>
		</Fragment>
	);
};

const connector = connect(null, { addEducation });

type propsFromRedux = ConnectedProps<typeof connector>;

export default connector(AddEdu);
