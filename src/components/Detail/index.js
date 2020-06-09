import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import '../../App.css';

function Detail() {
	const [data, setData] = useState([]);
	const [dataAll, setDataAll] = useState([]);
	const [border, setBorder] = useState('');
	const [darkMode, setDarkMode] = useState(getInitialMode());
	const [initial, setInitial] = useState([]);

	useEffect(() => {
		if (border === '') {
		api.get('/')
			.then(response => {
				const country = response.data.filter(country => {
					return country.name === localStorage.getItem('name')
				})
				setData(country)
			})	
		}	
		if (border !== '') {
		api.get('/')
			.then(response => {
				const country = response.data.filter(country => {
					return country.alpha3Code === border;
				});
				setData(country);
			})
		}

	}, [border]);

	function handleChoosenCountry(name) {
		localStorage.setItem('name', name)
	}

	function getInitialMode() {
		const savedMode = JSON.parse(localStorage.getItem('dark'));
		return savedMode || false;
	}

	function handleInitials(borders) {
		api.get('/')
			.then(response => {
				const initials = response.data;
				setInitial(initials)
			})
	}
	
	// console.log(data)
	// console.log(dataAll)
	// console.log(border)
	console.log(initial)

	
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
			<button className="detail-button-back"><a href="/">Back</a></button>
			<div className="detail-main-content">
				<ul className="detail-content">
					{data.map((item, index) => (
						<li key={index} className="detail-row">
							<img src={item.flag} />
							<div className="detail-text">
									<div>
										<h2><strong>{item.name}</strong></h2>
									</div>
								<div className="detail-text-sub">
									<div className="detail-text-row">
										<p><strong>Native Name:</strong> {item.nativeName}</p>
										<p><strong>Population:</strong> {item.population}</p>
										<p><strong>Region:</strong> {item.region}</p>
										<p><strong>Sub Region:</strong> {item.subregion}</p>
										<p><strong>Capital:</strong> {item.capital}</p>
									</div>
									<div className="detail-text-row">
										<p><strong>Top Level Domain:</strong>{item.topLevelDomain.map(item => ' ' + item)}</p>
										<p><strong>Currencies:</strong>{item.currencies.map(item => ' ' + item.name)}</p>
										<p><strong>Languages:</strong></p>
									</div>
								</div>
									<div>
										<p className="detail-text-border"><strong>Border Countries:</strong></p>
										<div className="detail-border-buttons">
										{item.borders.map(item => 
											<button value={item} key={item} onClick={(e) => {setBorder(e.target.value)}}>{item}</button>
										)}
										</div>
									</div>
							</div>
						</li>
					))}
		    	</ul>
			</div>
		</div>
	);
}

export default Detail;

