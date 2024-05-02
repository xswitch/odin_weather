import Weather from "./modules/weather";
import "./style.css";

const searchField = document.querySelector("#findLocation");
searchField.addEventListener("input", () => {
  if (searchField.value.length < 2) return;
  Weather.search(searchField.value);
});

searchField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    Weather.getWeather();
    e.preventDefault();
  }
});

Weather.getWeather();
