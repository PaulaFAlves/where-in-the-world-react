import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import '../../App.css';

import Content from '../../components/Content';

function Home() {

	const [darkMode, setDarkMode] = useState(getInitialMode());

	function getInitialMode() {
		const savedMode = JSON.parse(localStorage.getItem('dark'));

		return savedMode || false;
	}
	return (
	    <div>
			<Content />		
	    </div>
	);
}

export default Home;