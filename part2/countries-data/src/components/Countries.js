import React from 'react';
import Country from './Country';

const Countries = ({ filteredCountries }) => {
  if (filteredCountries.length === 1) {
    return (
      <div>
        <Country country={filteredCountries[0]} />
      </div>
    );
  } else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
    return (
      <div>
        {filteredCountries.map(country => (
          <p key={country.name.common}>{country.name.common}</p>
        ))}
      </div>
    );
  } else if (filteredCountries.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    );
  }
  return <div></div>;
};

export default Countries;
