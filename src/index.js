import Weather from "./modules/weather";
import "./style.css";

const searchField = document.querySelector("#searchWeather");
searchField.addEventListener("input", () => {
  if (searchField.value.length < 2) return;
  Weather.search(searchField.value);
});

const searchButton = document.querySelector(".sendSearch");
searchButton.addEventListener("click", () => {
  Weather.current(searchField.value);
});
