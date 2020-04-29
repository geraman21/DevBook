import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layouts/alert';
import Dashboard from './components/dashboard/dashboard';
import { Provider } from 'react-redux';
import store from './store';
// import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from './reducers';
import PrivateRoute from './components/routing/privateRoute';
import setAuthToken from './utils/setAuthToken';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExp from './components/profile-forms/AddExp';
import AddEdu from './components/profile-forms/AddEdu';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
if (localStorage.getItem('token')) {
	setAuthToken(localStorage.getItem('token')!);
}

const App = () => {
	React.useEffect(() => {
		(store.dispatch as ThunkDispatch<RootState, null, Action<string>>)(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<section className="mainContainer">
						<Navbar />
						<Route exact path="/" component={Landing} />
						<Alert />
						<Switch>
							<Route exact path="/register" component={Register} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/profiles" component={Profiles} />
							<Route exact path="/profiles/user/:id" component={Profile} />
							<PrivateRoute exact path="/dashboard" component={Dashboard} />
							<PrivateRoute exact path="/create-profile" component={CreateProfile} />
							<PrivateRoute exact path="/edit-profile" component={EditProfile} />
							<PrivateRoute exact path="/add-experience" component={AddExp} />
							<PrivateRoute exact path="/add-education" component={AddEdu} />
							<PrivateRoute exact path="/posts" component={Posts} />
							<PrivateRoute exact path="/posts/:id" component={Post} />
						</Switch>
					</section>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
