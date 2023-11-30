import axios from 'axios';

const apiURL = import.meta.env.VITE_REACT_APP_API_BASE_URL
const key = import.meta.env.VITE_REACT_APP_API_TOKEN_DEV
const url = `${apiURL}/data/2.5/weather`

export const getWeatherData = async(location) => {
    const data = await axios.get(`${url}?q=${location}&units=metric&appid=${key}`)
    return data
}