const imgURL = import.meta.env.VITE_IMAGE_URL;

const Country = ({ country, weather }) => {
  if (!country) {
    return null;
  }
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <ul>
        {Object.entries(country.languages).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.name.common} />
      <h2>Weather in {country.capital}</h2>
      <p>temperature: {weather?.main.temp} Celsius</p>
      <img
        src={`${imgURL}${weather?.weather[0].icon}@2x.png`}
        alt="image weather"
      />
      <p>wind: {weather?.wind.speed} m/s</p>
    </div>
  );
};
export default Country;
