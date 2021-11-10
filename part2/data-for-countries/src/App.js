import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Form from './components/Form';
import Content from './components/Content';

function App() {
  const [countries, setCountries] = useState([]);
  const [input, setInput] = useState('');

  // getting data from the endpoint using the useEffect hook and axios
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      setCountries(response.data);
    });
  }, []);

  const handleFilter = event => {
    setInput(event.target.value);

    if (input) {
      const filteredCountries = countries.filter(country => {
        const countryName = country.name.common;
        return countryName.toLowerCase().startsWith(event.target.value);
      });

      setCountries(filteredCountries);
    }
  };

  return (
    <div>
      <Form handleFilter={handleFilter} />
      <Content countries={input ? countries : []} setCountries={setCountries} />
    </div>
  );
}

export default App;
