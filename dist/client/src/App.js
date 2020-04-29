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
const react_router_dom_1 = require("react-router-dom");
require("./App.css");
const Navbar_1 = __importDefault(require("./components/layouts/Navbar"));
const Landing_1 = __importDefault(require("./components/layouts/Landing"));
const Login_1 = __importDefault(require("./components/auth/Login"));
const Register_1 = __importDefault(require("./components/auth/Register"));
const alert_1 = __importDefault(require("./components/layouts/alert"));
const dashboard_1 = __importDefault(require("./components/dashboard/dashboard"));
const react_redux_1 = require("react-redux");
const store_1 = __importDefault(require("./store"));
// import setAuthToken from './utils/setAuthToken';
const auth_1 = require("./actions/auth");
const privateRoute_1 = __importDefault(require("./components/routing/privateRoute"));
const setAuthToken_1 = __importDefault(require("./utils/setAuthToken"));
const CreateProfile_1 = __importDefault(require("./components/profile-forms/CreateProfile"));
const EditProfile_1 = __importDefault(require("./components/profile-forms/EditProfile"));
const AddExp_1 = __importDefault(require("./components/profile-forms/AddExp"));
const AddEdu_1 = __importDefault(require("./components/profile-forms/AddEdu"));
const Profiles_1 = __importDefault(require("./components/profiles/Profiles"));
const Profile_1 = __importDefault(require("./components/profile/Profile"));
const Posts_1 = __importDefault(require("./components/posts/Posts"));
if (localStorage.getItem('token')) {
    setAuthToken_1.default(localStorage.getItem('token'));
}
const App = () => {
    react_1.default.useEffect(() => {
        store_1.default.dispatch(auth_1.loadUser());
    }, []);
    return (<react_redux_1.Provider store={store_1.default}>
			<react_router_dom_1.BrowserRouter>
				<react_1.Fragment>
					<section className="mainContainer">
						<Navbar_1.default />
						<react_router_dom_1.Route exact path="/" component={Landing_1.default}/>
						<alert_1.default />
						<react_router_dom_1.Switch>
							<react_router_dom_1.Route exact path="/register" component={Register_1.default}/>
							<react_router_dom_1.Route exact path="/login" component={Login_1.default}/>
							<react_router_dom_1.Route exact path="/profiles" component={Profiles_1.default}/>
							<react_router_dom_1.Route exact path="/profiles/user/:id" component={Profile_1.default}/>
							<privateRoute_1.default exact path="/dashboard" component={dashboard_1.default}/>
							<privateRoute_1.default exact path="/create-profile" component={CreateProfile_1.default}/>
							<privateRoute_1.default exact path="/edit-profile" component={EditProfile_1.default}/>
							<privateRoute_1.default exact path="/add-experience" component={AddExp_1.default}/>
							<privateRoute_1.default exact path="/add-education" component={AddEdu_1.default}/>
							<privateRoute_1.default exact path="/posts" component={Posts_1.default}/>
						</react_router_dom_1.Switch>
					</section>
				</react_1.Fragment>
			</react_router_dom_1.BrowserRouter>
		</react_redux_1.Provider>);
};
exports.default = App;
