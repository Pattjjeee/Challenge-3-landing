// Map code

// Set api token
mapboxgl.accessToken = 'pk.eyJ1IjoicGF0dGpqZWVlIiwiYSI6ImNrbWtsODA0czEyYWkyb3F2ZzVkMXo4Nm0ifQ.cFctEfxcLjSkgAoVZVOu4w';

// Initialate map
var map = new mapboxgl.Map({
	container: 'map',
	// style: 'mapbox://styles/mapbox/satellite-v9',
	style: 'mapbox://styles/mapbox/dark-v10',
	center: [4.322840, 52.067101],
	zoom: 12,
});

//------------Geocoder--------------

var geocoder = new MapboxGeocoder({
accessToken: mapboxgl.accessToken,
types: 'country,region,place,postcode,locality,neighborhood'
});

geocoder.addTo('#geocoder');

geocoder.on('result', function(response) {
document.getElementById('longSpan').innerHTML = response.result.center[0];
document.getElementById('latSpan').innerHTML = response.result.center[1];

map.flyTo({
center: [response.result.center[0], response.result.center[1]],
zoom: 12,
speed: 0.5,
essential: true // this animation is considered essential with respect to prefers-reduced-motion
});

var superMarker = new mapboxgl.Marker({color:"pink"})
.setLngLat([response.result.center[0],response.result.center[1]])
.addTo(map);

var request = 'https://api.openweathermap.org/data/2.5/weather?lat=' + response.result.center[1] + '&lon=' + response.result.center[0] + '&appid=795c18ee99ae89fb4ded6d7194f41cb2'
// get current weather
fetch(request)

// parse response to JSON format
.then(function(responseWeather) {
return responseWeather.json();
})

// do something with response
.then(function(responseWeather) {
// show full JSON object
// console.log(responseWeather);
var weatherBox = document.getElementById('weather');
var degC = Math.floor(responseWeather.main.temp - 273.15);

var melding = '';
if (responseWeather.wind.speed > 5) {
	alert ('Pas op! Er staat hier te veel wind om te landen.');
} 
weatherBox.innerHTML = degC + '&#176;C <br>' + responseWeather.weather[0].description + "<br>" + responseWeather.wind.speed + " m/s";
});
});











