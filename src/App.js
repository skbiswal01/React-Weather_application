
import {useEffect, useState} from 'react';
import './App.css';
import FullReport from './components/FullReport';
function App() {

  const [weather, setWeather] = useState({});
  const [locations, setLocations] = useState("london");
  const [photos, setPhotos] = useState([]);
  const [visivle , setvisible] = useState(false);
  const [sevenday , setSeveay] = useState([]);

  const ifClicked = () => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${locations}&APPID=ac6927365e60797d60eefdf57ff960e2&units=metric`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          if (res.status === 404) {
            return alert("Oops, there seems to be an error!(wrong location)");
          }
          alert("Oops, there seems to be an error!");
          throw new Error("You have an error");
        }
      })
      .then((object) => {
        setWeather(object);
      })
      .catch((error) => console.log(error));
    fetch(
      `https://api.unsplash.com/search/photos?query=${locations}&client_id=HIDukKcoNLFlOCTZ6xhJnRcf4D1rXaLQhw-FMElI_HY`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("You made a mistake");
        }
      })
      .then((data) => {
        setPhotos(data?.results[0]?.urls?.raw);
      })
      .catch((error) => console.log(error));
  }
    
  useEffect(() => {
    ifClicked();
}, []);
useEffect(() => {
	var size = Object.keys(weather).length;
	if(size){
		async function getsevenDay(){
			const data = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${weather.coord.lat}&lon=${weather.coord.lon}&units=metric&exclude=current,minutely,hourly,alerts&appid=171d71eba201f63fa475687a2213c2ae`);
			const res = await data.json()
			setSeveay(res.daily);
		}
		getsevenDay();
	}
}, [weather]);
console.log(sevenday);
  return (
    <>
    <div className="app">
      <div className="wrapper">
        <div className="search">
          <input
            type="text"
            value={locations}
            onChange={(e) => setLocations(e.target.value)}
            placeholder="Enter location"
            className="location_input"
          />
          <button className="location_searcher" onClick={ifClicked}>
            Search Location
          </button>
        </div>
        <div className="app__data">
          <p className="temp">Current Temparature: {weather?.main?.temp}</p>
        </div>
        <img className="app__image" src={photos} alt="" />
      </div>
      <button className="location_searcher" style={{margin: "10px"}} onClick={()=>{setvisible(!visivle)}}>
          {visivle?'Hide Details': 'Get full details'}
       </button>
       
    </div>
    <FullReport  weather={weather} style={visivle}/>
    </>
  );
}

export default App;
