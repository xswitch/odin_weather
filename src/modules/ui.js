import El from "./createEl";

class UI {
  todaysDate = new Date();

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

  createHourly(data) {
    console.log(data);
    data.forEach((hour, index) => {
      if (index + 1 < this.todaysDate.getHours()) return;
      this.hourlyCard(hour, this.indexToTime(index));
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
    return String(index + 1).length === 1 ? `0${index}:00` : `${index}:00`;
  }
}

export default UI;
