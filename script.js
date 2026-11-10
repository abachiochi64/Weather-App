const cityName = document.getElementById("location");
const temperature = document.getElementById("main-temperature");
const icon = document.getElementById("weather-icon");
const weatherType = document.getElementById("weather-main");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const windGust = document.getElementById("wind-gust");

const citySelect = document.getElementById("city-select");
const getWeatherBtn = document.getElementById("get-weather-btn");


async function getWeather(city) {
  try {
    const response = await fetch (`https://weather-proxy.freecodecamp.rocks/api/city/${city}`);

    return await response.json();

  } catch (error) {
    console.error(error);
  }
}

async function showWeather(city) {
  try {
    const cityData = await getWeather(city);

    if (!cityData) {
      alert("Something went wrong, please try again later");
    return;
    }

    if (cityData.main.temp != null) {
      temperature.innerText = `${cityData.main.temp} °C`;
    } else {
      temperature.innerText = "N/A";
    };

    if (cityData.name) {
      cityName.innerText = cityData.name;
    } else {
      cityName.innerText = "N/A";
    };

    icon.src = cityData.weather[0].icon;
    icon.hidden = false;

    weatherType.innerText = cityData.weather[0].main;

    if (cityData.main.feels_like != null) {
      feelsLike.innerText = `${cityData.main.feels_like} °C`;
    } else {
      feelsLike.innerText = "N/A";
    };

    if (cityData.main.humidity != null) {
      humidity.innerText = `${cityData.main.humidity}%`;
    } else {
      humidity.innerText = "N/A";
    };

    if (cityData.wind.speed != null) {
      wind.innerText = `${cityData.wind.speed} m/s`;
    } else {
      wind.innerText = "N/A";
    };

    if (cityData.wind.gust != null) {
      windGust.innerText = `${cityData.wind.gust} m/s`;
    } else {
      windGust.innerText = "N/A";
    };

  } catch (error) {
    alert("Something went wrong, please try again later");
  }
}


getWeatherBtn.addEventListener("click", () => {
  showWeather(citySelect.value);
})