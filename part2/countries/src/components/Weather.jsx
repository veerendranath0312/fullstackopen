function Weather(props) {
  const { weather, main, wind } = props.weatherData;
  return (
    <div className="weather-details">
      <h4>Weather in {props.name.common}</h4>
      <img
        src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
        alt=""
      />
      <p>
        Temperate - <span>{main.temp}</span> Celsius
      </p>
      <p>
        Wind - <span>{wind.speed}</span> m/s
      </p>
    </div>
  );
}

export default Weather;
