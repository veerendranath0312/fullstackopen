import React from 'react'
import axios from 'axios'
import Weather from './Weather'

export default function Country({ country }) {
  const [weatherData, setWeatherData] = React.useState(null)

  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${apiKey}&units=metric`

  React.useEffect(() => {
    axios.get(url).then((response) => setWeatherData(response.data))
  }, [url])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h3>languages:</h3>
      <ul className="languages">
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common}'s flag`} />
      {weatherData && <Weather weatherData={weatherData} />}
    </div>
  )
}
