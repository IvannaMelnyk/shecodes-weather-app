//ch1
let currentTime = new Date();
function getCurrentDate(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let timeNow = `${day}, ${hours}:${minutes}`;
  return timeNow;
}

function changeTime(event) {
  // event.preventDefault();
  let timeNow = document.querySelector("h3");

  timeNow.innerHTML = getCurrentDate(currentTime);
}
changeTime();

function getCurrentDay(date) {
  let monthes = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Nov",
    "Dec",
  ];

  let month = monthes[date.getMonth()];
  let number = date.getDate();
  let year = date.getFullYear();
  let dayNow = `${month} ${number}, ${year}`;
  return dayNow;
}
function changeDay(event) {
  let dayNow = document.querySelector(".weather-date");
  dayNow.innerHTML = getCurrentDay(currentTime);
}
changeDay();

window.addEventListener("load", changeTime);
window.addEventListener("load", changeDay);

//ch2
function displaySearchCity(res) {
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = res.data.main.temp;
  document.querySelector(".weather-location").innerHTML = res.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    res.data.main.temp
  );
  document.querySelector("#humidnity").innerHTML = res.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(res.data.wind.speed);
  document.querySelector(".value").innerHTML = res.data.weather[0].description;
  document.querySelector("#precipitation").innerHTML = res.data.weather[0].main;

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", res.data.weather[0].description);
}
function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input").value;
  searchCity(searchInput);
}
function searchCity(city) {
  let units = "metric";
  let API_KEY = "36b53dd2d584a4ad50ddd9d91515cd0c";
  let BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
  axios.get(BASE_URL).then(displaySearchCity);
}

function searchCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let API_KEY = "36b53dd2d584a4ad50ddd9d91515cd0c";
  let BASE_URL = `https://api.openweathermap.org/data/2.5/weather?&appid=${API_KEY}&units=${units}&lat=${lat}&lon=${lon}`;
  axios.get(BASE_URL).then(displaySearchCity);
}
//put listener on form
let form = document.querySelector(".search-form");
form.addEventListener("submit", handleSubmit);
//made navigation
function getCurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}
//put listener on Current button
let currentLocation = document.querySelector(".button-current");
currentLocation.addEventListener("click", getCurrentWeather);
//ch3
function changeToFarengeitTemp(event) {
  event.preventDefault();
  //remove active
  celsiusLink.classList.remove("active");
  farengeitLink.classList.add("active");
  let farengeit = document.querySelector(".temp-degree");
  farengeit.innerHTML = Math.ceil((celsiusTemperature * 9) / 5 + 32);
}

function changeToCelsiusTemp(event) {
  event.preventDefault();
  farengeitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celcius = document.querySelector(".temp-degree");
  celcius.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
let celsiusLink = document.querySelector("#temp-celsius");
celsiusLink.addEventListener("click", changeToCelsiusTemp);
let farengeitLink = document.querySelector("#temp-farengeit");
farengeitLink.addEventListener("click", changeToFarengeitTemp);
////
