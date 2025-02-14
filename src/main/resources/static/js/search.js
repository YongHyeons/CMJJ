"use strict";
function getCsrfToken() {
    const token = document.querySelector('meta[name="_csrf"]').getAttribute('content');
    if (!token) {
        console.error('CSRF token not found');
    }
    return token;
}
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', function () {
    searchInput.value = searchInput.value;
    searchInput.setAttribute('value', searchInput.value);
});
const input = document.getElementById("searchInput");
const clearIcon = document.getElementById("clearIcon");
input.addEventListener("input", function () {
    if (input.value) {
        clearIcon.classList.add("visible");
    }
    else {
        clearIcon.classList.remove("visible");
    }
});
clearIcon.addEventListener("click", function () {
    input.value = "";
    clearIcon.classList.remove("visible");
    input.focus(); 
});


document.addEventListener('DOMContentLoaded', function () {
    var buttons = document.querySelectorAll('.toggle-btn');
    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    });

    const updateStars = () => {
        const stars = document.querySelectorAll('.stars');
        stars.forEach(starContainer => {
            const star1 = starContainer.getElementsByClassName('star1')[0];
            const star2 = starContainer.getElementsByClassName('star2')[0];
            const star3 = starContainer.getElementsByClassName('star3')[0];
            const star4 = starContainer.getElementsByClassName('star4')[0];
            const star5 = starContainer.getElementsByClassName('star5')[0];
            const star11 = starContainer.getElementsByClassName('star11')[0];
            const star22 = starContainer.getElementsByClassName('star22')[0];
            const star33 = starContainer.getElementsByClassName('star33')[0];
            const star44 = starContainer.getElementsByClassName('star44')[0];
            const star55 = starContainer.getElementsByClassName('star55')[0];
            const avgRating = parseFloat(starContainer.getElementsByClassName('rating')[0].getAttribute('data-value'));

            if (avgRating < 0.5 && avgRating >=0.25) {
                star11.setAttribute('style', 'width: 100%; height: auto; fill: rgb(255, 217, 0); clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);');
				star1.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="star11" fill="none"><path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"stroke="#ffb300" stroke-width="0.5" fill="none"/><path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"fill="#ffd900" clip-path="inset(0 50% 0 0)"/></svg>'
            } else if(avgRating >= 0.5){
                star11.setAttribute('style', 'width: 100%; height: auto; fill: rgb(255, 217, 0);');
            }else{
				star11.setAttribute('style','width : 100%;height : auto;');
				star1.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="star11" fill="none"><path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"stroke="#ffb300" stroke-width="0.5" fill="none"/>';
			}

            if (avgRating >= 1.25 && avgRating < 1.75) {
                star22.setAttribute('style', 'width: 100%; height: auto; fill: rgb(255, 217, 0); clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);');
				star2.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="star22" fill="none"><path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"stroke="#ffb300" stroke-width="0.5" fill="none"/><path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"fill="#ffd900" clip-path="inset(0 50% 0 0)"/></svg>'
            } else if (avgRating >= 1.75) {
                star22.setAttribute('style', 'width: 100%; height: auto; fill: rgb(255, 217, 0);');
			}else{
				star22.setAttribute('style','width : 100%;height : auto;');
				star2.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="star11" fill="none"><path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"stroke="#ffb300" stroke-width="0.5" fill="none"/>';

			}

            if (avgRating >= 2.25 && avgRating < 2.75) {
                star33.setAttribute('style', 'width: 100%; height: auto; fill: rgb(255, 217, 0); clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);');
				star3.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="star33" fill="none"><path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"stroke="#ffb300" stroke-width="0.5" fill="none"/><path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"fill="#ffd900" clip-path="inset(0 50% 0 0)"/></svg>'
            } else if (avgRating >= 2.75) {
                star33.setAttribute('style', 'width: 100%; height: auto; fill: rgb(255, 217, 0);');
			}else{
				star33.setAttribute('style','width : 100%;height : auto;');
				star3.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="star11" fill="none"><path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"stroke="#ffb300" stroke-width="0.5" fill="none"/>';

			}

            if (avgRating >= 3.25 && avgRating < 3.75) {
                star44.setAttribute('style', 'width: 100%; height: auto; fill: rgb(255, 217, 0); clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);');
				star4.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="star44" fill="none"><path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"stroke="#ffb300" stroke-width="0.5" fill="none"/><path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"fill="#ffd900" clip-path="inset(0 50% 0 0)"/></svg>'
            } else if (avgRating >= 3.75) {
                star44.setAttribute('style', 'width: 100%; height: auto; fill: rgb(255, 217, 0);');
			}else{
				star44.setAttribute('style','width : 100%;height : auto;');
				star4.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="star11" fill="none"><path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"stroke="#ffb300" stroke-width="0.5" fill="none"/>';

			}

            if (avgRating >= 4.25 && avgRating < 4.75) {
                star55.setAttribute('style', 'width: 100%; height: auto; fill: rgb(255, 217, 0); clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);');
				star5.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="star55" fill="none"><path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"stroke="#ffb300" stroke-width="0.5" fill="none"/><path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"fill="#ffd900" clip-path="inset(0 50% 0 0)"/></svg>'
            } else if (avgRating >= 4.75) {
                star55.setAttribute('style', 'width: 100%; height: auto; fill: rgb(255, 217, 0);');
			}else{
				star55.setAttribute('style','width : 100%;height : auto;');
				star5.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="star11" fill="none"><path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"stroke="#ffb300" stroke-width="0.5" fill="none"/>';

			}
        });
    };

    updateStars();
	setTimeout(updateStars,1000);
});

