import El from "./createEl";
import Weather from "./weather";

class UI {
  todaysDate = new Date();

  currentFormat = "c";

  weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  activeTab;

  constructor() {
    this.cityName = document.querySelector(".locationInfo>.cityName");
    this.regionCountryName = document.querySelector(
      ".locationInfo>.regionCountryName",
    );
    this.currentDate = document.querySelector(".dateInfo");
    this.currentConditionIcon = document.querySelector(".conditionInfo>img");
    this.currentConditionText = document.querySelector(".conditionInfo>h2");
    this.currentTemp = document.querySelector(".tempNow");
    this.currentExtremesHigh = document.querySelector(
      ".tempExtremes>.tempHigh",
    );
    this.currentExtremesLow = document.querySelector(".tempExtremes>.tempLow");
    this.forecastDisplay = document.querySelector(".forecastDisplay");
    this.hourlyButton = document.querySelector(".hourlyButton");
    this.dailyButton = document.querySelector(".dailyButton");
    this.detailsButton = document.querySelector(".detailsButton");

    [this.hourlyButton, this.dailyButton, this.detailsButton].forEach(
      (button) => {
        button.addEventListener("click", (e) => {
          this.changeTab(button);
        });
      },
    );
  }

  changeTab(button, force = false) {
    if (button === this.activeTab && force === false) return;
    if (this.activeTab === undefined) this.activeTab = button;
    this.forecastDisplay.classList.remove(this.forecastDisplay.classList[1]);
    this.forecastDisplay.classList.add(button.textContent.toLowerCase());
    this.activeTab.classList.remove("selected");
    this.activeTab = button;
    this.activeTab.classList.add("selected");
    this.clearForecastDisplay();
    switch (button.textContent) {
      case "Hourly":
        this.createHourly(Weather.getData().hourly);
        break;
      case "Daily":
        this.createDaily(Weather.getData().forecastWeather);
        break;
      case "Details":
        this.createDetails(Weather.getData());
        break;
      default:
        break;
    }
  }

  updateUI(currentData, forecastData) {
    this.cityName.textContent = currentData.name;
    this.regionCountryName.textContent = `${currentData.region}, ${currentData.country}`;
    this.currentDate.textContent = `${this.month[this.todaysDate.getMonth()]} ${this.todaysDate.getDate()}, ${this.todaysDate.getFullYear()}`;
    this.currentConditionIcon.src = currentData.condition.icon;
    this.currentConditionText.textContent = currentData.condition.text;
    this.currentTemp.textContent = `${Math.round(currentData[`temp_${this.currentFormat}`])}°`;
    this.currentExtremesHigh.textContent = `${Math.round(forecastData[0][`maxtemp_${this.currentFormat}`])}°`;
    this.currentExtremesLow.textContent = `${Math.round(forecastData[0][`mintemp_${this.currentFormat}`])}°`;
  }

  clearForecastDisplay() {
    while (this.forecastDisplay.firstChild) {
      this.forecastDisplay.removeChild(this.forecastDisplay.lastChild);
    }
  }

  createHourly(data) {
    this.clearForecastDisplay();
    data.forEach((hour, index) => {
      if (index < this.todaysDate.getHours()) return;
      if (index - this.todaysDate.getHours() > 24) return;
      if (index === this.todaysDate.getHours()) {
        this.hourlyCard(hour, "NOW");
      } else {
        this.hourlyCard(hour, this.indexToTime(index));
      }
    });
  }

  createDaily(data) {
    data.forEach((day) => {
      this.dailyCard(day);
    });
  }

