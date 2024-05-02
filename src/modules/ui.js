import El from "./createEl";
import Weather from "./weather";

class UI {
  todaysDate = new Date();

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
          if (e.target !== this.activeTab) {
            button.classList.add("selected");
            this.activeTab.classList.remove("selected");
            this.activeTab = button;
            this.clearForecastDisplay();
            this.changeTab(button);
          }
        });
      },
    );

    this.activeTab = this.hourlyButton;
  }

  changeTab(button) {
    console.log(button.textContent);
    switch (button.textContent) {
      case "Hourly":
        console.log(button.textContent);
        Weather.getHourly().then((data) => this.createHourly(data));
        break;

      default:
        break;
    }
  }

  updateUI(currentData, forecastData) {
    console.log(currentData, forecastData);
    this.cityName.textContent = currentData.name;
    this.regionCountryName.textContent = `${currentData.region}, ${currentData.country}`;
    this.currentDate.textContent = `${this.todaysDate.toLocaleDateString()}`;
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
    console.log(data);
    this.clearForecastDisplay();
    data.forEach((hour, index) => {
      if (index < this.todaysDate.getHours()) return;
      if (index === this.todaysDate.getHours()) {
        this.hourlyCard(hour, "NOW");
      } else {
        this.hourlyCard(hour, this.indexToTime(index));
      }
    });
  }

  createDaily(data) {}

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
    return String(index).length === 1 ? `0${index}:00` : `${index}:00`;
  }
}

export default UI;
