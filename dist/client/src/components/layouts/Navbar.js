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
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const auth_1 = require("../../actions/auth");
const Navbar = (props) => {
    const authLinks = (<ul>
			<li>
				<react_router_dom_1.Link to="/profiles">Developers</react_router_dom_1.Link>
			</li>
			<li>
				<react_router_dom_1.Link to="/posts">Posts</react_router_dom_1.Link>
			</li>
			<li>
				<react_router_dom_1.Link to="/dashboard">
					<i className="fa fa-user"/> <span className="hide-sm">Dashboard</span>
				</react_router_dom_1.Link>
			</li>
			<li>
				<react_router_dom_1.Link to="/dashboard" onClick={props.logout}>
					<i className="fas fa-sign-out-alt"/> <span className="hide-sm">Logout</span>
				</react_router_dom_1.Link>
			</li>
		</ul>);
    const guestLinls = (<ul>
			<li>
				<react_router_dom_1.Link to="/profiles">Developers</react_router_dom_1.Link>
			</li>
			<li>
				<react_router_dom_1.Link to="/register">Register</react_router_dom_1.Link>
			</li>
			<li>
				<react_router_dom_1.Link to="/login">Login</react_router_dom_1.Link>
			</li>
		</ul>);
    return (<nav className="navbar bg-dark">
			<h1 style={{ fontSize: '2em' }}>
				<react_router_dom_1.Link to="/">
					<i className="fas fa-code"></i> DevConnector
				</react_router_dom_1.Link>
			</h1>
			{!props.auth.loading && (<react_1.Fragment>{props.auth.isAuthenticated ? authLinks : guestLinls}</react_1.Fragment>)}
		</nav>);
};
const mapStateToProps = (state) => ({
    auth: state.auth,
});
const connector = react_redux_1.connect(mapStateToProps, { logout: auth_1.logout });
exports.default = connector(Navbar);
