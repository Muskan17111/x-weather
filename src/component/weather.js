import React, { useState } from 'react';
import axios from 'axios';
import './weather.css';
import Card from './card';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (!city) return;
    setLoading(true);
    setError('');
    setWeatherData(null);
    const apiKey = 'dc2a4a20240a4dd8b41170459241505'; 
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    axios.get(url)
      .then(response => {
        setWeatherData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        setError('Failed to fetch weather data');
        setLoading(false);
        if (process.env.NODE_ENV !== 'test') {
            alert('Failed to fetch weather data');
          }
      });
  };

  return (
    <div className="weather-app">
      <div className="search-bar"> 
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <p>Loading data...</p>}
      {error && <p className="alert">{error}</p>}
      {weatherData && (
        <div className="weather-cards">
          <Card title="Temperature" value={`${weatherData.current.temp_c}°C`} />
          <Card title="Humidity" value={`${weatherData.current.humidity}%`} />
          <Card title="Condition" value={weatherData.current.condition.text} />
          <Card title="Wind Speed" value={`${weatherData.current.wind_kph} kph`} />
        </div>
      )}
    </div>
  );
};

export default WeatherApp;




