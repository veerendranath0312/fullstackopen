import Country from './Country'

function Countries({ countries, handleShowCountry }) {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (countries.length > 1 && countries.length <= 10) {
    return (
      <ul className="country-names">
        {countries.map((country) => (
          <li key={country.name.common}>
            {country.name.common}&nbsp;
            <button onClick={() => handleShowCountry(country)}>show</button>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <>
      {countries.length === 0 ? (
        'No countries with that name. Try searching a different one.'
      ) : (
        <Country country={countries[0]} />
      )}
    </>
  )
}

export default Countries
