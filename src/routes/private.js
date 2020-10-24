import React, { useContext } from 'react';
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/auth";
import PrivateLayout from '../pages/private/layout';

function PrivateRoute ({ component: Component, ...rest }) {
	const { auth } = useContext(AuthContext);
	
	return (
		<Route {...rest} render={props =>
			auth.token ? (
				<PrivateLayout {...props}>
					<Component {...props} />
				</PrivateLayout>
			) : (
				<Redirect to="/" />
			)}
		/>
	);
};

export default PrivateRoute;
