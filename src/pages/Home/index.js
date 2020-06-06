import React, { useEffect, useState } from 'react';
import { IconName } from 'react-icons/wi'
import api from '../../services/api';
import './styles.css';

import Content from '../../components/Content';

function Home() {
	const [data, setData] = useState([]);
	const [darkMode, setDarkMode] = useState(getInitialMode());
	
	useEffect(() => {
		api.get('/all').then(response => {
			setData(response.data)
			console.log(response.data) 
		})
	}, []);

	useEffect(() => {
		localStorage.setItem('dark', JSON.stringify(darkMode));
	}, [darkMode]);

	function getInitialMode() {
		const savedMode = JSON.parse(localStorage.getItem('dark'));

		return savedMode || false;
	}



	return (
	    <div className={darkMode ? "dark-mode" : "light-mode"}>
			<nav className="navbar">
				<div className="title">
					<h1>Where in the world?</h1>
				</div>
				<div className="change-mode">
					<button
						className="change-mode-button"
						onClick={() => setDarkMode(prevMode => !prevMode)}
					>
					{darkMode ? 'Light Mode' : 'Dark Mode'}
					</button>
				</div>
			</nav>
			<div className="options">
				<input type="text" className="options-country" placeholder="Search for a country..." />
				<input type="text" placeholder="Filter by Region" />
			</div>

			<Content />
		





	    </div>


	);
}

export default Home;