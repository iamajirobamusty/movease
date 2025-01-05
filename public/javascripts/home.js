//Initialize the map and set its view to a chosen geographical point
const map = L.map('map').setView([6.5826, 3.3874], 15);

//add a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
}).addTo(map);

//add a marker
const userMarker = L.marker([0, 0]).addTo(map);
marker.bindPopup('Current location');

function updateLocation(position) {
    const { latitude, longitude } = position.coords;


    //update the map view and marker position
    map.setView([latitude, longitude], 15); //zoom to user locaatoin
    userMarker.setLatLng([latitude, longitude]).openPopup();

    //handle error in getting locatoin
    function handleLocationError(error) {
        console.error('Unale to get location', error.message);
        alert('unable to retrieve location. Please enable location services.')
    }

    //request the user's location and update map dynamically
    if (navigator.geolocation) {
        //watch for location changes
        navigator.geolocation.watchPosition(updateLocation, handleLocationError, {
            enableHighAccuracy: true,
            maximumAge: 0,
        });

    } else {
        alert("Geolocatoin is not supported by your browser")
    }
}

//add a circle
const circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);
circle.bindPopup('Iam a circle')
