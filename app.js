const APP_ID = "44d4bde981021b6762e568d264208b36";
const Erro_Value = "Bạn nhập sai";

const searchInput = document.querySelector("#search-city");
const cityName = document.querySelector(".city-name");
const weatherState = document.querySelector(".weather-state");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");

const sunset = document.querySelector(".sunset");
const sunrise = document.querySelector(".sunrise");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");

const body = document.querySelector("body");
const container = document.querySelector(".container");

function setBody() {
  body.style.background = "url(./4.jpg) center";
  container.style.background = "linear-gradient(to top, #63bbca, #7962b9)";
}

searchInput.addEventListener("change", (e) => {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${APP_ID}&units=metric&lang=vi`
  ).then(async (res) => {
    // lay du lieu tu API
    const data = await res.json();
    console.log("[Search]", data);

    // gán các dữ liệu từ API vào các tab hiện thị
    cityName.innerHTML = data.name || Erro_Value;
    weatherState.innerHTML = data.weather[0].description || Erro_Value;
    weatherIcon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    );
    temperature.innerHTML = Math.round(data.main.temp) || Erro_Value;
    humidity.innerHTML = data.main.humidity || Erro_Value;
    wind.innerHTML = (data.wind.speed * 3.6).toFixed(2) || Erro_Value;
    sunrise.innerHTML =
      moment.unix(data.sys.sunrise).format("H:mm") || Erro_Value;
    sunset.innerHTML =
      moment.unix(data.sys.sunset).format("H:mm") || Erro_Value;
  });
  setBody();
});

// function the Voice < trợ lí ảo >

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.lang = "vi-VI";
recognition.continuous = false;
// web
const microphone = document.querySelector(".micophone");

const handleVoice = (text) => {
  console.log(text);
};

microphone.addEventListener("click", (e) => {
  e.preventDefault();
  recognition.start();
});
recognition.onspeechend = () => {
  recognition.stop();
};
recognition.onerror = (err) => {
  console.error(err);
};
recognition.onresult = (e) => {
  console.log("onresult", e);
  const text = e.results[0][0].transcript;
  handleVoice(text);
};
