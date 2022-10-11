const WeatherInfo = ({ capital, weather }) => {
    return (
        <div>
            <h2>Weather in {capital}</h2>
            <p>temperature {weather.main.temp} Celsius</p>
            <img src = {"http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png"} width = "100" alt = {"Image describing current weather in " + capital} />
            <p>wind {weather.wind.speed} m/s</p>
        </div>
    )
}

export default WeatherInfo;