const heartDivs = document.querySelectorAll('.heart');
heartDivs.forEach(div => {
    div.addEventListener('click', () => {
        const cId = div.getAttribute('data-class-id');
        const uId = div.getAttribute('data-user-id');
        const isActive = div.classList.contains('active');

		
		if(uId !== null && uId !==""){
        fetch(isActive ? `/api/wishlist/remove?uId=${uId}&cId=${cId}` : `/api/wishlist/add?uId=${uId}&cId=${cId}`, {
            method: 'POST',
        })
        .then(response => response.text())
        .then(result => {
            if (result === "success") {
                div.classList.toggle('active');
            } else {
                console.error(isActive ? '찜 목록에서 제거 실패:' : '찜 목록에 추가 실패:', result);
            }
        })
        .catch(error => console.error(isActive ? '찜 목록에서 제거하는 중 오류 발생:' : '찜 목록에 추가하는 중 오류 발생:', error));
		
		}
		else{
			const answer = confirm('로그인이 필요한 서비스입니다. 로그인하시겠습니까?');
			if(answer){
				window.location.href="/login";
			}
		}
    });
	
	
	if(div.getAttribute('data-user-id')!==null && div.getAttribute('data-user-id')!==""){
    fetch(`/api/wishlist/check?uId=${div.getAttribute('data-user-id')}&cId=${div.getAttribute('data-class-id')}`, {
        method: 'GET',
    })
    .then(response => response.text())
    .then(result => {
        if (result === "true") {
            div.classList.add('active');
        } else {
            div.classList.remove('active'); 
        }
    })
    .catch(error => console.error('위시리스트 상태를 가져오는 중 오류 발생:', error));
	
	}
	
});
const paginationContainer = document.getElementById('pagination');

function getCurrentPageFromURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('page')) || 1;
}

function getSortByFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('sortBy') || 'title';
}

const currentPage = getCurrentPageFromURL();
const sortBy = getSortByFromURL();
const totalPages = parseInt(document.getElementById('total-pages').getAttribute('value'));

