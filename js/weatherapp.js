const imageElement = document.querySelector (".weather-image");
const valueElement = document.querySelector (".temp-value p");
const descElement = document.querySelector (".temp-desc p");
const locationElement = document.querySelector (".temp-location p");
const notifElement = document.querySelector (".notification");

const weather = {};

weather.temperature = {
    unit: "Fahreinheit"
}


const Fahreinheit = 273.15;

const key = "e0f3620b70ce5624f312fc0522b2678d";

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notifElement.style.display = "block";
    notifElement.innerHTML = "<p>Unable to acccess</p>";
}

function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
 
    getWeather(latitude, longitude);
}

function showError(error) {
    notifElement.style.display = "block";
    notifElement.innerHTML = `<p> ${error.message} </p>`;
}

function getWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`

    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data) {
            weather.temperature.value = Math.floor(((data.main.temp - Fahreinheit) * 1.8) + 32);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then (function() {
            displayWeather();
        })
}

function displayWeather() {
    imageElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    valueElement.innerHTML = `${weather.temperature.value}°<span>F</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}