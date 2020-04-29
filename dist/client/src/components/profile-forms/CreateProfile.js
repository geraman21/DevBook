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
const react_redux_1 = require("react-redux");
const profile_1 = require("../../actions/profile");
const react_router_dom_1 = require("react-router-dom");
const CreateProfile = (props) => {
    const [formData, setFormdata] = react_1.useState({
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
    const onChange = (e) => {
        setFormdata({ ...formData, [e.target.name]: e.target.value });
    };
    const onSubmit = (e) => {
        e.preventDefault();
        props.createProfile(formData, props.history);
    };
    const [displaySocials, setdisplaySocials] = react_1.useState(false);
    return (<react_1.Fragment>
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
						<input type="text" placeholder="Company" name="company" value={formData.company} onChange={(e) => onChange(e)}/>
						<small className="form-text">
							Could be your own company or one you work for
						</small>
					</div>
					<div className="form-group">
						<input type="text" placeholder="Website" name="website" value={formData.website} onChange={(e) => onChange(e)}/>
						<small className="form-text">Could be your own or a company website</small>
					</div>
					<div className="form-group">
						<input type="text" placeholder="Location" name="location" value={formData.location} onChange={(e) => onChange(e)}/>
						<small className="form-text">City & state suggested (eg. Boston, MA)</small>
					</div>
					<div className="form-group">
						<input type="text" placeholder="* Skills" name="skills" value={formData.skills} onChange={(e) => onChange(e)}/>
						<small className="form-text">
							Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
						</small>
					</div>
					<div className="form-group">
						<input type="text" placeholder="Github Username" name="githubusername" value={formData.githubusername} onChange={(e) => onChange(e)}/>
						<small className="form-text">
							If you want your latest repos and a Github link, include your username
						</small>
					</div>
					<div className="form-group">
						<textarea placeholder="A short bio of yourself" name="bio" value={formData.bio} onChange={(e) => onChange(e)}></textarea>
						<small className="form-text">Tell us a little about yourself</small>
					</div>

					<div className="my-2">
						<button onClick={() => setdisplaySocials(!displaySocials)} type="button" className="btn btn-light">
							Add Social Network Links
						</button>
						<span>Optional</span>
					</div>

					{displaySocials && (<react_1.Fragment>
							<div className="form-group social-input">
								<i className="fab fa-twitter fa-2x"></i>
								<input type="text" placeholder="Twitter URL" name="twitter" value={formData.twitter} onChange={(e) => onChange(e)}/>
							</div>

							<div className="form-group social-input">
								<i className="fab fa-facebook fa-2x"></i>
								<input type="text" placeholder="Facebook URL" name="facebook" value={formData.facebook} onChange={(e) => onChange(e)}/>
							</div>

							<div className="form-group social-input">
								<i className="fab fa-youtube fa-2x"></i>
								<input type="text" placeholder="YouTube URL" name="youtube" value={formData.youtube} onChange={(e) => onChange(e)}/>
							</div>

							<div className="form-group social-input">
								<i className="fab fa-linkedin fa-2x"></i>
								<input type="text" placeholder="Linkedin URL" name="linkedin" value={formData.linkedin} onChange={(e) => onChange(e)}/>
							</div>

							<div className="form-group social-input">
								<i className="fab fa-instagram fa-2x"></i>
								<input type="text" placeholder="Instagram URL" name="instagram" value={formData.instagram} onChange={(e) => onChange(e)}/>
							</div>
						</react_1.Fragment>)}
					<input type="submit" className="btn btn-primary my-1"/>
					<react_router_dom_1.Link to="/dashboard" className="btn btn-light my-1">
						Go Back
					</react_router_dom_1.Link>
				</form>
			</div>
		</react_1.Fragment>);
};
CreateProfile.propTypes = {};
const connector = react_redux_1.connect(null, { createProfile: profile_1.createProfile });
exports.default = connector(react_router_dom_1.withRouter(CreateProfile));
