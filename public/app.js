import * as ELEMENTS from 'elements.js';
import {Http} from 'http.js';


const APP_ID = 'a09a948026757897670e4d25f0150023';

ELEMENTS.ELEMENT_SEARCH_BUTTON.addEventListener('click', searchWeather);

function searchWeather() {
    const CITY_NAME = ELEMENTS.ELEMENT_SEARCHED_CITY.value.trim();
    if (CITY_NAME.length == 0) {
        return alert('Please enter a city name');
    }
    ELEMENTS.ELEMENT_LOADING_TEXT.style.display = 'block';
    ELEMENTS.ELEMENT_WEATHER_BOX.style.display = 'none';
    const URL = 'http://api.openweathermap.org/data/2.5/weather?q=' + CITY_NAME + '&units=metric&appid=' + APP_ID;
    Http.fetchData(URL)
        .then(responseData => {
            //console.log(responseData);
            const WEATHER_DATA = {
                cityName : CITY_NAME,
                description : responseData.weather[0].description.toUpperCase(),
                temperature : responseData.main.temp
            };
            updateWeather(WEATHER_DATA);
        })
        .catch(error => {
            ELEMENTS.ELEMENT_LOADING_TEXT.style.display = 'none';
            alert(error + ". May be cant find the place you entered");
        });
}

function updateWeather(weatherData) {
    //console.log(weatherData);
    ELEMENTS.ELEMENT_WEATHER_CITY.textContent = weatherData.cityName;
    ELEMENTS.ELEMENT_WEATHER_DESCRIPTION.textContent = weatherData.description;
    ELEMENTS.ELEMENT_WEATHER_TEMPERATURE.textContent = weatherData.temperature + " °C";

    ELEMENTS.ELEMENT_LOADING_TEXT.style.display = 'none';
    ELEMENTS.ELEMENT_WEATHER_BOX.style.display = 'block';
}