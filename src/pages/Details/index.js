import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import '../../App.css';

import Detail from '../../components/Detail';

function Details() {
	const [darkMode, setDarkMode] = useState(getInitialMode());

	function getInitialMode() {
		const savedMode = JSON.parse(localStorage.getItem('dark'));

		return savedMode || false;
	}

	return (
	    <div>
			<Detail />		
	    </div>
	);
}

export default Details;