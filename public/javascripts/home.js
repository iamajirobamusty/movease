//Initialize the map and set its view to a chosen geographical point
const map = L.map('map').setView([6.5826, 3.3874], 15);

//add a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
}).addTo(map);

//add a marker
const marker = L.marker([6.5826, 3.3874]).addTo(map);
marker.bindPopup('Ojota Lagos Nigeria').openPopup();

//add a circle
const circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);
circle.bindPopup('Iam a circle')
