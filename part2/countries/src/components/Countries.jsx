import Country from "./Country";

function Countries(props) {
  const { countries, value } = props;

  if (value.length === 0) {
    return null;
  }

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countries.length > 1 && countries.length <= 10) {
    return (
      <>
        {countries.map((country) => (
          <p key={country.ccn3}>{country.name.common}</p>
        ))}
      </>
    );
  }

  return (
    <>
      <Country country={countries[0]} />
    </>
  );
}

export default Countries;
