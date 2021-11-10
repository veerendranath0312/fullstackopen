import React from 'react';
import Country from './Country';

const Content = ({ countries, setCountries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (
    (countries.length > 1 && countries.length <= 10) ||
    countries.length === 0
  ) {
    return (
      <div>
        {countries.map(country => (
          <li key={country.name.official}>
            {country.name.common}{' '}
            <button onClick={() => setCountries([country])}>show</button>
          </li>
        ))}
      </div>
    );
  } else {
    return <Country country={countries[0]} />;
  }
};

export default Content;
