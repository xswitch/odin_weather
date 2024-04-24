const Weather = (() => {
  let location = "egersund";
  let currentWeather = {};
  const fetchTypes = {
    current: "current.json",
    search: "search.json",
  };
  const acceptedData = [
    "name",
    "country",
    "region",
    "temp_c",
    "temp_f",
    "feelslike_c",
    "feelslike_f",
    "wind_kph",
    "wind_mph",
    "gust_kph",
    "gust_mph",
    "is_day",
  ];

  // Sets location for fetching
  function setLocation(newLocation) {
    if (newLocation !== "") location = newLocation.toLowerCase();
  }

  // Strips away anything that is not in acceptedData
  async function dataStripper(data) {
    const oldData = await data;
    const newData = oldData.map((entry) => {
      const stripped = {};
      Object.keys(entry).forEach((key) => {
        if (acceptedData.includes(key)) stripped[key] = entry[key];
      });
      return stripped;
    }); // Loops over all data and checks for if it matches accepted data
    return newData;
  }

  // Merges all objects in an array
  function mergeObjectsInArray(oldArray) {
    let newObj = {};
    oldArray.forEach((obj) => {
      newObj = { ...newObj, ...obj };
    });
    return newObj;
  }

  // Fetches data from searchType
  async function fetchData(searchType, searchString) {
    const response = await fetch(
      `https://api.weatherapi.com/v1/${searchType}?key=291d07c0c99846cf8cb91803241704&q=${searchString}`,
      { mode: "cors" },
    );
    return response.json();
  }

  // Gets and displays the current weather
  async function current() {
    const allData = await fetchData(fetchTypes.current, location);
    console.log(allData);
    currentWeather = mergeObjectsInArray(
      await dataStripper([allData.current, allData.location]),
    );
    console.log(currentWeather);
    return currentWeather;
  }

  // Gets search results
  async function search(string) {
    const result = await fetchData(fetchTypes.search, string);
    const strippedData = await dataStripper(result);
    // Sets location to top of search
    if (strippedData[0] !== undefined) setLocation(strippedData[0].name);
    return strippedData;
  }

  return { current, setLocation, search };
})();

export default Weather;
