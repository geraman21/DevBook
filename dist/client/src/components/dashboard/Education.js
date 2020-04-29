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
const react_redux_1 = require("react-redux");
const profile_1 = require("../../actions/profile");
const Education = ({ education, deleteEducation }) => {
    const educations = education === null || education === void 0 ? void 0 : education.map((education) => {
        return (<tr key={education._id}>
				<td>{education.school}</td>
				<td className="hide-sm">{education.degree}</td>
				<td>
					<react_moment_1.default format="YYYY/MM/DD">{education.from}</react_moment_1.default> -{' '}
					{education.to === null ? (' Now') : (<react_moment_1.default format="YYYY/MM/DD">{education.to}</react_moment_1.default>)}
				</td>
				<td>
					<button onClick={() => deleteEducation(education._id)} className="btn btn-danger">
						Delete
					</button>
				</td>
			</tr>);
    });
    return (<react_1.Fragment>
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
		</react_1.Fragment>);
};
const connector = react_redux_1.connect(null, { deleteEducation: profile_1.deleteEducation });
exports.default = connector(Education);
