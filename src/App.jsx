import "./App.css";
import { useEffect, useState } from "react";
// import { useFetch } from "./customHooks/useFetch";
import SearchIcon from '@mui/icons-material/Search';

import bgDark from "./assets/img/bg-dark.png"
import bgLight from "./assets/img/bg-light.png"

import { getWeatherData } from "./api/getData";

import { BasicInput } from "./components/basicInput";
import { BasicButton } from "./components/basicButton";
import HistoryItem from "./components/historyItem/HistoryItem";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(null);
  const [historyList, setHistoryList] = useState([])
  const [notFound, setNotFound] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const initDataCall = (value) => {
    const getCurrentDateTime = (new Date).toLocaleString()
    if(value){
      getWeatherData(value).then(res => {
        const {data} = res
        setWeatherData(data)
        setDate(getCurrentDateTime)
      }).catch(error => {
        console.log('error: ', error)
      })
    }

    if(value == ''){
      setNotFound(true)
      setErrorMessage('Something went wrong')
    }
  }

  const searchLocation = (value) => {
    const getCurrentDateTime = (new Date).toLocaleString()
    if(value){
      getWeatherData(value).then(res => {
        const {data} = res
        setWeatherData(data)
        setDate(getCurrentDateTime)
        setNotFound(false)
        pushToHistoryList(res, getCurrentDateTime)
        console.log('api called')
      }).catch(error => {
        setNotFound(true)
        setErrorMessage('Not Found')
        console.log('error: ', error)
      })
    }

    if(value == ''){
      setNotFound(true)
      setErrorMessage('Please Enter City/Country')
    }
  }

  //initial location is spain
  useEffect(() => {
    initDataCall('spain')
  }, [])
  
  const pushToHistoryList = (res, getCurrentDateTime) => {
    const {data} = res
    let obj = {}
    obj["countryName"] = data.name
    obj["time"] = getCurrentDateTime
    const newHistoryList = [...historyList]
    newHistoryList.unshift(obj)
    setHistoryList(newHistoryList)
  }

  const deleteFromHistoryList = (index, list) => {
    if(list.length > -1){
      list.splice(index, 1)
      const newHistoryList = [...list]
      setHistoryList(newHistoryList)
    }
  }

  const handleInput = (e) => {
    setLocation(e.target.value)
  }
  
  let countryName, temperature, highest, lowest, humidity, isCloud;

  console.log(weatherData)
  if(weatherData){
    countryName = weatherData.name;
    temperature = weatherData.main.temp;
    highest = weatherData.main.temp_max;
    lowest = weatherData.main.temp_min;
    humidity = weatherData.main.humidity;
    isCloud = weatherData.clouds.all > 50 ? true : false
  }

  const darkPrimary = `rgba(26, 26, 26, 0.5)`
  const darkSecondary = `rgba(26, 26, 26, 0.3)`
  const darkButton = `rgba(40, 18, 77, 1)`
  const darkText = `rgba(255, 255, 255, 0.5)`

  return (
    <div className="containerDark">

        <div className="subContainer">

          <div className="searchContainer">
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
                buttonIcon={<SearchIcon sx={{fontSize: '1.5rem'}}/>}
                handleOnClick={searchLocation}
                value={location}
              />
            </div>
            
          </div>
          {
            notFound && 
            <div className="notFoundContainer">
                <p>{errorMessage}</p>
            </div>
          }

          <div className="displayContainer" style={{backgroundColor: darkSecondary}}>
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
                          <p>{date ? date : '01-09-2022 09:41am'}</p>
                      </div>

                      <div>
                          <p>Humidity:{humidity ? humidity + '%': '58%'}</p>
                      </div>

                      <div>
                          <p>{isCloud ? 'Clouds' : 'none'}</p>
                      </div>
                </div>
      
              <div className='bottom' style={{backgroundColor: darkSecondary}}>
                  <p>Search History</p>
                  <div className="historyItemWrapper">
                      {historyList && historyList.map((data, index) => {
                        return (
                          <div 
                            className="historyItemSubWrapper" 
                            style={{backgroundColor: darkButton}}
                            key={`${data.location}-${index}`}
                          >
                              <HistoryItem 
                                id={index}
                                location={data.countryName}
                                time={data.time}
                                handleSearch={searchLocation}
                                handleDelete={deleteFromHistoryList}
                                fullList={historyList}
                              />
                          </div>
                        )
                      })}

                      {historyList.length === 0 && <h1>No Record</h1>}
                  </div>
              </div>
          </div>
          
        </div>
        
    </div>
  )
}

export default App
