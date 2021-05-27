import { useState, useEffect } from "react";
import axios from "axios";

function App() {
	const hours = new Date().toLocaleTimeString();
	

	const [time, setTime] = useState();

	setTimeout(() => {
		setTime(hours);
	}, 1000);

	const [search, setSearch] = useState("");
	const [temp, setTemp] = useState("");
	const [condition, setCondition] = useState("");
	const [city, setCity] = useState("");
	const [country, setCountry] = useState("");
	const [far, setFar] = useState("");

	

	
	useEffect(() => {
		const API_KEY=process.env.REACT_APP_API_KEY
		
		async function getData() {
			const res = await axios.get(
				`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${search}`
			);
			console.log(res.data.current.temp_f);
			setTemp(res.data.current.temp_c);
			setCondition(res.data.current.condition.text);
      setCity(res.data.location.name);
      setCountry(res.data.location.country);
      setFar(res.data.current.temp_f);
		}
		getData();
	});

 

	const update = (e) => {
		setSearch(e.target.value);
	};

	return (
		<div
			className={
				typeof temp != "undefined"
					? temp > 16
						? "app warm"
						: "app"
					: "app"
			}
		>
			<div className="search-box">
				<input
					className="search-bar"
					onChange={update}
					type="text"
					placeholder="search weather"
				/>
			</div>
      {( search !== "") ? (
      <div>
			<div className="weather-details">
				<div className="date">{time}</div>
        
				<div className="weather">
					<h2 >  
                   {temp} &#176;c  </h2>
                   <h2>{far} &#176;f</h2>
					<h3>{condition}</h3>
          <h3>{city}</h3>
          <h4>{country}</h4>
				</div>
        


			</div>
      
      </div>
      ) : ('')}

      
		</div>
	);
}

export default App;
