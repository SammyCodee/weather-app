import axios from 'axios';
import {API_KEY} from "../utils/apiKey";

const url = `https://api.openweathermap.org/data/2.5/weather`

export const getWeatherData = async(location) => {
    const data = await axios.get(`${url}?q=${location}&units=metric&appid=${API_KEY}`)
    return data
}