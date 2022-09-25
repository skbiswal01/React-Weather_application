import React from 'react'
import "./FullReport.css";;
const FullReport = ({ weather,style }) => {
	var size = Object.keys(weather).length;
	if (size === 0) {
		return;
	} else {
		return (
			<div className='wrapper' style={{display:style?'flex':'none'}}>
				<div>
					<h4>City Name: {weather.name}</h4>
					<p>Temperature: {weather.main.temp} &deg;C</p>
					<p>Sunrise: {new Date((weather.sys.sunrise) * 1000).toLocaleTimeString('en-IN')}</p>
					<p>Sunset: {new Date((weather.sys.sunset) * 1000).toLocaleTimeString('en-IN')}</p>
					<p>Description: {weather.weather[0].description}</p>
					<p>Humidity: {weather.main.humidity} %</p>
				</div>
			</div>
		)
	}
}

export default FullReport