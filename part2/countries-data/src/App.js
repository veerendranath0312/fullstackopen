import { useState, useEffect } from 'react';
import axios from 'axios';

import Countries from './components/Countries';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchStr, setSearchStr] = useState('');

  // useEffect hook: runs along with the first render
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data));
  }, []);

  const handleSearchStr = event => setSearchStr(event.target.value);

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchStr.toLowerCase())
  );

  return (
    <div>
      find countries &nbsp;
      <input type="text" value={searchStr} onChange={handleSearchStr} />
      <Countries
        filteredCountries={filteredCountries}
        setCountries={setCountries}
      />
    </div>
  );
};

export default App;
