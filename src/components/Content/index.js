import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import '../../App.css';

function Content() {
	const [data, setData] = useState([]);
	const [countryFiltered, setCountryFilterer] = useState('');
	const [regionFiltered, setRegionFilterer] = useState('');
	const [darkMode, setDarkMode] = useState(getInitialMode());



	useEffect(() => {
		api.get('/')
			.then(response => {
				const country = response.data;
				setData(country)
			})
	}, []);

	// useEffect(() => {

	// 	api.get('/')
	// 		.then(response => {
	// 			const country = response.data.filter(country => {
	// 				return country.region === regionFiltered
	// 			})
	// 			setData(country)

	// 		})
	// }, [regionFiltered]);

	function handleChoosenCountry(name) {
		localStorage.setItem('name', name)
	}

	async function filterCountry(e) {
		const country = await e.target.value;
	}
	console.log(data)
	console.log(regionFiltered)

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
			<div className="options">
				<input type="text" className="options-country" placeholder="Search for a country..." value={countryFiltered} onChange={e =>setCountryFilterer(e.target.value)}/>
				<select 
					placeholder="Filter by Region" 
					value={regionFiltered}
					type="text" 
					onChange={e =>setRegionFilterer(e.target.value)}>
					<option value=''>Filter by Region...</option>
					<option value="Africa">Africa</option>
					<option value="Asia">Asia</option>
					<option value="South America">South America</option>
					<option value="North America">North America</option>
					<option value="Europe">Europe</option>
					<option value="Oceania">Oceania</option>
				</select>
			</div>
			<ul>
				<div className="main-content">
				{data.map((item, index) => (
					<li 
						key={index}
						>
							<img src={item.flag} />
							<div className="content-text">
								<a href='/details'>
									<h2
										className="content-name"
										onClick={() => handleChoosenCountry(item.name)}
									>{item.name}</h2>
								</a>
								<p>Population: {item.population}</p>
								<p>Region: {item.region}</p>
								<p>Capital: {item.capital}</p>
							</div>
					</li>
				))}
				</div>
	    	</ul>
		</div>
	);
}

export default Content;

