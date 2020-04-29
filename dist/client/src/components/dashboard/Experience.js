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
const react_moment_1 = __importDefault(require("react-moment"));
const profile_1 = require("../../actions/profile");
const react_redux_1 = require("react-redux");
const Experience = ({ experience, deleteExperience }) => {
    const experiences = experience === null || experience === void 0 ? void 0 : experience.map((experience) => {
        // const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        // 	e.preventDefault();
        // 	deleteExperience(experience._id!);
        // };
        return (<tr key={experience._id}>
				<td>{experience.company}</td>
				<td className="hide-sm">{experience.company}</td>
				<td>
					<react_moment_1.default format="YYYY/MM/DD">{experience.from}</react_moment_1.default> -{' '}
					{experience.to === null ? (' Now') : (<react_moment_1.default format="YYYY/MM/DD">{experience.to}</react_moment_1.default>)}
				</td>
				<td>
					<button className="btn btn-danger" onClick={() => deleteExperience(experience._id)}>
						Delete
					</button>
				</td>
			</tr>);
    });
    return (<react_1.Fragment>
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
		</react_1.Fragment>);
};
const connector = react_redux_1.connect(null, { deleteExperience: profile_1.deleteExperience });
exports.default = connector(Experience);
