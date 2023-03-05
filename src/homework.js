let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let today = document.querySelector("#weekday");
today.innerHTML = `${day}`;
let hours = now.getHours();
let minutes = now.getMinutes();
if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentTime = document.querySelector("#currenttime");
currentTime.innerHTML = `${hours}:${minutes}`;

function displayWeatherCondition(response) {
  document.querySelector(`#city`).innerHTML = response.data.name;

  celsiusTemperature = response.data.main.temp;
  document.querySelector(`#temperature`).innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector(`#humidity`).innerHTML = response.data.main.humidity;
  document.querySelector(`#wind`).innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(`#description`).innerHTML =
    response.data.weather[0].description;
  let iconElement = document.querySelector(`#icon`);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKey = `200802a485dc17fd74b905805d4efc94`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector(`#searchcity`).value;
  searchCity(city);
}

let form = document.querySelector(`#searchform`);
let currentCity = document.querySelector("#city");
form.addEventListener("submit", handleSubmit);

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `200802a485dc17fd74b905805d4efc94`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showFarTemperature(event) {
  event.preventDefault();
  let farGrad = document.querySelector(`#temperature`);
  celsiusLink.classList.remove("active");
  farLink.classList.add("active");
  let FarGradTemp = (celsiusTemperature * 9) / 5 + 32;
  farGrad.innerHTML = Math.round(FarGradTemp);
}

function showCelsTemperature(event) {
  event.preventDefault();
  let celsiusGrad = document.querySelector(`#temperature`);
  celsiusLink.classList.add("active");
  farLink.classList.remove("active");
  celsiusGrad.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let farLink = document.querySelector(`#far`);
farLink.addEventListener("click", showFarTemperature);

let currentLocationButton = document.querySelector(`#current-location-button`);
currentLocationButton.addEventListener("click", getCurrentLocation);

let celsiusLink = document.querySelector(`#cels`);
celsiusLink.addEventListener("click", showCelsTemperature);

searchCity("New York");
