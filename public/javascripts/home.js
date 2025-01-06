//Initialize the map and set its view to a chosen geographical point
const map = L.map('map').setView([0, 0], 2);

//add a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
}).addTo(map);

//add a marker
const userMarker = L.marker([0, 0]).addTo(map).bindPopup("Your location");

const destinationCoords = [6.5973, 3.3904]; //fixed coordinate for ketu Lagos
const destinationMarker = L.marker(destinationCoords).addTo(map).bindPopup('Ketu Lagos')


// Add a circle (default position and size)
const userCircle = L.circle([0, 0], {
    color: 'blue',
    fillColor: '#3f8efc',
    fillOpacity: 0.2,
    radius: 100, // Default radius in meters
}).addTo(map);

function updateLocation(position) {
    const { latitude, longitude, accuracy } = position.coords;
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

    fetch(url).then((response) => console.log(response.json()));

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const locationName = data.address.city || data.address.town || data.address.village || "Unknown location";
            console.log(locationName);
        })

    userMarker.setLatLng([latitude, longitude]).openPopup();
    userCircle.setLatLng([latitude, longitude]);
    userCircle.setRadius(accuracy);


    //update the map view and marker position
    map.setView([latitude, longitude], 15); //zoom to user locaatoin

    //calculate the distance between user and destination
    const userLatLng = L.latLng(latitude, longitude);
    const destLatLng = L.latLng(destinationCoords);
    const distance = userLatLng.distanceTo(destinationCoords);

    //update the pop up with the distance
    userMarker.bindPopup(`Your location <b>distance to ketu</b>: ${(distance / 1000).toFixed(2)} km`).openPopup();
}

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


