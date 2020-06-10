import React from 'react';
import { Route, HashRouter, Redirect } from 'react-router-dom';

import Home from './pages/Home';
import Details from './pages/Details';

const Routes = () => {
	return (
		<HashRouter>
			
			<Route component={Home} path="/" exact />
			<Route component={Details} path="/details" exact/>
			
		</HashRouter>
	)
}

export default Routes;