  createDetails(data) {
    console.log(data);
    const columns = [
      new El("div", { parent: this.forecastDisplay, classes: "detailsColumn" })
        .element,
      new El("div", { parent: this.forecastDisplay, classes: "detailsColumn" })
        .element,
      new El("div", { parent: this.forecastDisplay, classes: "detailsColumn" })
        .element,
    ];
    const text = {
      temp: new El("h3", {
        classes: "detailsText",
        text: `Temperature`,
        parent: columns[0],
      }),
      feelsLike: new El("h3", {
        classes: "detailsText",
        text: `Feels like`,
        parent: columns[0],
      }),
      wind: new El("h3", {
        classes: "detailsText",
        text: `Wind`,
        parent: columns[0],
      }),
      gust: new El("h3", {
        classes: "detailsText",
        text: `Gust`,
        parent: columns[0],
      }),
      maxTemp: new El("h3", {
        classes: "detailsText",
        text: `Maximum temperature`,
        parent: columns[1],
      }),
      minTemp: new El("h3", {
        classes: "detailsText",
        text: `Minimum temperature`,
        parent: columns[1],
      }),
      averageTemp: new El("h3", {
        classes: "detailsText",
        text: `Average temperature`,
        parent: columns[1],
      }),
      chanceOfRain: new El("h3", {
        classes: "detailsText",
        text: `Chance of rain`,
        parent: columns[1],
      }),
      moonRise: new El("h3", {
        classes: "detailsText",
        text: `Moonrise`,
        parent: columns[2],
      }),
      moonSet: new El("h3", {
        classes: "detailsText",
        text: `Moonset`,
        parent: columns[2],
      }),
      sunRise: new El("h3", {
        classes: "detailsText",
        text: `Sunrise`,
        parent: columns[2],
      }),
      sunSet: new El("h3", {
        classes: "detailsText",
        text: `Sunset`,
        parent: columns[2],
      }),
    };
    const info = {
      temp: new El("h3", {
        classes: "detailsText",
        text: `${Math.round(data.currentWeather[`temp_${this.currentFormat}`])}°`,
        parent: columns[0],
      }),
      feelsLike: new El("h3", {
        classes: "detailsText",
        text: `${Math.round(data.currentWeather[`feelslike_${this.currentFormat}`])}°`,
        parent: columns[0],
      }),
      wind: new El("h3", {
        classes: "detailsText",
        text: `${Math.round(data.currentWeather.wind_kph / 3.6)} m/s`,
        parent: columns[0],
      }),
      gust: new El("h3", {
        classes: "detailsText",
        text: `${Math.round(data.currentWeather.gust_kph / 3.6)} m/s`,
        parent: columns[0],
      }),
      maxTemp: new El("h3", {
        classes: "detailsText",
        text: `${Math.round(data.forecastWeather[0][`maxtemp_${this.currentFormat}`])}°`,
        parent: columns[1],
      }),
      minTemp: new El("h3", {
        classes: "detailsText",
        text: `${Math.round(data.forecastWeather[0][`mintemp_${this.currentFormat}`])}°`,
        parent: columns[1],
      }),
      averageTemp: new El("h3", {
        classes: "detailsText",
        text: `${Math.round(data.forecastWeather[0][`avgtemp_${this.currentFormat}`])}°`,
        parent: columns[1],
      }),
      chanceOfRain: new El("h3", {
        classes: "detailsText",
        text: `${Math.round(data.forecastWeather[0].daily_chance_of_rain)}%`,
        parent: columns[1],
      }),
      moonRise: new El("h3", {
        classes: "detailsText",
        text: `${data.forecastWeather[0].moonrise}`,
        parent: columns[2],
      }),
      moonSet: new El("h3", {
        classes: "detailsText",
        text: `${data.forecastWeather[0].moonset}`,
        parent: columns[2],
      }),
      sunRise: new El("h3", {
        classes: "detailsText",
        text: `${data.forecastWeather[0].sunrise}`,
        parent: columns[2],
      }),
      sunSet: new El("h3", {
        classes: "detailsText",
        text: `${data.forecastWeather[0].sunset}`,
        parent: columns[2],
      }),
    };
  }

  dailyCard(dayData) {
    const dayDate = new Date(dayData.date);
    const card = new El("div", {
      classes: "dailyCard",
      parent: this.forecastDisplay,
    }).element;
    const cardDate = new El("div", {
      classes: "dailyTime",
      parent: card,
      text: this.weekday[dayDate.getDay()],
    });
    const cardCondition = new El("img", {
      classes: "dailyCondition",
      parent: card,
    });
    cardCondition.element.src = dayData.condition.icon;
    const temp = new El("div", {
      classes: "dailyTemp",
      parent: card,
      text: `${Math.round(dayData[`maxtemp_${this.currentFormat}`])}° / ${Math.round(dayData[`mintemp_${this.currentFormat}`])}°`,
    });
    card.addEventListener("click", () => {
      this.createModal(dayData);
    });
  }

  hourlyCard(hourData, time) {
    const card = new El("div", {
      classes: "hourCard",
      parent: this.forecastDisplay,
    });
    const cardTime = new El("div", {
      classes: "cardTime",
      parent: card.element,
      text: time,
    });
    const cardCondition = new El("img", {
      classes: "cardCondition",
      parent: card.element,
    });
    cardCondition.element.src = hourData.condition.icon;
    const cardTemp = new El("div", {
      classes: "cardTemp",
      parent: card.element,
      text: `${Math.round(hourData[`temp_${this.currentFormat}`])}°`,
    });
  }

  indexToTime(index) {
    if (index > 23) {
      index -= 24;
    }
    return String(index).length === 1 ? `0${index}:00` : `${index}:00`;
  }

  createList(data, listParent) {
    const acceptedData = {
      [`avgtemp_${Weather.getTempType()}`]: "Average Temperature",
      [`maxtemp_${Weather.getTempType()}`]: "Maximum Temperature",
      [`mintemp_${Weather.getTempType()}`]: "Minimum Temperature",
      maxwind_kph: "Max wind",
      daily_chance_of_rain: "Chance of rain",
      sunrise: "Sunrise",
      sunset: "Sunset",
    };
    Object.keys(data).forEach((key) => {
      if (key in acceptedData) {
        const text = new El("h3", {
          classes: "modalText",
          text: acceptedData[key],
          parent: listParent,
        });
        const dataText = new El("h3", {
          classes: "modalText",
          text: data[key],
          parent: listParent,
        });
      }
    });
    console.log(acceptedData);
    console.log(data);
  }

  createModal(data) {
    const modal = new El("div", {
      classes: "modal",
      parent: document.querySelector("body"),
    }).element;
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.remove();
    });
    const modalContainer = new El("div", {
      classes: "modalContainer",
      parent: modal,
    });
    this.createList(data, modalContainer.element);
  }
}

export default UI;
