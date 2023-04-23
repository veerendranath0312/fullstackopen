import React from "react";
import axios from "axios";
import Form from "./components/Form";
import Countries from "./components/Countries";
import "./App.css";

function App() {
  const [value, setValue] = React.useState("");
  const [countries, setCountries] = React.useState([]);
  const [filteredCountries, setFilteredCountries] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setCountries(res.data));
  }, []);

  function handleChange(event) {
    setValue(event.target.value);
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCountries(filtered);
  }

  return (
    <>
      <h2>Search Countries</h2>
      <Form value={value} handleChange={handleChange} />

      {filteredCountries.length > 0 && (
        <Countries
          countries={filteredCountries}
          value={value}
          setFilteredCountries={setFilteredCountries}
        />
      )}
    </>
  );
}

export default App;
