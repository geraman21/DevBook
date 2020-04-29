"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const profile_1 = require("../../actions/profile");
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const spinner_1 = __importDefault(require("../layouts/spinner"));
const ProfileTop_1 = __importDefault(require("./ProfileTop"));
const ProfileAbout_1 = __importDefault(require("./ProfileAbout"));
const ProfileExperience_1 = __importDefault(require("./ProfileExperience"));
const ProfileEducation_1 = __importDefault(require("./ProfileEducation"));
const ProfileGithub_1 = __importDefault(require("./ProfileGithub"));
const Profile = ({ match, getProfileById, profile: { profile, loading }, auth, }) => {
    var _a, _b, _c, _d;
    react_1.useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById, match.params.id]);
    return (<react_1.Fragment>
			<div className="container">
				{Object.keys(profile).length === 0 || loading ? (<spinner_1.default />) : (<react_1.Fragment>
						<react_router_dom_1.Link to="/profiles" className="btn btn-light">
							Back to Profiles
						</react_router_dom_1.Link>
						{auth.isAuthenticated &&
        auth.loading === false &&
        ((_a = auth.user) === null || _a === void 0 ? void 0 : _a._id) === ((_b = profile.user) === null || _b === void 0 ? void 0 : _b._id) && (<react_router_dom_1.Link to="/edit-profile" className="btn btn-dark">
									Edit Profile
								</react_router_dom_1.Link>)}
						<div className="profile-grid my-1">
							<ProfileTop_1.default profile={profile}/>
							<ProfileAbout_1.default profile={profile}/>
							<div className="profile-exp bg-white p-2">
								<h2 className="text-primary">Experience</h2>
								{profile.experience.length > 0 ? (<react_1.Fragment>
										{(_c = profile.experience) === null || _c === void 0 ? void 0 : _c.map((exp) => (<ProfileExperience_1.default key={exp._id} experience={exp}/>))}
									</react_1.Fragment>) : (<h4>No Experience Credentials</h4>)}
							</div>
							<div className="profile-edu bg-white p-2">
								<h2 className="text-primary">Education</h2>
								{profile.experience.length > 0 ? (<react_1.Fragment>
										{(_d = profile.education) === null || _d === void 0 ? void 0 : _d.map((edu) => (<ProfileEducation_1.default key={edu._id} education={edu}/>))}
									</react_1.Fragment>) : (<h4>No Education Credentials</h4>)}
							</div>

							{profile.githubusername && (<ProfileGithub_1.default username={profile.githubusername}/>)}
						</div>
					</react_1.Fragment>)}
			</div>
		</react_1.Fragment>);
};
const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
});
const connector = react_redux_1.connect(mapStateToProps, { getProfileById: profile_1.getProfileById });
exports.default = connector(Profile);
