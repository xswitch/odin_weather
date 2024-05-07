import El from "./createEl";

const searchList = (() => {
  const listContainer = document.querySelector(".searchList");
  const searchField = document.querySelector("#findLocation");

  function updatePosition() {
    const { y, height, width } = searchField.getBoundingClientRect();
    listContainer.style.top = `${y + height + 5}px`;
    listContainer.style.width = `${width}px`;
  }

  function addEntry(entryData) {
    const card = new El("div", {
      classes: "searchResult",
      parent: listContainer,
    });
  }

  function clearList() {}

  function update(list) {
    list.forEach((entry) => {
      addEntry(entry);
    });
  }

  return { updatePosition, update };
})();

export default searchList;
