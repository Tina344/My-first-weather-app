function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  descriptionElement.innerHTML = response.data.condition.description;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `
      <img
        src="${response.data.condition.icon_url}"
        class="weather-app-icon"
      />
    `;

  getForecast(response.data.city);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "30682do0b1e5e894ad6f6e5480tf504f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function SearchSubmitForm(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
   let days = ["Tue", "Wed", "Thur", "Fri", "Sat"];
   
   return days[date.getDay()];
  
}

function getForecast(city) {
  let apiKey = "30682do0b1e5e894ad6f6e5480tf504f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {

   if(index < 5){
    forecastHtml =
      forecastHtml +
      `
        <div class="weather-forecast">
        <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
        
        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        
        <div class="weather-forecast-temperatures">
             <div><strong>${Math.round(day.temperature.maximum)}°</strong></div>
             <div class="weather-forecast-temperature">${Math.round(
               day.temperature.minimum
             )}°</div>
            </div>
            </div>
            </div>`;
          }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", SearchSubmitForm);

searchCity("Johannesburg");
