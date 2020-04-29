"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ProfileTop = ({ profile: { status, company, location, website, social, user }, }) => {
    return (<div className="profile-top bg-primary p-2">
			<img className="round-img my-1" src={user === null || user === void 0 ? void 0 : user.avatar} alt=""/>
			<h1 className="large">{user === null || user === void 0 ? void 0 : user.name}</h1>
			<p className="lead">
				{status} {company && <span> at {company} </span>}
			</p>
			<p>{location && <span>{location}</span>}</p>
			<div className="icons my-1">
				{website && (<a href={website} target="_blank" rel="noopener noreferrer">
						<i className="fas fa-globe fa-2x"></i>
					</a>)}

				{social && social.twitter && (<a href={social.twitter} target="_blank" rel="noopener noreferrer">
						<i className="fab fa-twitter fa-2x"></i>
					</a>)}

				{social && social.facebook && (<a href={social.facebook} target="_blank" rel="noopener noreferrer">
						<i className="fab fa-facebook fa-2x"></i>
					</a>)}
				{social && social.linkedin && (<a href={social.linkedin} target="_blank" rel="noopener noreferrer">
						<i className="fab fa-linkedin fa-2x"></i>
					</a>)}
				{social && social.youtube && (<a href={social.youtube} target="_blank" rel="noopener noreferrer">
						<i className="fab fa-youtube fa-2x"></i>
					</a>)}
				{social && social.instagram && (<a href={social.instagram} target="_blank" rel="noopener noreferrer">
						<i className="fab fa-instagram fa-2x"></i>
					</a>)}
			</div>
		</div>);
};
exports.default = ProfileTop;