function updatePagination() {
    paginationContainer.innerHTML = '';

    const prevLi = document.createElement('li');
    prevLi.innerHTML = `<button class="arrow" onclick="goToPreviousPage()">&#9664;</button>`;
    paginationContainer.appendChild(prevLi);

    const pageButtonsToShow = 5;
    let startPage, endPage;
    if (totalPages <= pageButtonsToShow) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentPage <= Math.ceil(pageButtonsToShow / 2)) {
            startPage = 1;
            endPage = pageButtonsToShow;
        } else if (currentPage + Math.floor(pageButtonsToShow / 2) >= totalPages) {
            startPage = totalPages - pageButtonsToShow + 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - Math.floor(pageButtonsToShow / 2);
            endPage = currentPage + Math.floor(pageButtonsToShow / 2);
        }
    }

    if (startPage > 1) {
        createPageButton(1);
        if (startPage > 2) {
            const dots = document.createElement('li');
            dots.innerHTML = `<span>...</span>`;
            paginationContainer.appendChild(dots);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        createPageButton(i);
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const dots = document.createElement('li');
            dots.innerHTML = `<span>...</span>`;
            paginationContainer.appendChild(dots);
        }
        createPageButton(totalPages);
    }

    const nextLi = document.createElement('li');
    nextLi.innerHTML = `<button class="arrow" onclick="goToNextPage()">&#9654;</button>`;
    paginationContainer.appendChild(nextLi);

    updateActiveButton();
}

function createPageButton(pageNumber) {
    const li = document.createElement('li');
    li.innerHTML = `<button onclick="goToPage(${pageNumber})">${pageNumber}</button>`;
    paginationContainer.appendChild(li);
}

function goToPage(pageNumber) {
	const url = new URL(window.location.href);
	url.searchParams.set('page',pageNumber);
    window.location.href = url.toString();
}

function goToPreviousPage() {
    if (currentPage > 1) {
        goToPage(currentPage - 1);
    }
}

function goToNextPage() {
    if (currentPage < totalPages) {
        goToPage(currentPage + 1);
    }
}

