import React, { Fragment, useState } from 'react';
import { addExperience } from '../../actions/profile';
import { connect, ConnectedProps } from 'react-redux';
import { ExpDataModel } from '../../reducers/types';
import { Link, RouteComponentProps } from 'react-router-dom';

interface AddExpProps extends propsFromRedux, RouteComponentProps<any> {}

const AddExp: React.FC<AddExpProps> = (props) => {
	const [formData, setformData] = useState<ExpDataModel>({
		title: '',
		company: '',
		location: '',
		from: '',
		to: '',
		current: false,
		description: '',
	});

	const [toDateDisabled, toggleDisabled] = useState(false);

	const { company, title, location, from, to, current, description } = formData;

	const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setformData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		props.addExperience(formData, props.history);
	};

	return (
		<Fragment>
			<section className="container">
				<h1 className="large text-primary">Add An Experience</h1>
				<p className="lead">
					<i className="fas fa-code-branch"></i> Add any developer/programming positions
					that you have had in the past
				</p>
				<small>* = required field</small>
				<form className="form" onSubmit={(e) => onSubmit(e)}>
					<div className="form-group">
						<input
							type="text"
							placeholder="* Job Title"
							name="title"
							value={title}
							required
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className="form-group">
						<input
							type="text"
							placeholder="* Company"
							name="company"
							value={company}
							required
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className="form-group">
						<input
							type="text"
							placeholder="Location"
							name="location"
							value={location}
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
							Current Job
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
							placeholder="Job Description"
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

const connector = connect(null, { addExperience });

type propsFromRedux = ConnectedProps<typeof connector>;

export default connector(AddExp);
