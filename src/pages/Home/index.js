import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './styles.css';

function Home() {
	const [data, setData] = useState([]);
	const [darkMode, setDarkMode] = useState(getInitialMode());
	
	useEffect(() => {
		api.get('/').then(response => {
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
						onClick={() => setDarkMode(prevMode => !prevMode)}
						className="checkbox">{darkMode ? 'Light' : 'Dark'}
					</button>
				</div>
			</nav>
	    	<ul>
			{data.map((item, index) => (
				<li 
					key={index}
					>
					<p>{item.name}</p>
					<p>{item.flag}</p>
				</li>
				))}
	    	</ul>


	    </div>


	);
}

export default Home;