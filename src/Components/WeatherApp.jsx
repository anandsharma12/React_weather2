import React, { useState } from "react";
import { FaSearch, FaWind } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import axios from "axios";
import "./Weather.css";
const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState();
  const [error, setError] = useState("");

  const API_KEY = "a46646fab19cc476da2cab04e053fe0b";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  async function fetchData() {
    try {
      let response = await fetch(url);
      let output = await response.json();
      if (response.ok) {
        setWeather(output);
        console.log(output);
        setError("");
      } else {
        setError("No data found. Please enter a valid city name.");
      }
    } catch (error) {}
  }

  const handleSearch = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="container">
      <div className="city">
        <input
          type="text"
          value={city}
          onChange={handleSearch}
          placeholder="Enter any city name"
        ></input>
        <button onClick={() => fetchData()}>
          <FaSearch></FaSearch>
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {weather && weather.weather && (
        <div className="content">
          <div className="weather-image">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather-icon"
            />
          </div>
          <h3 className="desc">{weather.weather[0].description}</h3>
          <div className="weather-temp">
            <h2>
              {weather.main.temp}
              <span>&deg;C</span>
            </h2>
          </div>
          <div className="weather-city">
            <div className="location">
              <MdLocationOn />
            </div>
            <p>
              {weather.name},<span>{weather.sys.country}</span>
            </p>
          </div>
          <div className="weather-stats">
            <div className="wind">
              <div className="wind-icon">
                <FaWind />
              </div>
              <h3 className="wind-speed">{weather.wind.speed} km/h</h3>
              <h3 className="wind-heading">Wind Speed</h3>
            </div>
            <div className="humidity">
              <div className="humidity-icon">
                <WiHumidity />
              </div>
              <h3 className="humidity-percent">{weather.main.humidity}</h3>
              <h3 className="humidity-heading">Humidity</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
