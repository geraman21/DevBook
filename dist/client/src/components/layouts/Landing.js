"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const Landing = (props) => {
    if (props.isAuthenticated) {
        return <react_router_dom_1.Redirect to="/dashboard"/>;
    }
    return (<section className="landing">
			<div className="dark-overlay">
				<div className="landing-inner">
					<h1 className="x-large">Developer Connector</h1>
					<p className="lead">
						Create a developer profile/portfolio, share posts and get help from other
						developers
					</p>
					<div className="buttons">
						<react_router_dom_1.Link to="/register" className="btn btn-primary">
							Sign Up
						</react_router_dom_1.Link>
						<react_router_dom_1.Link to="/login" className="btn btn-light">
							Login
						</react_router_dom_1.Link>
					</div>
				</div>
			</div>
		</section>);
};
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});
const connector = react_redux_1.connect(mapStateToProps);
exports.default = connector(Landing);
