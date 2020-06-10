import React from 'react';
import { Route, HashRouter } from 'react-router-dom';

import Home from './pages/Home';
import Details from './pages/Details';

const Routes = () => {
	return (
		<HashRouter basename={process.env.PUBLIC_ULR}>
			<Route component={Home} path="/" exact />
			<Route component={Details} path="/details"/>
		</HashRouter>
	)
}

export default Routes;

