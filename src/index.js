import searchList from "./modules/searchList";
import Weather from "./modules/weather";
import "./style.css";

const searchField = document.querySelector("#findLocation");
searchField.addEventListener("input", () => {
  if (searchField.value.length < 2) {
    searchList.update([]);
    return;
  }
  Weather.search(searchField.value).then((list) => {
    console.log(list);
    searchList.update(list);
  });
});

searchField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    Weather.getWeather();
    searchField.value = searchList.getTopResult().name;
    searchList.clearList();
    e.preventDefault();
  }
});

Weather.getWeather();

console.log(searchList.listContainer);

window.onload = () => {
  searchList.updatePosition();
};
