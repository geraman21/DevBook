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
const spinner_1 = __importDefault(require("../layouts/spinner"));
const ProfileItem_1 = __importDefault(require("./ProfileItem"));
const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
    react_1.useEffect(() => {
        getProfiles();
        // eslint-disable-next-line
    }, []);
    return (<react_1.Fragment>
			{loading ? (<spinner_1.default />) : (<react_1.Fragment>
					<div className="container">
						<h1 className="large text-primary">Developers</h1>
						<p className="lead">
							<i className="fab fa-connectdevelop"></i> Browse and connect with
							Developers
						</p>
						<div className="profiles">
							{profiles.length > 0 ? (profiles.map((profile) => {
        return <ProfileItem_1.default key={profile._id} profile={profile}/>;
    })) : !loading ? (<h4>No profiles found...</h4>) : (<spinner_1.default />)}
						</div>
					</div>
				</react_1.Fragment>)}
		</react_1.Fragment>);
};
const mapStateToProps = (state) => ({
    profile: state.profile,
});
const connector = react_redux_1.connect(mapStateToProps, { getProfiles: profile_1.getProfiles });
exports.default = connector(Profiles);
