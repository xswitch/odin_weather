const searchList = (() => {
  const listContainer = document.querySelector(".searchList");
  const searchField = document.querySelector("#findLocation");

  function updatePosition() {
    const { y, height } = searchField.getBoundingClientRect();
    listContainer.style.top = `${y + height}px`;
  }

  function update(list) {}

  return { updatePosition };
})();

export default searchList;
