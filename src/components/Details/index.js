import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';

import Home from '../../pages/Home';

function Details() {
	const [data, setData] = useState([]);
	const [darkMode, setDarkMode] = useState(getInitialMode());

	useEffect(() => {
		const name = localStorage.getItem('name')
		api.get(`/name/${name}`).then(response => {
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


	return(
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
			<Link to="/">
				<FiArrowLeft />
				Voltar para home
			</Link>
			<div className="main-content">
			<ul>
				<div className="content">
				{data.map((item, index) => (
					<li 
						key={index}
						>
							<img src={item.flag} />
							<div className="content-text">
								<h2>{item.name}</h2>
								<p>Population: {item.population}</p>
								<p>Region: {item.region}</p>
								<p>Capital: {item.capital}</p>
							</div>
					</li>
				))}
				</div>
	    	</ul>
		</div>

		
		





	    </div>
	);
}

export default Details;