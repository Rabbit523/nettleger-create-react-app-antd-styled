import React from 'react'
import { Route } from 'react-router'

function PublicRoute ({ component: Component, ...rest }) {
	return (
		<Route {...rest} render={props => (
			<Component {...props} />
		)}
		/>
	);
};

export default PublicRoute;
