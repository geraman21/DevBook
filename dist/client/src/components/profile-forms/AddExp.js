"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const profile_1 = require("../../actions/profile");
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const AddExp = (props) => {
    const [formData, setformData] = react_1.useState({
        title: '',
        company: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: '',
    });
    const [toDateDisabled, toggleDisabled] = react_1.useState(false);
    const { company, title, location, from, to, current, description } = formData;
    const onChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    };
    const onSubmit = (e) => {
        e.preventDefault();
        props.addExperience(formData, props.history);
    };
    return (<react_1.Fragment>
			<section className="container">
				<h1 className="large text-primary">Add An Experience</h1>
				<p className="lead">
					<i className="fas fa-code-branch"></i> Add any developer/programming positions
					that you have had in the past
				</p>
				<small>* = required field</small>
				<form className="form" onSubmit={(e) => onSubmit(e)}>
					<div className="form-group">
						<input type="text" placeholder="* Job Title" name="title" value={title} required onChange={(e) => onChange(e)}/>
					</div>
					<div className="form-group">
						<input type="text" placeholder="* Company" name="company" value={company} required onChange={(e) => onChange(e)}/>
					</div>
					<div className="form-group">
						<input type="text" placeholder="Location" name="location" value={location} onChange={(e) => onChange(e)}/>
					</div>
					<div className="form-group">
						<h4>From Date</h4>
						<input type="date" name="from" value={from.toString()} onChange={(e) => onChange(e)}/>
					</div>
					<div className="form-group">
						<p>
							<input type="checkbox" name="current" checked={current} onChange={(e) => {
        setformData({ ...formData, current: !current });
        toggleDisabled(!toDateDisabled);
    }}/>{' '}
							Current Job
						</p>
					</div>
					<div className="form-group">
						<h4>To Date</h4>
						<input type="date" name="to" value={to.toString()} onChange={(e) => onChange(e)} disabled={toDateDisabled}/>
					</div>
					<div className="form-group">
						<textarea name="description" cols={30} rows={5} placeholder="Job Description" value={description} onChange={(e) => onChange(e)}></textarea>
					</div>
					<input type="submit" className="btn btn-primary my-1"/>
					<react_router_dom_1.Link to="/dashboard" className="btn btn-light my-1">
						Go Back
					</react_router_dom_1.Link>
				</form>
			</section>
		</react_1.Fragment>);
};
const connector = react_redux_1.connect(null, { addExperience: profile_1.addExperience });
exports.default = connector(AddExp);
