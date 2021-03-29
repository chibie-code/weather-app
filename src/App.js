import 'cirrus-ui'; 
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {

  const sunny = 'https://images.pexels.com/photos/131723/pexels-photo-131723.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
  const fog = 'https://images.pexels.com/photos/4827/nature-forest-trees-fog.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
  const snow = 'https://images.pexels.com/photos/2440024/pexels-photo-2440024.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';

  // sunny url: https://images.pexels.com/photos/131723/pexels-photo-131723.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940
  // fog url: https://images.pexels.com/photos/4827/nature-forest-trees-fog.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940
  // snow url: https://images.pexels.com/photos/2440024/pexels-photo-2440024.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  // const [temp, setTemp] = useState(undefined);

  useEffect(()=>{
    transitionBg(undefined);
  }, []);

  const api = {
    key: "4a540ab612ffc870375380490defa2c6",
    base: "https://api.openweathermap.org/data/2.5/"
  }

  const search = (e) => {
    if(e.key === 'Enter'){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res=>res.json())
      .then(result=>{
        // console.log('result', result);
        transitionBg(result.main.temp);
        // (typeof result !== 'undefined')?setTemp(result.main.temp):setTemp(null);
        setWeather(result);
        setQuery('');
      })
      .catch(err => {
        // console.log(err);
        if(err instanceof TypeError){
          // console.log('result: ',null);
          console.log('Error is a type error');
        }
        if(err.cod === '400' || err.cod === '404'){
          console.log('404 | 400');
        }
        console.log('Error:',err);
      });
    }
  }

  const dateBuilder = (d) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day} ${date} ${month}, ${year}`;
  }

  const transitionBg = (temp) => {

    console.log(temp);
    console.log('type: ',typeof temp);

    if(temp > 16){
      document.getElementById('sunny').style.opacity = 1;
      document.getElementById('snow').style.opacity = 0;
      document.getElementById('fog').style.opacity = 0;
      document.documentElement.style.cssText = `
        --bg-img: url(${sunny});`;
    }
    else if(temp <= 16){
      document.getElementById('sunny').style.opacity = 0;
      document.getElementById('snow').style.opacity = 1;
      document.getElementById('fog').style.opacity = 0;
      document.documentElement.style.cssText = `
        --bg-img: url(${snow});`;
    }
    else{
      document.getElementById('sunny').style.opacity = 0;
      document.getElementById('snow').style.opacity = 0;
      document.getElementById('fog').style.opacity = 1;
      document.documentElement.style.cssText = `
        --bg-img: url(${fog});`;
    }
  }

  /*
  (typeof weather.main !== 'undefined')?((weather.main.temp > 16)?
          <img className="img-stretch image" id="sunny" src={sunny}/>:
          <img className="img-stretch image" id="snow" src={snow}/>
          ):
          <img className="img-stretch image" id="fog" src={fog}/>
  */
  
  return (
    <div className="App section bg-orange-200">
      <main className="main u-flex u-flex-column u-items-center u-justify-flex-center">
        <div className="Ncard">

          <div className="card_container">
            <div className="form-group mx-4 my-2 input-container">
              <input type="search" className="form-group-input" placeholder="Search"
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}/>
              <button className="form-group-btn">Go</button>
            </div>
              {(typeof weather.main !== 'undefined')?
              (
              <div className="info-display text-dark">
              <div className="card-title-container weather-box">
                <h1 className={`title_ uppercase temp ${(weather.main.temp > 16)?'text-light':'text-light'}`}>{Math.round(weather.main.temp)}°C</h1>
                <p className={`subtitle_ weather ${(weather.main.temp > 16)?'text-light':'text-light'}`}>{weather.weather[0].main}
                {" "}
                {(weather.weather[0].main === 'Clouds')&&<i className="fas fa-cloud-sun"></i>}
                {(weather.weather[0].main === 'Clear')&&<i className="fas fa-sun"></i>}
                {(weather.weather[0].main === 'Rain')&&<i className="fas fa-cloud-sun-rain"></i>}
                
                
                
                </p>
              </div>
                <div className="content text-light u-round">
                  <h6 className="font-alt location">{weather.name}, {weather.sys.country}</h6>
                  <p className="date">{dateBuilder(new Date())}</p>
                </div>
              </div>
              ): ('')}
          </div>
          
          <div className="images-container">
            <div className="images">
              <img className="img" alt='' id="sunny" src={sunny}/>
              <img className="img" alt='' id="snow" src={snow}/>
              <img className="img" alt='' id="fog" src={fog}/>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;
