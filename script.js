const API_KEY = "YOUR_API_KEY_HERE";
let spoken = false;

const searchBtn = document.getElementById("searchBtn");
const voiceBtn = document.getElementById("voiceBtn");

searchBtn.addEventListener("click", getWeather);
voiceBtn.addEventListener("click", speakWeatherOnce);

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) return;

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  );

  const data = await res.json();

  document.getElementById("weather").classList.add("active");
  document.getElementById("cityName").textContent = data.name;
  document.getElementById("temperature").textContent = Math.round(data.main.temp) + "°C";
  document.getElementById("condition").textContent = data.weather[0].description;
  document.getElementById("humidity").textContent = data.main.humidity + "%";
  document.getElementById("wind").textContent = data.wind.speed + " m/s";
  document.getElementById("pressure").textContent = data.main.pressure + " hPa";
  document.getElementById("feels").textContent = Math.round(data.main.feels_like) + "°C";

  spoken = false;
  voiceBtn.disabled = false;
}

function speakWeatherOnce() {
  if (spoken) return;

  const text = `The current weather in ${cityName.textContent} is ${condition.textContent}. The temperature is ${temperature.textContent}.`;

  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 0.95;
  utter.pitch = 1;

  speechSynthesis.speak(utter);
  spoken = true;
  voiceBtn.disabled = true;
}