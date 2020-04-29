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
const ProfileGithub = ({ username, repos, getGithubRepos }) => {
    react_1.useEffect(() => {
        getGithubRepos(username);
    }, [getGithubRepos, username]);
    return (<div className="profile-github">
			<h2 className="text-primary my-1">Github Repos</h2>
			{repos === null ? (<spinner_1.default />) : (repos.map((repo) => {
        return (<div key={repo._id} className="repo bg-white p-1 my-1">
							<div>
								<h4>
									<a href={repo.html_url} target="_blank" rel="noopener noreferrer">
										{repo.name}
									</a>
								</h4>
								<p>{repo.description}</p>
							</div>
							<div>
								<ul>
									<li className="badge badge-primary">
										Stars: {repo.stargazers_count}
									</li>
									<li className="badge badge-dark">
										Watchers: {repo.watchers_count}
									</li>
									<li className="badge badge-light">Forks: {repo.forks_count}</li>
								</ul>
							</div>
						</div>);
    }))}
		</div>);
};
const mapStateToProps = (state) => ({
    repos: state.profile.repos,
});
const connector = react_redux_1.connect(mapStateToProps, { getGithubRepos: profile_1.getGithubRepos });
exports.default = connector(ProfileGithub);
