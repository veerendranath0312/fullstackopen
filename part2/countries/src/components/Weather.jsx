export default function Weather({ weatherData }) {
  console.log(weatherData)
  return (
    <>
      <h2>Weather in {weatherData.name}</h2>
      <p>Temperature: {weatherData.main.temp} Celcius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
      />
      <p>Wind: {weatherData.wind.speed} m/s</p>
    </>
  )
}
