function Country(props) {
  const { name, capital, flags, area, languages: languagesObj } = props.country;

  const languages = Object.values(languagesObj);

  return (
    <div className="country">
      <div>
        <img className="country-flag" src={flags.png} />
      </div>
      <div className="country-details">
        <h2>{name.common}</h2>
        <p className="country-capital">Capital: {capital[0]}</p>
        <p className="country-area">Area: {area}</p>
        <h4>Languages</h4>
        <ul className="country-languages">
          {languages.map((lang, i) => (
            <li key={i}>{lang}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Country;
