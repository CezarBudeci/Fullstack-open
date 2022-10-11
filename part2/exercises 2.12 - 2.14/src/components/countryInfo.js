import axios from "axios";
import { useEffect, useState } from "react";
import WeatherInfo from "./weatherInfo";

const CountryInfo = ({ country }) => {
    const [weather, setWeather] = useState(undefined);
    const [showWeatherError, setShowWeatherError] = useState(false);
    const apiKey = process.env.REACT_APP_API_KEY;
    
    useEffect(() => {
        getWeather(country);
    }, []);

    const getWeather = (countryObj) => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${countryObj.capitalInfo.latlng[0]}&lon=${countryObj.capitalInfo.latlng[1]}&appid=${apiKey}&units=metric`)
        .then(res => setWeather(res.data))
        .catch(err => setShowWeatherError(true))
    }
    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <p><b>languages:</b></p>
            <ul>
            {
                Object.keys(country.languages).map((key) => (
                    <li key = {key}>{country.languages[key]}</li>
                ))
            }
            </ul>
            <br/>
            <img src = {country.flags.svg} width = "200" alt = {"Flag of " + country.name.common} />
            {
                showWeatherError ?
                <p style={{color: 'red'}}>Weather info not available. Check API key.</p> :
                weather && (
                    <WeatherInfo capital = {country.capital} weather = {weather} />
                )
            }
        </div>
    )
}

export default CountryInfo;