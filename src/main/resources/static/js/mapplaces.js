
let map;
let marker;
let geocoder;

function initMap() {
    const mapDiv = document.getElementById('map');
    const resultsDiv = document.getElementById('results');
    const address = resultsDiv.textContent.trim();

    
    map = new google.maps.Map(mapDiv, {
        center: { lat: 37.5665, lng: 126.978 },
        zoom: 12
    });
    geocoder = new google.maps.Geocoder();

    
    if (address) {
        geocodeAddress(address);
    } else {
        console.error('Address not found in results div.');
    }
}


function geocodeAddress(address) {
    geocoder.geocode({ address: address }, function(results, status) {
        if (status === 'OK') {
            const location = results[0].geometry.location;
            updateMap(location);
        } else {
            console.error('Geocode was not successful for the following reason: ' + status);
        }
    });
}


function updateMap(location) {
    map.setCenter(location);
    if (marker) {
        marker.setMap(null);
    }
    marker = new google.maps.Marker({
        position: location,
        map: map
    });
    map.setZoom(17); 
}

document.addEventListener('DOMContentLoaded', initMap);