function updateActiveButton() {
    const buttons = document.querySelectorAll('.pagination button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    const activeButton = Array.from(buttons).find(button => parseInt(button.textContent) === currentPage);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

window.onload = function () {
    updatePagination();
};
function toggleDropdown(dropdownId) {
    var dropdown = document.getElementById(dropdownId);
    var button = document.getElementById('regionButton');
    var arrow = button.querySelector('svg');
    var dropdowns = document.getElementsByClassName('dropdown-content');
    for (var i = 0; i < dropdowns.length; i++) {
        if (dropdowns[i] !== dropdown) {
            dropdowns[i].classList.remove('show');
        }
    }
    dropdown.style.top = '48px'; 
    dropdown.style.left = '94px';
    dropdown.style.width = button.offsetWidth + 'px';
    var isShowing = dropdown.classList.toggle('show');
    if (isShowing) {
        arrow.classList.add('arrow-up');
    }
    else {
        arrow.classList.remove('arrow-up');
    }
}
function selectRegion(element) {
    var selectedValue = element.getAttribute('data-value');
    var button = document.getElementById('regionButton');
    button.firstChild.textContent = selectedValue == '' ? '전체' : selectedValue;
    var dropdown = document.getElementById('regionDropdown');
    dropdown.classList.remove('show');
    var arrow = button.querySelector('svg');
    arrow.classList.remove('arrow-up');
}
document.addEventListener('click', function (event) {
    var button = document.getElementById('regionButton');
    var dropdown = document.getElementById('regionDropdown');
    if (!button.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.classList.remove('show');
        button.querySelector('svg').classList.remove('arrow-up');
    }
});
function toggleCategoryDropdown() {
    const dropdown = document.getElementById('categoryDropdown');
    const toggle = document.getElementById('categoryDropdownToggle');
    const arrow = toggle.querySelector('svg');
    const dropdowns = document.getElementsByClassName('category-dropdown-content');
    Array.from(dropdowns).forEach(drop => {
        if (drop !== dropdown) {
            drop.classList.remove('show');
        }
    });
    dropdown.style.top = '48px';
    dropdown.style.left = '94px';
    dropdown.style.width = `${toggle.offsetWidth}px`; 
    const isShowing = dropdown.classList.toggle('show');
    if (isShowing) {
        arrow.classList.add('arrow-up');
    }
    else {
        arrow.classList.remove('arrow-up');
    }
}
function selectCategory(element) {
    const selectedValue = element.getAttribute('data-value');
    const toggle = document.getElementById('categoryDropdownToggle');
    toggle.firstChild.textContent = element.textContent;
    const dropdown = document.getElementById('categoryDropdown');
    dropdown.classList.remove('show');
    const arrow = toggle.querySelector('svg');
    arrow.classList.remove('arrow-up');

    const subContent = document.getElementById('subContent')
    subContent.style.display = "none";
}
function enterCategory(element) {
    if (element.dataset.sub) {
        let subContent = document.getElementById('subContent');
        subContent.innerHTML = ""; 
        subContent.style.display = "block";
        for (let sub of element.dataset.sub.split(",")) {
            let subItemWrapper = document.createElement('div');
            subItemWrapper.classList.add('sub-item-wrapper');
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('category-checkbox');
            checkbox.dataset.value = sub;
            let subitem = document.createElement('div');
            subitem.classList.add('category-item');
            subitem.textContent = sub;
            subItemWrapper.appendChild(checkbox);
            subItemWrapper.appendChild(subitem);
            subContent.appendChild(subItemWrapper);
        }
        let settingsButtonContainer = document.createElement('div');
        settingsButtonContainer.classList.add('settings-button-container');
        let settingsButton = document.createElement('button');
        settingsButton.classList.add('settings-button');
        settingsButton.textContent = "설정";
        settingsButton.addEventListener('click', function (e) {
            e.preventDefault();
            displaySelectedCategories(); 
			if (subContent.style.display === "none" || subContent.style.display === "") {
			    subContent.style.display = "block"; 
			} else {
			    subContent.style.display = "none";
			}

			const categoryDropdown = document.getElementById('categoryDropdown');
			const icon = document.getElementById('categoryIconSvg');

			if (categoryDropdown.classList.contains('show')) {
			    categoryDropdown.classList.remove('show'); 
			    icon.classList.remove('arrow-up'); 
			    icon.classList.add('closed');
			} else {
			    categoryDropdown.classList.add('show'); 
			    icon.classList.remove('closed'); 
			    icon.classList.add('arrow-up');
			}
        });
        settingsButtonContainer.appendChild(settingsButton);
        subContent.appendChild(settingsButtonContainer);
		
		
    }
    else {
        let subContent = document.getElementById('subContent');
        subContent.innerHTML = ""; // 기존 내용 삭제
        subContent.style.display = "none"; // 서브 카테고리 숨기기
    }
}
function displaySelectedCategories() {
    let selectedCheckboxes = document.querySelectorAll('#subContent .category-checkbox:checked');
    let selectedCategories = Array.from(selectedCheckboxes).map(cb => cb.dataset.value);
    const categoryTwoContainer = document.querySelector('.category-two');
    categoryTwoContainer.innerHTML = ''; 
    if (selectedCategories.length > 0) {
        selectedCategories.forEach(category => {
            const categoryItem = document.createElement('div');
            categoryItem.classList.add('category-two-item');
			if(category === '캔들·디퓨저')categoryItem.setAttribute('data-value','11');
			else if (category === '향수') categoryItem.setAttribute('data-value', '12');
			else if (category === '비누·배쓰밤') categoryItem.setAttribute('data-value', '13');
			else if (category === '액세서리') categoryItem.setAttribute('data-value', '14');
			else if (category === '가죽') categoryItem.setAttribute('data-value', '15');
			else if (category === '베이킹') categoryItem.setAttribute('data-value', '16');
			else if (category === '요리') categoryItem.setAttribute('data-value', '17');
			else if (category === '떡·앙금') categoryItem.setAttribute('data-value', '18');
			else if (category === '디저트·음료') categoryItem.setAttribute('data-value', '19');
			else if (category === '커피·바리스타') categoryItem.setAttribute('data-value', '20');
			else if (category === '소묘') categoryItem.setAttribute('data-value', '21');
			else if (category === '펜화') categoryItem.setAttribute('data-value', '22');
			else if (category === '캘리그라피') categoryItem.setAttribute('data-value', '23');
			else if (category === '수채화') categoryItem.setAttribute('data-value', '24');
			else if (category === '동양화') categoryItem.setAttribute('data-value', '25');
			else if (category === '피아노') categoryItem.setAttribute('data-value', '26');
			else if (category === '우쿠렐레') categoryItem.setAttribute('data-value', '27');
			else if (category === '보컬') categoryItem.setAttribute('data-value', '28');
			else if (category === '작사·작곡') categoryItem.setAttribute('data-value', '29');
			else if (category === '프로듀싱') categoryItem.setAttribute('data-value', '30');
			else if (category === '요가') categoryItem.setAttribute('data-value', '31');
			else if (category === '필라테스') categoryItem.setAttribute('data-value', '32');
			else if (category === '피트니스') categoryItem.setAttribute('data-value', '33');
			else if (category === '실내 운동') categoryItem.setAttribute('data-value', '34');
			else if (category === '야외 운동') categoryItem.setAttribute('data-value', '35');
			else if (category === '댄스') categoryItem.setAttribute('data-value', '36');
			else if (category === '레저') categoryItem.setAttribute('data-value', '37');
			else if (category === '메이크업') categoryItem.setAttribute('data-value', '38');
			else if (category === '헤어') categoryItem.setAttribute('data-value', '39');
			else if (category === '네일아트') categoryItem.setAttribute('data-value', '40');
			else if (category === '타투') categoryItem.setAttribute('data-value', '41');
			else if (category === '셀프케어') categoryItem.setAttribute('data-value', '42');
			else if (category === '펫 푸드') categoryItem.setAttribute('data-value', '43');
			else if (category === '펫 에티켓') categoryItem.setAttribute('data-value', '44');
			else if (category === '펫 액세서리') categoryItem.setAttribute('data-value', '45');
			else if (category === '펫 미용') categoryItem.setAttribute('data-value', '46');
			else if (category === '기타 펫 클래스') categoryItem.setAttribute('data-value', '47');
			
            const categoryText = document.createElement('span');
            categoryText.textContent = category;
            categoryItem.appendChild(categoryText);
            const removeIcon = document.createElement('span');
            removeIcon.innerHTML = `
                <svg  xmlns="http://www.w3.org/2000/svg" version="1.0" width="20px" height="20px" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#123364" stroke="none"><path d="M2325 5110 c-609 -62 -1151 -316 -1575 -740 -405 -405 -655 -917 -732 -1500 -16 -123 -16 -497 0 -620 77 -583 327 -1095 732 -1500 405 -405 917 -655 1500 -732 123 -16 497 -16 620 0 1065 141 1912 888 2170 1912 150 597 85 1213 -187 1767 -375 764 -1116 1292 -1973 1403 -115 15 -444 21 -555 10z m-574 -1455 c19 -10 208 -191 422 -403 l387 -387 388 387 c213 212 402 393 421 403 18 9 56 19 85 22 43 4 60 0 106 -24 77 -41 115 -103 114 -187 0 -38 -7 -74 -18 -96 -10 -19 -192 -209 -404 -422 l-387 -388 387 -387 c212 -214 393 -403 403 -422 9 -18 19 -56 22 -85 10 -105 -81 -211 -192 -223 -97 -11 -104 -6 -533 421 l-392 391 -388 -387 c-213 -212 -403 -394 -422 -404 -22 -11 -57 -18 -95 -19 -121 0 -210 89 -210 210 1 38 8 73 19 95 10 19 192 209 404 423 l387 387 -387 388 c-212 213 -394 403 -404 422 -11 22 -18 58 -18 96 -1 84 37 146 114 187 46 24 63 28 106 24 29 -3 67 -13 85 -22z"/></g></svg>
            `;
            removeIcon.classList.add('remove-icon');
            removeIcon.addEventListener('click', function () {
                categoryItem.remove();
                const checkbox = document.querySelector(`#subContent .category-checkbox[data-value="${category}"]`);
                if (checkbox) {
                    checkbox.checked = false;
                }
                if (categoryTwoContainer.children.length === 0) {
                    categoryTwoContainer.textContent = '선택된 카테고리가 없습니다.';
                }
            });
            categoryItem.appendChild(removeIcon);
            categoryTwoContainer.appendChild(categoryItem);
        });
		updateHiddenInput();
    }
    else {
        categoryTwoContainer.textContent = '선택된 카테고리가 없습니다.';
		document.querySelector('#subCategoryId').value = '';
    }
}
function updateHiddenInput() {
    const selectedValues = Array.from(document.querySelectorAll('.category-two-item'))
        .map(item => item.getAttribute('data-value'));
    document.querySelector('#subCategoryId').value = selectedValues.join(',');
}
document.addEventListener('click', event => {
    const toggle = document.getElementById('categoryDropdownToggle');
    const dropdown = document.getElementById('categoryDropdown');
    const subContent = document.getElementById('subContent');
    if (!toggle.contains(event.target) && !dropdown.contains(event.target) && !subContent.contains(event.target)) {
        dropdown.classList.remove('show');
        subContent.style.display = "none";
        toggle.querySelector('svg').classList.remove('arrow-up');
    }
});


function togglePersonDropdown() {
    const dropdown = document.getElementById('personDropdown');
    const toggle = document.getElementById('personDropdownToggle');
    const icon = document.getElementById('personSelectIcon');
    const isShowing = dropdown.classList.toggle('show');
    if (isShowing) {
        icon.classList.add('arrow-up');
    }
    else {
        icon.classList.remove('arrow-up');
    }
}
function selectPerson(element) {
    const selectedText = element.textContent;
    const dropdownToggle = document.getElementById('personDropdownToggle');
    dropdownToggle.firstChild.textContent = selectedText;
    const dropdown = document.getElementById('personDropdown');
    dropdown.classList.remove('show');
    const icon = document.getElementById('personSelectIcon');
    icon.classList.remove('arrow-up');
}
document.addEventListener('click', event => {
    const toggle = document.getElementById('personDropdownToggle');
    const dropdown = document.getElementById('personDropdown');
    if (!toggle.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.classList.remove('show');
        document.getElementById('personSelectIcon').classList.remove('arrow-up');
    }
});
function toggleTimeDropdown() {
    const dropdown = document.getElementById('timeDropdown');
    const toggle = document.getElementById('timeDropdownToggle');
    const arrow = toggle.querySelector('svg');
    closeAllDropdowns(dropdown);
    setDropdownPosition(dropdown, toggle);
    const isShowing = dropdown.classList.toggle('show');
    toggleArrowRotation(arrow, isShowing);
}
function selectTime(element) {
    updateSelection(element, 'timeDropdown', 'timeDropdownToggle');
}
function toggleAmountDropdown() {
    const dropdown = document.getElementById('amountDropdown');
    const toggle = document.getElementById('amountDropdownToggle');
    const arrow = toggle.querySelector('svg');
    closeAllDropdowns(dropdown);
    setDropdownPosition(dropdown, toggle);
    const isShowing = dropdown.classList.toggle('show');
    toggleArrowRotation(arrow, isShowing);
}
function selectAmount(element) {
    updateSelection(element, 'amountDropdown', 'amountDropdownToggle');
}
function closeAllDropdowns(except) {
    const dropdowns = document.querySelectorAll('.dropdown-content');
    dropdowns.forEach(drop => {
        if (drop !== except) {
            drop.classList.remove('show');
            const arrow = drop.previousElementSibling.querySelector('svg');
            if (arrow) {
                arrow.classList.remove('arrow-up');
            }
        }
    });
}
function setDropdownPosition(dropdown, toggle) {
    dropdown.style.top = '48px';
    dropdown.style.left = '94px'; 
    dropdown.style.width = `${toggle.offsetWidth}px`;
}
function toggleArrowRotation(arrow, isShowing) {
    if (isShowing) {
        arrow.classList.add('arrow-up');
    }
    else {
        arrow.classList.remove('arrow-up');
    }
}
function updateSelection(element, dropdownId, toggleId) {
    const selectedValue = element.getAttribute('data-value');
    const toggle = document.getElementById(toggleId);
    toggle.firstChild.textContent = element.textContent; 
    const dropdown = document.getElementById(dropdownId);
    dropdown.classList.remove('show');
    const arrow = toggle.querySelector('svg');
    arrow.classList.remove('arrow-up');
}
document.addEventListener('click', event => {
    const dropdowns = document.querySelectorAll('.dropdown-content');
    const toggles = document.querySelectorAll('.dropdown-toggle');
    dropdowns.forEach(dropdown => {
        if (!dropdown.contains(event.target) && !dropdown.previousElementSibling.contains(event.target)) {
            dropdown.classList.remove('show');
            const arrow = dropdown.previousElementSibling.querySelector('svg');
            if (arrow) {
                arrow.classList.remove('arrow-up');
            }
        }
    });
});
function toggleCustomSelect() {
    const selectWrapper = document.querySelector('.custom-select-wrapper');
    const options = selectWrapper.querySelector('.custom-options');
    const isOpen = options.style.display === 'block';
    document.querySelectorAll('.custom-options').forEach(option => {
        option.style.display = 'none';
    });
    options.style.display = isOpen ? 'none' : 'block';
}
function selectOption(element) {
    const selectedValue = element.getAttribute('data-value');
	const sortBy = element.getAttribute('data-criteria');
    const select = document.querySelector('.custom-select');
    select.textContent = selectedValue;
    document.querySelector('.custom-options').style.display = 'none';
   const currentUrl = new URL(window.location.href);
   if(currentUrl.toString().endsWith('search')){currentUrl = currentUrl + '/results';}
   currentUrl.searchParams.set('sortBy', sortBy);
   window.location.href = currentUrl.toString();
}
document.addEventListener('click', event => {
    const selectWrapper = document.querySelector('.custom-select-wrapper');
    const isClickInside = selectWrapper.contains(event.target);
    if (!isClickInside) {
        document.querySelectorAll('.custom-options').forEach(option => {
            option.style.display = 'none';
        });
    }
});
document.querySelector('.custom-select').addEventListener('click', toggleCustomSelect);
document.querySelectorAll('.custom-option').forEach(option => {
    option.addEventListener('click', function () {
        selectOption(this);
    });
});
document.getElementById('resetButton').addEventListener('click', function () {
    const inputIds = ['searchInput', 'cAddr', 'mainCategoryId', 'duration', 'difficulty', 'price'];
    inputIds.forEach(function(id) {
        document.getElementById(id).value = "";
    });
    const regionButton = document.getElementById('regionButton');
    if (regionButton) {
        regionButton.innerHTML = `전체
        <svg id="regionIconSvg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="select-icon">
            <path d="M7.41 8.58984L12 13.1698L16.59 8.58984L18 9.99984L12 15.9998L6 9.99984L7.41 8.58984Z" fill="#1F283D"></path>
        </svg>`;
    }
    const categoryButton = document.getElementById('categoryDropdownToggle');
    if (categoryButton) {
        categoryButton.innerHTML = `전체
        <svg id="categoryIconSvg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="select-icon">
            <path d="M7.41 8.58984L12 13.1698L16.59 8.58984L18 9.99984L12 15.9998L6 9.99984L7.41 8.58984Z" fill="#1F283D"></path>
        </svg>`;
    }

    document.querySelectorAll('.toggle-btn').forEach(button => {
        if (button.classList) {
            button.classList.remove('active');
        }
    });

    const personDropdownToggle = document.getElementById('personDropdownToggle');
    if (personDropdownToggle) {
        personDropdownToggle.innerHTML = `
            선택 안함
            <svg id="personSelectIcon" width="24" height="24" viewBox="0 0 24 24" fill="none" class="select-icon">
                <path d="M7.41 8.58984L12 13.1698L16.59 8.58984L18 9.99984L12 15.9998L6 9.99984L7.41 8.58984Z" fill="#1F283D"></path>
            </svg>`;
    }

    const timeDropdownToggle = document.getElementById('timeDropdownToggle');
    if (timeDropdownToggle) {
        timeDropdownToggle.innerHTML = `선택 안함
        <svg id="timeSelectIcon" width="24" height="24" viewBox="0 0 24 24" fill="none" class="select-icon">
            <path d="M7.41 8.58984L12 13.1698L16.59 8.58984L18 9.99984L12 15.9998L6 9.99984L7.41 8.58984Z" fill="#1F283D"></path>
        </svg>`;
    }

    const amountDropdownToggle = document.getElementById('amountDropdownToggle');
    if (amountDropdownToggle) {
        amountDropdownToggle.innerHTML = `선택 안함
        <svg id="amountSelectIcon" width="24" height="24" viewBox="0 0 24 24" fill="none" class="select-icon">
            <path d="M7.41 8.58984L12 13.1698L16.59 8.58984L18 9.99984L12 15.9998L6 9.99984L7.41 8.58984Z" fill="#1F283D"></path>
        </svg>`;
    }

    const selectText = document.getElementById('select-text');
    if (selectText) {
        selectText.innerText = '선택 안함';
    }

    document.querySelectorAll('#btn3').forEach(button => {
        if (button.classList) {
            button.classList.remove('active');
        }
    });

    const sortBySelect = document.getElementById('sortBy');
    if (sortBySelect) {
        sortBySelect.value = 'title'; 
		const customSelect = document.querySelector('.custom-select');
        if (customSelect) {
            customSelect.textContent = '정렬 기준';
		}
    }
});

const localOptions = document.querySelectorAll('.local-div');

        localOptions.forEach(option => {
            option.addEventListener('click', function() {
                const selectedValue = this.getAttribute('data-value');
                document.getElementById('cAddr').value = selectedValue;
            });
        });
const mainCategoryOptions = document.querySelectorAll('.category-item');
        mainCategoryOptions.forEach(option => {
            option.addEventListener('click', function() {
                const selectedValue = this.getAttribute('data-value');
                document.getElementById('mainCategoryId').value = selectedValue;
            });
        });
let selectedDifficulties = [];
const difficultyOptions = document.querySelectorAll('.toggle-btn');
        difficultyOptions.forEach(option => {
            option.addEventListener('click', function() {
                const selectedValue = this.getAttribute('data-value');
				const valueIndex = selectedDifficulties.indexOf(selectedValue);

				                if (valueIndex === -1) {
				                    selectedDifficulties.push(selectedValue);
				                    this.classList.add('selected');
				                } else {
				                    selectedDifficulties.splice(valueIndex, 1);
				                    this.classList.remove('selected');
				                }
				document.getElementById('difficulty').value = selectedDifficulties.join(',');
            });
        });
const durationOptions = document.querySelectorAll('.dropdown-item');
        durationOptions.forEach(option => {
            option.addEventListener('click', function() {
                const selectedValue = this.getAttribute('data-value');
                document.getElementById('duration').value = selectedValue;
            });
        });
const priceOptions = document.querySelectorAll('.dropdown-item1');
priceOptions.forEach(option => {
    option.addEventListener('click', function() {
        const selectedValue = this.getAttribute('data-value');
        document.getElementById('price').value = selectedValue;
	});
});

function sortGridItems(criteria) {
    const container = document.getElementById('grid-container');
    const items = Array.from(container.getElementsByClassName('grid-item'));

    items.sort((a, b) => {
        const aValue = parseFloat(a.getAttribute(`data-${criteria.attribute}`)) || 0;
        const bValue = parseFloat(b.getAttribute(`data-${criteria.attribute}`)) || 0;

        if (criteria.order === 'desc') {
            return bValue - aValue;
        } else {
            return aValue - bValue;
        }
    });

    container.innerHTML = '';
    items.forEach(item => container.appendChild(item));
}

function handleSortOptionSelect(element) {
    const criteria = element.getAttribute('data-criteria');
    const [attribute, order] = criteria.split('-');

    sortGridItems({ attribute, order });
}


document.querySelectorAll('.custom-option').forEach(option => {
    option.addEventListener('click', function () {
        handleSortOptionSelect(this);
    });
});
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCriteria = urlParams.get('sortBy');
    
    if (selectedCriteria) {
        const select = document.querySelector('.custom-select');
        const options = document.querySelectorAll('.custom-option');
        options.forEach(option => {
            if (option.getAttribute('data-criteria') === selectedCriteria) {
                select.textContent = option.getAttribute('data-value');
            }
        });
    }
});

