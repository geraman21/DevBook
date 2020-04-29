"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_moment_1 = __importDefault(require("react-moment"));
const ProfileExperience = ({ experience: { company, title, location, current, to, from, description }, }) => {
    return (<div>
			<h3 className="text-dark">
				{company} {location}
			</h3>

			<p>
				<react_moment_1.default format="YYYY/MM/DD">{from}</react_moment_1.default> -{' '}
				{current ? ' Now' : <react_moment_1.default format="YYYY/MMYDD">{to}</react_moment_1.default>}
			</p>
			<p>
				<strong>Position </strong> {title}
			</p>
			<p>
				<strong>Description </strong> {description}
			</p>
		</div>);
};
exports.default = ProfileExperience;
