function fetchCountries() {
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      const select = document.getElementById("countrySelect");
      data.forEach((country) => {
        const option = document.createElement("option");
        option.value = country.name.common;
        option.textContent = country.name.common;
        select.appendChild(option);
      });
    })
    .catch((error) => console.error("Error fetching countries:", error));
}

// Event listener for the country selection dropdown
document
  .getElementById("countrySelect")
  .addEventListener("change", function () {
    fetchWeather(this.value);
  });

// Fetch countries data on page load
fetchCountries();
let apiKey = `6aa9ad05a089017ae6f32c943d635190`;
function fetchWeather(countryName) {
  // Fetch weather data
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((weatherData) => {
      // Fetch country details to get capital and region
      fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then((response) => response.json())
        .then((countryData) => {
          const country = countryData[0]; // Assuming the first result is the correct one
          displayWeather(weatherData, country);
        })
        .catch((error) =>
          console.error("Error fetching country details:", error)
        );
    })
    .catch((error) => console.error("Error fetching weather:", error));
}
function displayWeather(weatherData, country) {
  const card = document.createElement("div");
  card.className = "card";
  // Correctly access the flag URL
  const flagUrl = country.flags.png;
  card.innerHTML = `
    <div class="card" style="max-width: 400px; margin: 0 auto;">
      <div class="card-body" style="text-align: center;background-color: #C9BB99;"> 
          <h5 class="card-title" style="background-color: #b3f5f8; padding: 5px;">${country.name.common}</h5>
          <img src="${flagUrl}" alt="Country Flag" class="card-img-top mb-3" style="max-width: 100%; height: auto; display: block; margin: 0 auto;"> <!-- Adjust image size -->
          <p class="card-text">
              <strong>Capital:</strong> ${country.capital[0]}<br>
              <strong>Region:</strong> ${country.region}<br>
              <strong>Country Code:</strong> ${country.cca2}<br> <!-- Include country code here -->
              
          </p>
          <button id="showWeatherBtn" class="btn btn-primary">Click for Weather</button>
      </div>
  </div>
  
         `;
  document.getElementById("weatherCard").innerHTML = "";
  document.getElementById("weatherCard").appendChild(card);

  // Add event listener to the button
  const showWeatherBtn = document.getElementById("showWeatherBtn");
  showWeatherBtn.addEventListener("click", function () {
    // Display weather and temperature information
    const weatherInfo = document.createElement("p");
    weatherInfo.className = "card-text";
    weatherInfo.innerHTML = `
         <strong>Weather:</strong> ${weatherData.weather[0].description}<br>
         <strong>Temperature:</strong> ${weatherData.main.temp} K<br>
  
  
         <strong>Latitude:</strong> ${weatherData.coord.lat}
              <strong>Longitude:</strong> ${weatherData.coord.lon}
       `;
    card.querySelector(".card-body").appendChild(weatherInfo);
  });
}
