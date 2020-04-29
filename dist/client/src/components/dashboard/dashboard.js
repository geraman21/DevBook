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
const react_redux_1 = require("react-redux");
const profile_1 = require("../../actions/profile");
const spinner_1 = __importDefault(require("../layouts/spinner"));
const react_router_dom_1 = require("react-router-dom");
const DashboardActions_1 = __importDefault(require("./DashboardActions"));
const Experience_1 = __importDefault(require("./Experience"));
const Education_1 = __importDefault(require("./Education"));
const Dashboard = (props) => {
    react_1.useEffect(() => {
        props.getCurrentProfile();
        // eslint-disable-next-line
    }, []);
    return props.profile.loading && Object.keys(props.profile.profile).length === 0 ? (<div className="container">
			{' '}
			<spinner_1.default />{' '}
		</div>) : (<div className="container">
			<react_1.Fragment>
				<h1 className="large text-primary">Dashboard</h1>
				<p className="lead">
					<i className="fas fa-user"></i> Welcome{' '}
					{props.auth.user && props.auth.user.name}
				</p>
				{Object.keys(props.profile.profile).length !== 0 ? (<react_1.Fragment>
						<DashboardActions_1.default />
						<Experience_1.default experience={props.profile.profile.experience}/>
						<Education_1.default education={props.profile.profile.education}></Education_1.default>
					</react_1.Fragment>) : (<react_1.Fragment>
						<p>You have not yet set up a profile, please add some info</p>
						<react_router_dom_1.Link to="/create-profile" className="btn btn-primary my-1">
							Create Profile
						</react_router_dom_1.Link>
					</react_1.Fragment>)}
				<div className="my-2">
					<button className="btn btn-danger" onClick={() => props.deleteAccount()}>
						<i className="fas fa-user-minus"></i> Delete My Account
					</button>
				</div>
			</react_1.Fragment>
		</div>);
};
// dashboard.propTypes = {};
const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
});
const connector = react_redux_1.connect(mapStateToProps, { getCurrentProfile: profile_1.getCurrentProfile, deleteAccount: profile_1.deleteAccount });
exports.default = connector(Dashboard);
