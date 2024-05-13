import El from "./createEl";
import Weather from "./weather";

const searchList = (() => {
  const listContainer = document.querySelector(".searchList");
  const searchField = document.querySelector("#findLocation");
  let topResult;

  function updatePosition() {
    const { y, height, width } = searchField.getBoundingClientRect();
    listContainer.style.top = `${y + height + 5}px`;
    listContainer.style.width = `${width}px`;
  }

  function clearList() {
    while (listContainer.firstChild) {
      listContainer.removeChild(listContainer.lastChild);
    }
  }

  function addEntry(entryData) {
    const card = new El("div", {
      classes: "searchResult",
      parent: listContainer,
    }).element;

    const city = new El("h3", {
      classes: "searchResultText",
      parent: card,
      text: `${entryData.name}`,
    });
    const regionCountry = new El("h3", {
      classes: "searchResultCountry",
      parent: card,
      text: `${entryData.region}, ${entryData.country}`,
    });
    card.addEventListener("click", () => {
      Weather.setLocation(entryData.name);
      Weather.getWeather();
      searchField.value = entryData.name;
      clearList();
    });
  }

  function update(list) {
    clearList();
    list.forEach((entry, index) => {
      if (index === 0) topResult = entry;
      addEntry(entry);
    });
  }

  function getTopResult() {
    return topResult;
  }

  return { updatePosition, update, clearList, getTopResult };
})();

export default searchList;
