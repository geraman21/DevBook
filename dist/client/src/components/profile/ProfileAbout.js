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
const ProfileAbout = ({ profile: { bio, skills, user } }) => {
    return (<div className="profile-about bg-light p-2">
			{bio && (<react_1.Fragment>
					<h2 className="text-primary">{user === null || user === void 0 ? void 0 : user.name.trim().split(' ')[0]}'s Bio</h2>
					<p>{bio}</p>
					<div className="line"></div>
				</react_1.Fragment>)}

			<h2 className="text-primary">Skill Set</h2>
			<div className="skills">
				{skills === null || skills === void 0 ? void 0 : skills.map((skill, index) => (<div className="p-1" key={index}>
						<i className="fas fa-check"></i> {skill}
					</div>))}
			</div>
		</div>);
};
exports.default = ProfileAbout;
