"use strict";

let map;
let marker;
let geocoder;
let autocomplete;

function initAutocomplete() {
    const searchButton = document.getElementById('searchButton');
    const searchPopup = document.getElementById('searchPopup');
    const input = document.getElementById('addressInput');
    const selectedAddressContainer = document.getElementById('selectedAddressContainer');
    const resultsDiv = document.getElementById('results');
    const closeButton = document.getElementById('closeButton');
    const submitButton = document.getElementById('submitButton');
    const confirmButton = document.getElementById('confirmButton');
    const mapDiv = document.getElementById('map');

    map = new google.maps.Map(mapDiv, {
        center: { lat: 37.5665, lng: 126.978 },
        zoom: 12
    });
    geocoder = new google.maps.Geocoder();
    
    autocomplete = new google.maps.places.Autocomplete(input, {
        types: ['address'], 
        componentRestrictions: { country: 'kr' } 
    });
    autocomplete.addListener('place_changed', function() {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
            console.log("No details available for input: '" + place.name + "'");
            return;
        }

        
        updateMap(place.geometry.location);
        selectedAddressContainer.value = place.formatted_address;
        searchPopup.style.display = 'none'; 
    });

    // Event handlers
    searchButton.addEventListener('click', function() {
        searchPopup.style.display = 'block';
        input.focus();
    });

    closeButton.addEventListener('click', function() {
        searchPopup.style.display = 'none';
    });

    submitButton.addEventListener('click', function(event) {
        event.preventDefault(); 
        const query = input.value;

        if (query.length < 3) {
            resultsDiv.innerHTML = '<div>검색어는 3자 이상 입력해야 합니다.</div>';
            return;
        }

        fetch(`/autocomplete?input=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                resultsDiv.innerHTML = '';
                if (data.predictions && data.predictions.length > 0) {
                    data.predictions.forEach(prediction => {
                        const div = document.createElement('div');
                        div.textContent = prediction.description;
                        div.onclick = () => {
                            fetchPlaceDetails(prediction.place_id);
                            selectedAddressContainer.value = prediction.description;
                            searchPopup.style.display = 'none';
                        };
                        resultsDiv.appendChild(div);
                    });
                } else {
                    resultsDiv.innerHTML = '<div>검색 결과가 없습니다.</div>';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                resultsDiv.innerHTML = '<div>검색 오류가 발생했습니다.</div>';
            });
    });

    confirmButton.addEventListener('click', function(event) {
        event.preventDefault(); 
        if (selectedAddressContainer.value) {
            geocoder.geocode({ address: selectedAddressContainer.value }, function(results, status) {
                if (status === 'OK') {
                    updateMap(results[0].geometry.location);
                    searchPopup.style.display = 'none';
                } else {
                    alert('주소를 찾을 수 없습니다.');
                }
            });
        } else {
            alert('주소를 선택해 주세요.');
        }
    });

    function fetchPlaceDetails(placeId) {
        const service = new google.maps.places.PlacesService(map);
        service.getDetails({ placeId: placeId }, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                if (place.geometry && place.geometry.location) {
                    updateMap(place.geometry.location);
                } else {
                    console.error('Place details do not have geometry or location');
                }
            } else {
                console.error('Error fetching place details:', status);
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
}

document.addEventListener('DOMContentLoaded', initAutocomplete);

const addressInput1 = document.getElementById('selectedAddressContainer');
const addressInput2 = document.getElementById('selectedAddressContainer2');
const checkInputs = () => {
    if (addressInput1.value.trim() !== '' && addressInput2.value.trim() !== '') {
        nextButton7.style.pointerEvents = 'auto'; 
        nextButtonColor7.setAttribute('style', 'color: white; font-weight: 600;'); 
        nextButton7.style.pointerEvents = 'auto'; 
        nextButton7.style.backgroundColor = 'rgb(18,51,100)';
        nextButton7.style.opacity = '1';
    }
    else {
        nextButton7.style.pointerEvents = 'none';
        nextButtonColor7.setAttribute('style', 'color: darkgray; font-weight: 600;');
        nextButton7.style.pointerEvents = 'none';
        nextButton7.style.backgroundColor = 'rgba(18,51,100,0.1)';
    }
};
addressInput1.addEventListener('input', checkInputs);
addressInput2.addEventListener('input', checkInputs);
const nextButton7 = document.getElementById('next_button7');
const prevButton7 = document.getElementById('prev_button7');
const prevButtonColor7 = document.getElementById('prev-button-color7');
const nextButtonColor7 = document.getElementById('next-button-color7');
nextButton7.style.pointerEvents = 'none';
prevButton7.style.pointerEvents = 'auto';
function prevUpdateRegistrationDisplaySection7() {
    subName5.style.color = 'rgb(18,51,100);';
    subName5.style.fontWeight = 'bold';
    subName5.style.opacity = '1';
    subName6.style.color = 'rgb(18,51,100);';
    subName6.style.fontWeight = '400';
    subName6.style.opacity = '0.5';
    replaceSvgElement('mark_svg2-5', originalMarkSvg);
}
function nextUpdateRegistrationDisplaySection7() {
    subName6.style.color = 'rgb(18,51,100);';
    subName6.style.fontWeight = '400';
    subName6.style.opacity = '0.5';
    subName7.style.color = 'rgb(18,51,100);';
    subName7.style.fontWeight = 'bold';
    subName7.style.opacity = '1';
    replaceSvgElement('mark_svg2-6', newmarkSvg);
}
if (prevButton7 && nextButton7) {
    prevButton7.addEventListener('click', goToPreviousPageForOrder);
    nextButton7.addEventListener('click', goToNextPageForOrder);
}
else {
    console.error('버튼 요소를 찾을 수 없습니다.');
}
prevButton7.addEventListener('click', () => {
	window.scrollTo({ top: 0 });
    prevUpdateRegistrationDisplaySection7();
    stepActive7.style.display = 'none';
    stepActive6.style.display = 'block';
    console.log("Button clicked!");
});
const stepActive8 = document.getElementById('step-active8');
nextButton7.addEventListener('click', () => {
	window.scrollTo({ top: 0 });
	nextUpdateRegistrationDisplaySection7();
    stepActive7.style.display = 'none';
    stepActive8.style.display = 'flex';
    console.log('Button clicked!');
});
