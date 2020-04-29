"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
function DashboardActions() {
    return (<div className="dash-buttons">
			<react_router_dom_1.Link to="/edit-profile" className="btn btn-light">
				<i className="fas fa-user-circle text-primary"></i> Edit Profile
			</react_router_dom_1.Link>
			<react_router_dom_1.Link to="/add-experience" className="btn btn-light">
				<i className="fab fa-black-tie text-primary"></i> Add Experience
			</react_router_dom_1.Link>
			<react_router_dom_1.Link to="/add-education" className="btn btn-light">
				<i className="fas fa-graduation-cap text-primary"></i> Add Education
			</react_router_dom_1.Link>
		</div>);
}
exports.default = DashboardActions;
