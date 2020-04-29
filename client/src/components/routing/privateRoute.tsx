import React from 'react';
import { RootState } from '../../reducers';
import { connect, ConnectedProps } from 'react-redux';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';

interface IPrivateRoute extends propsFromRedux, RouteProps {
	component: React.ComponentType<RouteComponentProps<any>>;
}

const privateRoute: React.FC<IPrivateRoute> = ({ component: Component, auth, ...rest }) => (
	<Route
		{...rest}
		render={(props: RouteComponentProps) =>
			!auth.isAuthenticated && !auth.loading ? (
				<Redirect to="/login" />
			) : (
				<Component {...props} />
			)
		}
	/>
);

const mapStateToProps = (state: RootState) => ({
	auth: state.auth,
});

const connector = connect(mapStateToProps);
type propsFromRedux = ConnectedProps<typeof connector>;

export default connector(privateRoute);
