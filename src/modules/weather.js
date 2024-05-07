import UI from "./ui";

const Weather = (() => {
  let location = "egersund";
  let currentWeather = {};
  let forecastWeather = {};
  let hourly;
  const fetchTypes = {
    current: "current.json",
    search: "search.json",
    forecast: "forecast.json",
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
    "maxtemp_c",
    "maxtemp_f",
    "mintemp_c",
    "mintemp_f",
    "sunset",
    "sunrise",
    "moonset",
    "moonrise",
    "avgtemp_c",
    "avgtemp_f",
    "daily_chance_of_rain",
    "maxwind_kph",
    "maxwind_mph",
    "condition",
  ];

  const uiController = new UI();

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
    currentWeather = mergeObjectsInArray(
      await dataStripper([allData.current, allData.location]),
    );
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

  // New stripping method for forecast data
  async function stripForecast(data) {
    const newData = {
      hour: await dataStripper(data.hour),
      date: data.date,
    };
    // Loops over all objects and checks for acceptable keys
    Object.keys(data).forEach((key) => {
      Object.keys(data[key]).forEach((entry) => {
        if (acceptedData.includes(entry)) newData[entry] = data[key][entry];
      });
    });
    return newData;
  }

  async function forecast() {
    const allData = await fetchData(fetchTypes.forecast, `${location}&days=7`);
    const forecastDays = allData.forecast.forecastday;
    const strippedDays = await Promise.all(
      forecastDays.map((day) => stripForecast(day)),
    );
    return strippedDays;
  }

  async function getHourly() {
    const data = forecastWeather;
    let hours = data[0].hour;
    hours = hours.concat(data[1].hour);
    return hours;
  }

  async function getWeather() {
    currentWeather = await current();
    forecastWeather = await forecast();
    hourly = await getHourly();
    uiController.updateUI(currentWeather, forecastWeather);
    uiController.changeTab(uiController.hourlyButton, true);
  }

  function getData() {
    return { forecastWeather, currentWeather, hourly };
  }

  return {
    current,
    search,
    forecast,
    getWeather,
    getHourly,
    getData,
    uiController,
  };
})();

export default Weather;
