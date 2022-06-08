import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Country = props => {
  const { country } = props;
  const [weather, setWeather] = useState([]);

  // Getting weather data
  useEffect(() => {
    const capital = country.capital[0];
    const apiKey = process.env.REACT_APP_API_KEY;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}`
      )
      .then(response => setWeather([response.data]))
      .catch(err => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (weather.length > 0) {
    const weatherInfo = weather[0];
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <h3>languages:</h3>
        <ul>
          {Object.entries(country.languages).map(language => (
            <li key={language[0]}>{language[1]}</li>
          ))}
        </ul>
        <br />
        <img src={country.flags.png} alt="Country Flag" />

        <h2>Weather in {country.capital[0]}</h2>
        <p>temperature {(weatherInfo.main.temp - 273.15).toFixed(2)} Celcius</p>
        <img
          src={` http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
          alt={weatherInfo.weather[0].description}
        />
        <p>wind {weatherInfo.wind.speed} m/s </p>
      </div>
    );
  }

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.entries(country.languages).map(language => (
          <li key={language[0]}>{language[1]}</li>
        ))}
      </ul>
      <br />
      <img src={country.flags.png} alt="Country Flag" />
    </div>
  );
};

export default Country;
