import searchList from "./modules/searchList";
import Weather from "./modules/weather";
import "./style.css";

const searchField = document.querySelector("#findLocation");
searchField.addEventListener("input", () => {
  if (searchField.value.length < 2) return;
  Weather.search(searchField.value).then((searchList) => {
    console.log(searchList);
  });
});

searchField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    Weather.getWeather();
    e.preventDefault();
  }
});

Weather.getWeather();

console.log(searchList.listContainer);

window.onload = function () {
  searchList.updatePosition();
};
