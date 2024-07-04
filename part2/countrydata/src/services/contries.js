import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URL;
const weatherUrl = import.meta.env.VITE_API_WEATHER_URL;
const weatherKey = import.meta.env.VITE_API_WEATHER_KEY;

const getAllOne = async (url) => {
  const request = axios.get(`${baseUrl}${url}`);
  return request.then((response) => response.data);
};

const getWeather = async (city) => {
  const request = axios.get(
    `${weatherUrl}weather?q=${city}&appid=${weatherKey}&units=metric`,
  );
  return request.then((response) => response.data);
};
export default { getAllOne, getWeather };
