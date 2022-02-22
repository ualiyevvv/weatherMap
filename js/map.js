var map = L.map('map');
var accessToken = "pk.eyJ1IjoieGNoamp2ZyIsImEiOiJjazd1YmwyOHowMXQwM29tb2dzaHF4c3o3In0.0TsgUa5BnaPGlx5mcGPVFg";
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token='+accessToken, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(map);
var marker = L.marker().addTo(map);

let app = {
    "map": map,
    "marker": marker,
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
        this.marker.setLatLng([data.lat, data.lon]);
        this.map.setView([data.lat, data.lon], 10);
        var card = document.querySelector(".my-card");
        this.marker.bindPopup(
            card
        ).openPopup();

        fetch(
            "https://api.openweathermap.org/data/2.5/weather?lat="
            + data.lat + "&lon=" + data.lon + "&units=metric&appid="+ this.apiKey
        ).then((response) => response.json()).then((datan) => this.displayCity(datan, data.lat, data.lon));
    },
    displayCity: function(data, lat, lon) {
        
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(lat, lon, name, icon, description, temp, humidity, speed);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
          
        // var marker = L.marker([lat, lon]).addTo(map);
        document.querySelector(".leaflet-popup-content-wrapper").classList.add("my-popup");

        // var popup = L.popup();
        // function onMapClick(e) {
        //     popup
        //         .setLatLng(e.latlng)
        //         .setContent("You clicked the map at " + e.latlng.toString())
        //         .openOn(map);
        // };
        // map.on('click', onMapClick);
    },
    search: function() {
        this.map.closePopup();
        this.fetchSearch(document.querySelector(".search-input").value);
    },

}
app.fetchSearch("astana");

document.querySelector(".search button").addEventListener("click", function() {
    app.search();
});
document.querySelector(".search-input").addEventListener("keyup", function(event) {
    if (event.key == "Enter") app.search();
});




