import React from 'react'
import axios from 'axios'
import Countries from './components/Countries'

function App() {
  const [countries, setCountries] = React.useState([])
  const [countryName, setCountryName] = React.useState('')
  const [selectedCountry, setSelectedCountry] = React.useState(null)

  React.useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => setCountries(response.data))
  }, [])

  // Function to handle changes in the country input field
  const handleCountryChange = (event) => {
    // Reset the selected country to null
    setSelectedCountry(null)
    // Update the country name state with the input value
    setCountryName(event.target.value)
  }

  // Determine the list of countries to display
  // If a country is selected, display only that country
  // Otherwise, filter the countries based on the input value
  const filteredCountries = selectedCountry
    ? [selectedCountry]
    : countries.filter((country) =>
        country.name.common.toLowerCase().includes(countryName.toLowerCase())
      )

  // Function to handle the action of showing a specific country
  // Set the selected country to the specified country
  const handleShowCountry = (country) => {
    setSelectedCountry(country)
  }

  return (
    <>
      <h1>Data for countries</h1>
      <form>
        <label htmlFor="filter">Find countries</label> &nbsp;
        <input
          type="text"
          id="filter"
          value={countryName}
          onChange={handleCountryChange}
        />
      </form>
      {countryName && (
        <Countries
          countries={filteredCountries}
          handleShowCountry={handleShowCountry}
        />
      )}
    </>
  )
}

export default App
