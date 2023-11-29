import { useEffect, useState } from "react";
import { useFetch } from "./customHooks/useFetch";
import { BasicInput } from "./components/basicInput";
import { BasicButton } from "./components/basicButton";
import bgDark from "./assets/img/bg-dark.png"
import bgLight from "./assets/img/bg-light.png"
import axios from 'axios';
import "./App.css";


function App() {

  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=92cb706d92ce5ba5ac5f4b925add5bc4
  `
  const searchLocation = () => {
    axios.get(url).then(resp => {
      setWeatherData(resp)
    }).catch(error => {
      console.log(error)
    })
  }

  const handleInput = (e) => {
    setLocation(e.target.value)
  }

  console.log('weatherData: ', weatherData)
  
  let countryName, temperature, highest, lowest, dateTime, humidity, isCloud;
  if(weatherData){
    const { data } = weatherData;

    countryName = data.name;
    temperature = data.main.temp;
    highest = data.main.temp_max;
    lowest = data.main.temp_min;
    dateTime = data.timezone;
    humidity = data.main.humidity;
    isCloud = data.clouds.all ? true : false
  }

  return (
    <div className="containerDark">

        <div className="subContainer">

          <div className="search">
            <div className="inputContainer">
              <BasicInput 
                value={location}
                handleInput={handleInput}
                placeholder={"Country"}
              />
            </div>
            <div className="blankContainer"/>
            <div className="buttonContainer">
              <BasicButton 
                buttonText={"Search"} 
                handleOnClick={searchLocation}
              />
            </div>
            
          </div>

          <div className="displayContainer">
              <div className='top'>
                    <div className="topLeft">
                        <p>Today's Weather</p>
                        <div>
                            <h1>{temperature ? temperature + '°': '36°'}</h1>
                        </div>

                        <div className="infoSecondRowContainer">
                            <div className="highest">
                                <p> H:{highest ? highest + '°': '34°'}</p>
                            </div>

                            <div className="lowest">
                                <p> L:{lowest ? lowest + '°': '28°'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="topRight" />
              </div>

                <div className="infoThirdRowContainer">
                      <div className="location">
                          <p>{countryName ? countryName : 'Johor, MY'}</p>
                      </div>

                      <div>
                          <p>{dateTime ? dateTime : '01-09-2022 09:41am'}</p>
                      </div>

                      <div>
                          <p>Humidity:{humidity ? humidity : '58%'}</p>
                      </div>

                      <div>
                          <p>{isCloud ? 'Clouds' : 'none'}</p>
                      </div>
                </div>
      
              <div className='bottom'>
                  <p>Search History</p>
              </div>
          </div>
          
        </div>
        
    </div>
  )
}

export default App
