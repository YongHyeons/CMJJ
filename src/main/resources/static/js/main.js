"use strict";
function getCsrfToken() {
    const token = document.querySelector('meta[name="_csrf"]').getAttribute('content');
    if (!token) {
        console.error('CSRF token not found');
    }
    return token;
}

document.addEventListener('DOMContentLoaded', function () {


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
				star1.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="star11" fill="none"><path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"stroke="#ffb300" stroke-width="0.5" fill="none"/>';
			}

            if (avgRating >= 1.25 && avgRating < 1.75) {
                star22.setAttribute('style', 'width: 100%; height: auto; fill: rgb(255, 217, 0); clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);');
				star2.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="star22" fill="none"><path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"stroke="#ffb300" stroke-width="0.5" fill="none"/><path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"fill="#ffd900" clip-path="inset(0 50% 0 0)"/></svg>'
            } else if (avgRating >= 1.75) {
                star22.setAttribute('style', 'width: 100%; height: auto; fill: rgb(255, 217, 0);');
			}else{
				star2.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="star11" fill="none"><path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"stroke="#ffb300" stroke-width="0.5" fill="none"/>';

			}

            if (avgRating >= 2.25 && avgRating < 2.75) {
                star33.setAttribute('style', 'width: 100%; height: auto; fill: rgb(255, 217, 0); clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);');
				star3.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="star33" fill="none"><path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"stroke="#ffb300" stroke-width="0.5" fill="none"/><path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"fill="#ffd900" clip-path="inset(0 50% 0 0)"/></svg>'
            } else if (avgRating >= 2.75) {
                star33.setAttribute('style', 'width: 100%; height: auto; fill: rgb(255, 217, 0);');
			}else{
				star3.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="star11" fill="none"><path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"stroke="#ffb300" stroke-width="0.5" fill="none"/>';

			}

            if (avgRating >= 3.25 && avgRating < 3.75) {
                star44.setAttribute('style', 'width: 100%; height: auto; fill: rgb(255, 217, 0); clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);');
				star4.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="star44" fill="none"><path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"stroke="#ffb300" stroke-width="0.5" fill="none"/><path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"fill="#ffd900" clip-path="inset(0 50% 0 0)"/></svg>'
            } else if (avgRating >= 3.75) {
                star44.setAttribute('style', 'width: 100%; height: auto; fill: rgb(255, 217, 0);');
			}else{
				star4.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="star11" fill="none"><path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"stroke="#ffb300" stroke-width="0.5" fill="none"/>';

			}

            if (avgRating >= 4.25 && avgRating < 4.75) {
                star55.setAttribute('style', 'width: 100%; height: auto; fill: rgb(255, 217, 0); clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);');
				star5.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="star55" fill="none"><path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"stroke="#ffb300" stroke-width="0.5" fill="none"/><path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"fill="#ffd900" clip-path="inset(0 50% 0 0)"/></svg>'
            } else if (avgRating >= 4.75) {
                star55.setAttribute('style', 'width: 100%; height: auto; fill: rgb(255, 217, 0);');
			}else{
				star5.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="star11" fill="none"><path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"stroke="#ffb300" stroke-width="0.5" fill="none"/>';

			}
        });
    };

    updateStars();

	setTimeout(updateStars,1000);
});
 new Swiper(".container",{
            slidesPerView:1,
            spaceBetween:500, 
            speed:500,
            allowSlideNext:true,
            allowSlidePrev:true,
            allowTouchMove:true,
            effect:"fade",
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
                clickable : true,
            },
            pagination: {
                el : ".swiper-pagination",
                clickable : true,
                type : 'bullets',
            },
            autoplay: { 
                delay: 3000,
                disableOnInteraction: true, 
            },
            loopAdditionalSlides : 1,

        });
		new Swiper(".classes_container1", {
		    initialSlide: 1,
		    slidesPerView: 3,
		    slidesPerGroup: 3,
		    spaceBetween: 20,
		    centeredSlides: false,
		    freeMode: false,
		    speed: 500,
		    allowSlideNext: true,
		    allowSlidePrev: true,
		    allowTouchMove: true,
		    navigation: {
		        nextEl: ".swiper-button-next",
		        prevEl: ".swiper-button-prev",
		        clickable: true,
		    },
		    slidesOffsetAfter: 0,
		    slidesOffsetBefore: 0,
		    loopFillGroupWithBlank: false,
		    loop: false,
		    on: {
		        resize: function () {
		            this.update();
		        },
		        slideChange: function () {
		            this.update();
		        },
		        init: function () {
		            
		            const heartDivs = document.querySelectorAll('.h1'); 

					heartDivs.forEach(hdiv => {
					                hdiv.addEventListener('click', () => {
					                    const cId = hdiv.getAttribute('data-class-id');
					                    const uId = hdiv.getAttribute('data-user-id');
					                    const isActive = hdiv.classList.contains('active');
										
										if(uId !== null && uId !== ""){
						                    fetch(isActive ? `/api/wishlist/remove?uId=${uId}&cId=${cId}` : `/api/wishlist/add?uId=${uId}&cId=${cId}`, {
						                        method: 'POST',
						                    })
						                    .then(response => response.text())
						                    .then(result => {
						                        if (result === "success") {
						                            hdiv.classList.toggle('active');
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
									
									if(hdiv.getAttribute('data-user-id') !== null && hdiv.getAttribute('data-user-id') !== ""){
						                fetch(`/api/wishlist/check?uId=${hdiv.getAttribute('data-user-id')}&cId=${hdiv.getAttribute('data-class-id')}`, {
						                    method: 'GET', 
						                })
						                .then(response => response.text())
						                .then(result => {
						                    if (result === "true") {
						                        hdiv.classList.add('active');
						                    } else {
						                        hdiv.classList.remove('active');
						                    }
						                })
						                .catch(error => console.error('위시리스트 상태를 가져오는 중 오류 발생:', error));
					                }
					            });
		        },
		    }
		});

        
		new Swiper(".classes_container2", {
		    initialSlide: 1,
		    slidesPerView: 3,
		    slidesPerGroup: 3,
		    spaceBetween: 20,
		    centeredSlides: false,
		    freeMode: false,
		    speed: 500,
		    allowSlideNext: true,
		    allowSlidePrev: true,
		    allowTouchMove: true,
		    navigation: {
		        nextEl: ".swiper-button-next",
		        prevEl: ".swiper-button-prev",
		        clickable: true,
		    },
		    slidesOffsetAfter: 0,
		    slidesOffsetBefore: 0,
		    loopFillGroupWithBlank: false,
		    loop: false,
		    on: {
		        resize: function () {
		            this.update();
		        },
		        slideChange: function () {
		            this.update();
		        },
		        init: function () {
		            const heartDivs = document.querySelectorAll('.h2');

					heartDivs.forEach(hdiv => {
					                hdiv.addEventListener('click', () => {
					                    const cId = hdiv.getAttribute('data-class-id');
					                    const uId = hdiv.getAttribute('data-user-id');
					                    const isActive = hdiv.classList.contains('active');
										
										if(uId !== null && uId !== ""){
						                    fetch(isActive ? `/api/wishlist/remove?uId=${uId}&cId=${cId}` : `/api/wishlist/add?uId=${uId}&cId=${cId}`, {
						                        method: 'POST',
						                    })
						                    .then(response => response.text())
						                    .then(result => {
						                        if (result === "success") {
						                            hdiv.classList.toggle('active'); 
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
									
									if(hdiv.getAttribute('data-user-id') !== null && hdiv.getAttribute('data-user-id') !== ""){
										
						                fetch(`/api/wishlist/check?uId=${hdiv.getAttribute('data-user-id')}&cId=${hdiv.getAttribute('data-class-id')}`, {
						                    method: 'GET',
						                })
						                .then(response => response.text())
						                .then(result => {
						                    if (result === "true") {
						                        hdiv.classList.add('active');
						                    } else {
						                        hdiv.classList.remove('active');
						                    }
						                })
						                .catch(error => console.error('위시리스트 상태를 가져오는 중 오류 발생:', error));
					                }
					            });
		        },
		    }
		});



		new Swiper(".classes_container3", {
		    initialSlide: 1,
		    slidesPerView: 3,
		    slidesPerGroup: 3,
		    spaceBetween: 20,
		    centeredSlides: false, 
		    freeMode: false,
		    speed: 500,
		    allowSlideNext: true,
		    allowSlidePrev: true,
		    allowTouchMove: true,
		    navigation: {
		        nextEl: ".swiper-button-next",
		        prevEl: ".swiper-button-prev",
		        clickable: true,
		    },
		    slidesOffsetAfter: 0,
		    slidesOffsetBefore: 0,
		    loopFillGroupWithBlank: false,
		    loop: false,
		    on: {
		        resize: function () {
		            this.update();
		        },
		        slideChange: function () {
		            this.update();
		        },
		        init: function () {
		            const heartDivs = document.querySelectorAll('.h3');
					heartDivs.forEach(hdiv => {
					                hdiv.addEventListener('click', () => {
					                    const cId = hdiv.getAttribute('data-class-id');
					                    const uId = hdiv.getAttribute('data-user-id');
					                    const isActive = hdiv.classList.contains('active');
										
										if(uId !== null && uId !== ""){
											
						                    fetch(isActive ? `/api/wishlist/remove?uId=${uId}&cId=${cId}` : `/api/wishlist/add?uId=${uId}&cId=${cId}`, {
						                        method: 'POST',
						                    })
						                    .then(response => response.text())
						                    .then(result => {
						                        if (result === "success") {
						                            hdiv.classList.toggle('active');
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
									
									if(hdiv.getAttribute('data-user-id') !== null && hdiv.getAttribute('data-user-id') !== ""){
										
						                fetch(`/api/wishlist/check?uId=${hdiv.getAttribute('data-user-id')}&cId=${hdiv.getAttribute('data-class-id')}`, {
						                    method: 'GET',
						                })
						                .then(response => response.text())
						                .then(result => {
						                    if (result === "true") {
						                        hdiv.classList.add('active');
						                    } else {
						                        hdiv.classList.remove('active');
						                    }
						                })
						                .catch(error => console.error('위시리스트 상태를 가져오는 중 오류 발생:', error));
					                }
					            });
		        },
		    }
		});


new Swiper(".classes_container4", {
    initialSlide: 1,
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 20,
    centeredSlides: false,
    freeMode: false,
    speed: 500,
    allowSlideNext: true,
    allowSlidePrev: true,
    allowTouchMove: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        clickable: true,
    },
    slidesOffsetAfter: 0,
    slidesOffsetBefore: 0,
    loopFillGroupWithBlank: false,
    loop: false,
    on: {
        resize: function () {
            this.update();
        },
        slideChange: function () {
            this.update();
        },
        init: function () {
            
            const heartDivs = document.querySelectorAll('.h4');

            heartDivs.forEach(hdiv => {
                hdiv.addEventListener('click', () => {
                    const cId = hdiv.getAttribute('data-class-id');
                    const uId = hdiv.getAttribute('data-user-id');
                    const isActive = hdiv.classList.contains('active');
					
					if(uId !== null && uId !== ""){
						
	                    fetch(isActive ? `/api/wishlist/remove?uId=${uId}&cId=${cId}` : `/api/wishlist/add?uId=${uId}&cId=${cId}`, {
	                        method: 'POST',
	                    })
	                    .then(response => response.text())
	                    .then(result => {
	                        if (result === "success") {
	                            hdiv.classList.toggle('active'); 
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
				
				if(hdiv.getAttribute('data-user-id') !== null && hdiv.getAttribute('data-user-id') !== ""){
					
	                fetch(`/api/wishlist/check?uId=${hdiv.getAttribute('data-user-id')}&cId=${hdiv.getAttribute('data-class-id')}`, {
	                    method: 'GET',
	                })
	                .then(response => response.text())
	                .then(result => {
	                    if (result === "true") {
	                        hdiv.classList.add('active');
	                    } else {
	                        hdiv.classList.remove('active');
	                    }
	                })
	                .catch(error => console.error('위시리스트 상태를 가져오는 중 오류 발생:', error));
                }
            });
        },
    }
});

