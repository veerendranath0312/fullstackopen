import React from "react";
import axios from "axios";
import Weather from "./Weather";

function Country(props) {
  const [weatherData, setWeatherData] = React.useState(null);
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const {
    name,
    capital,
    flags,
    area,
    languages: languagesObj,
    latlng,
  } = props.country;
  const languages = Object.values(languagesObj);

  React.useEffect(() => {
    // By default openweathermap gives temperature in Kelvin
    // To convert that to Celsius, we need to add '&units=metric' parameter to the api
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${apiKey}&units=metric`
      )
      .then((res) => setWeatherData(res.data));
  }, []);

  return (
    <>
      <div className="country">
        <div>
          <img className="country-flag" src={flags.png} />
        </div>
        <div className="country-details">
          <h2>{name.common}</h2>
          <p className="country-capital">Capital: {capital[0]}</p>
          <p className="country-area">Area: {area}</p>
          <h4>Languages</h4>
          <ul className="country-languages">
            {languages.map((lang, i) => (
              <li key={i}>{lang}</li>
            ))}
          </ul>
        </div>
      </div>
      {weatherData && <Weather name={name} weatherData={weatherData} />}
    </>
  );
}

export default Country;
