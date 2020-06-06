import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

import Details from '../../components/Details';

function Content() {
	const [data, setData] = useState([]);

	useEffect(() => {
		api.get('/').then(response => {
			setData(response.data)
			console.log(response.data)
		})
	}, []);

	function handleChoosenCountry(name) {
		localStorage.setItem('name', name)
	}

	return(
		<div className="main-content">
			<ul>
				<div className="content">
				{data.map((item, index) => (
					<li 
						key={index}
						>
							<img src={item.flag} />
							<div className="content-text">
								<Link to='/details'>
									<h2
										onClick={() => handleChoosenCountry(item.name)}
									>{item.name}</h2>
								</Link>
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