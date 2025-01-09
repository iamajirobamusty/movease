// Initialize the map and set its view to a chosen geographical point
const map = L.map('map').setView([0, 0], 2);
const searchIcon = document.getElementById('search-icon');
const searchInput = document.getElementById('search-input');

// Add a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
}).addTo(map);

// Add a marker for the user location
const userMarker = L.marker([0, 0]).addTo(map).bindPopup("Your location");

// Destination coordinates (Ketu, Lagos)
const destinationCoords = [6.5973, 3.3904];
const destinationMarker = L.marker(destinationCoords).addTo(map).bindPopup('Ketu Lagos');

let routeControl; // Declare the routing control

// Add a circle (default position and size)

function updateLocation(position) {
    const { latitude, longitude, accuracy } = position.coords;

    // Update user marker and circle
    userMarker.setLatLng([latitude, longitude]).openPopup();

    // Update the map view and marker position
    map.setView([latitude, longitude], 15);

    // Calculate the distance between user and destination
    const userLatLng = L.latLng(latitude, longitude);
    const destLatLng = L.latLng(destinationCoords);
    const distance = userLatLng.distanceTo(destLatLng);


    // Update the pop-up with the distance
    userMarker.bindPopup(`Your location<br>Distance to Ketu: ${(distance / 1000).toFixed(2)} km`).openPopup();

    // Remove existing routing control if it exists
    if (routeControl) {
        map.removeControl(routeControl);
    }

    // Add the routing control for the shortest route
    routeControl = L.Routing.control({
        waypoints: [
            L.latLng(latitude, longitude), // User's current location
            L.latLng(destinationCoords),  // Destination
        ],
        lineOptions: {
            styles: [{ color: 'blue', weight: 5 }]
        },
        showAlternatives: true

    }).addTo(map);

}

// Handle error in getting location
function handleLocationError(error) {
    console.error('Unable to get location', error.message);
    alert('Unable to retrieve location. Please enable location services.');
}

// Request the user's location and update map dynamically
if (navigator.geolocation) {
    navigator.geolocation.watchPosition(updateLocation, handleLocationError, {
        enableHighAccuracy: true,
        maximumAge: 0,
    });
} else {
    alert('Geolocation is not supported by your browser.');
}


searchIcon.addEventListener('click', () => {
    const searchQuery = serchInput.value().trim();
    if (searchQuery) {
        window.location.href = `/search?query=${encodeURIComponent(searchQuery)}`
    } else {
        alert('Please enter a valid email');
    }
})