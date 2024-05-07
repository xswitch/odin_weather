import El from "./createEl";
import Weather from "./weather";

class UI {
  todaysDate = new Date();

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
    this.currentTemp.textContent = `${Math.round(currentData.temp_c)}°`;
    this.currentExtremesHigh.textContent = `${Math.round(forecastData[0].maxtemp_c)}°`;
    this.currentExtremesLow.textContent = `${Math.round(forecastData[0].mintemp_c)}°`;
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

  dailyCard(dayData) {
    console.log(dayData);
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
      text: `${Math.round(dayData.maxtemp_c)}° / ${Math.round(dayData.mintemp_c)}°`,
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
      text: `${Math.round(hourData.temp_c)}°`,
    });
  }

  indexToTime(index) {
    if (index > 23) {
      index -= 24;
    }
    return String(index).length === 1 ? `0${index}:00` : `${index}:00`;
  }
}

export default UI;
