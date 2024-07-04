import React, { useEffect, useState } from "react";
import countriesService from "./services/contries";
import Country from "./components/Country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [value, setValue] = useState("");
  const [currency, setCurrency] = useState(null);
  const [message, setMessage] = useState(null);
  const [country, setCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  const handleSearch = (e) => {
    setValue(e.target.value);
  };

  const search = () => {
    const filter = countries.filter((country) =>
      country.name.common.toLowerCase().includes(value.toLowerCase()),
    );
    const uniqueCountry = countries.find(
      (country) => country.name.common.toLowerCase() === value.toLowerCase(),
    );
    if (uniqueCountry) {
      return handleShow(uniqueCountry);
    }

    setCountry(null);
    if (filter.length > 100) {
      setMessage("Too many matches, specify another filter");
      setCurrency(null);
      setTimeout(() => {
        setMessage(null);
      }, 4000);
    } else if (filter.length > 1 && filter.length <= 10) {
      setCurrency(filter);
    }
  };
  useEffect(() => {
    countriesService.getAllOne("all").then((data) => {
      setCountries(data);
    });
    if (value) {
      search();
    }
  }, [value]);
  const handleShow = (country) => {
    setCountry(country);
    setWeather(null);
    getWeatherCountry(country.capital);
    setCurrency(null);
  };
  const getWeatherCountry = (city) => {
    countriesService.getWeather(city[0]).then((weather) => {
      setWeather(weather);
    });
  };

  return (
    <div>
      find countries <input type="text" value={value} onChange={handleSearch} />
      {message && <p>{message}</p>}
      {currency?.map((country) => (
        <p key={country.name.common}>
          {country.name.common}
          <button onClick={() => handleShow(country)}>show</button>
        </p>
      ))}
      <Country country={country} weather={weather} />
    </div>
  );
};

export default App;
