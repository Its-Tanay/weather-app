import * as api from './modules/api.js';

const search = document.getElementById('search');
const submit = document.getElementById('submit');

function aqiStatusText(i) {
    switch (i) {
      case 1:
        return 'Good';
      case 2:
        return 'Moderate';
      case 3:
        return 'Unhealthy for sensitive group';
      case 4:
        return 'Unhealthy';
      case 5:
        return 'Very unhealthy';
      case 6:
        return 'Hazardous';
      default:
        return 'AQI Unavailable';
    }
}

function updateCard(weatherData){

    const city = document.getElementById('city');
    const country = document.getElementById('country');
    const tempValue = document.getElementById('temp-value');
    const tempUnit = document.getElementById('temp-unit');
    const weatherIcon = document.getElementById('weather-icon');
    const humidity = document.getElementById('humidity-value');
    const aqiStatus = document.getElementById('aqi-status');
    const feelsLike = document.getElementById('feels-like-value');

    city.textContent = weatherData.location.name;
    country.textContent = weatherData.location.country;
    tempValue.textContent = weatherData.current.temp_c;
    humidity.textContent = weatherData.current.humidity;
    weatherIcon.src = weatherData.current.condition.icon;
    feelsLike.textContent = weatherData.current.feelslike_c;

    const aqiText = aqiStatusText(weatherData.current.air_quality['us-epa-index']);
    aqiStatus.textContent = aqiText;
}

async function getWeatherData(searchValue){
    const url = api.formatUrl('current', searchValue);
    const weatherData = await api.getWeatherData(url);
    return weatherData;
};

async function getWeatherDataAndRender(searchValue){
    const weatherData = await getWeatherData(searchValue);
    updateCard(weatherData);
};

submit.addEventListener('click', (e) => {
    const searchValue = search.value;
    getWeatherDataAndRender(searchValue);
    e.preventDefault();
});

getWeatherDataAndRender('Mumbai');