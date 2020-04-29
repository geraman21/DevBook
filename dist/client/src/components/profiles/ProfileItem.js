"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const ProfileItem = ({ profile: { user, status, company, location, skills }, }) => {
    return (<div className="profile bg-light">
			<img src={user === null || user === void 0 ? void 0 : user.avatar} alt="" className="round-img"/>
			<div>
				<h2>{user === null || user === void 0 ? void 0 : user.name}</h2>
				<p>
					{status} {company && <span> at {company}</span>}
				</p>
				<p className="my-1"> {location && <span>{location}</span>} </p>
				<react_router_dom_1.Link to={`/profiles/user/${user === null || user === void 0 ? void 0 : user._id}`} className="btn btn-primary">
					View Profile
				</react_router_dom_1.Link>
			</div>
			<ul>
				{skills &&
        skills.slice(0, 4).map((skill, index) => (<li key={index} className="text-primary">
							<i className="fas fa-check"></i> {skill}
						</li>))}
			</ul>
		</div>);
};
exports.default = ProfileItem;
