import React from 'react';

const Country = props => {
  const { country } = props;
  console.log(country);
  console.log(Object.values(country.languages));

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
