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
}

export default UI;
