
let weather = {
    "apiKey": "eebf8b3e3c7c16ee3b7d3ff2cf80a331",
    fetchSearch: function (city) {
        fetch(
            "https://api.openweathermap.org/geo/1.0/direct?q="
            + city 
            +"&appid=" + this.apiKey

        ).then((response) => response.json())
        .then((data) => this.fetchWeather(data[0]));
    },
    fetchWeather: function (data) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?lat="
            + data.lat + "&lon=" + data.lon + "&units=metric&appid="+ this.apiKey
        ).then((response) => response.json()).then((datan) => this.displayCity(datan));
    
    },
    displayCity: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, humidity, speed);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function() {
        this.fetchSearch(document.querySelector(".search-input").value);
    }
}

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});
document.querySelector(".search-input").addEventListener("keyup", function(event) {
    if (event.key == "Enter") weather.search();
});
weather.fetchSearch("astana");

// fetch('https://api.openweathermap.org/data/2.5/weather?lat=51.2040697&lon=51.3707827&appid=eebf8b3e3c7c16ee3b7d3ff2cf80a331')
//   .then(response => response.json())
//   .then(commits => console.log(commits));
