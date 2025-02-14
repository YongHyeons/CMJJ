"use strict";
new Swiper(".container-one", {
    slidesPerView: 4,
    spaceBetween: 10,
    speed: 500,
    allowTouchMove: true, 
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.swiper-slide').forEach(slide => {
        slide.addEventListener('click', function () {
            const imageUrl = this.querySelector('img').src;
            document.getElementById('main-image').src = imageUrl;
        });
    });
});
const buttons = document.querySelectorAll('.cate');
const sections = document.querySelectorAll('.content-section');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));
        button.classList.add('active');
        const targetId = button.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: "start"
            });
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const decreaseButton = document.getElementById('decrease');
    const increaseButton = document.getElementById('increase');
    const participantsInput = document.getElementById('participants');
    const totalPriceElement = document.getElementById('totalPrice');
    const pricePerPersonElement = document.getElementById('pricePerPerson');
    const hiddenTotalPrice = document.getElementById('hiddenTotalPrice');
    const form = document.getElementById('classForm');

    const initialPricePerPerson = parseInt(totalPriceElement.textContent.replace(/[^0-9]/g, ''), 10);
    let pricePerPerson = initialPricePerPerson;

    const updatePrice = () => {
        const numberOfPeople = parseInt(participantsInput.value, 10);
        const totalPrice = pricePerPerson * numberOfPeople;
        totalPriceElement.textContent = `${totalPrice.toLocaleString()}`; 
        pricePerPersonElement.textContent = numberOfPeople.toLocaleString(); 
        hiddenTotalPrice.value = totalPrice;
    };

    decreaseButton.addEventListener('click', () => {
        const currentValue = Math.max(parseInt(participantsInput.value, 10) - 1, 1);
        participantsInput.value = currentValue;
        updatePrice();
    });

    increaseButton.addEventListener('click', () => {
        participantsInput.value = parseInt(participantsInput.value, 10) + 1;
        updatePrice();
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        updatePrice();
        hiddenTotalPrice.value = totalPriceElement.textContent.replace(/[^0-9]/g, ''); 
        form.submit();
    });
    updatePrice();
});

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function updateAmount() {
    const amountElement = document.getElementById('totalPrice');
    const amount = amountElement.textContent || amountElement.innerText;
    const formattedAmount = formatNumber(amount);
    amountElement.textContent = formattedAmount;
}

document.addEventListener('DOMContentLoaded', updateAmount);

let currentContentId = ''; 
function showContent(contentId) {
    const schedule = document.querySelector('.class-schedule');
    const contents = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab button');
    const clickedButton = document.querySelector(`.tab button[onclick="showContent('${contentId}')"]`);
    const clickedContent = document.getElementById(contentId);
    if (contentId === currentContentId) {
        return;
    }
    contents.forEach(content => {
        content.classList.remove('active');
    });
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    clickedContent.classList.add('active');
    clickedButton.classList.add('active');
    if (schedule.style.height === '590px' || schedule.style.height === '') {
        schedule.style.height = '400px';
    }
    else {
        schedule.style.height = '590px';
    }
    currentContentId = contentId;
}
window.addEventListener('load', () => {
    document.querySelector('.class-schedule').style.height = '590px';
    currentContentId = 'content1'; 
    document.getElementById('content1').classList.add('active');
    document.querySelector('.tab button[onclick="showContent(\'content1\')"]').classList.add('active');
    const scheduleAdjustButton = document.getElementById('scheduleAdjustButton');
    if (scheduleAdjustButton) {
        scheduleAdjustButton.addEventListener('click', () => {
            showContent('content2');
        });
    }
});
function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
function getTwoMonthsFromToday() {
    const today = new Date();
    const twoMonthsLater = new Date(today);
    twoMonthsLater.setMonth(today.getMonth() + 2);
    const year = twoMonthsLater.getFullYear();
    const month = String(twoMonthsLater.getMonth() + 1).padStart(2, '0');
    const day = String(twoMonthsLater.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
document.addEventListener('DOMContentLoaded', function () {
    const dateInput = document.getElementById('date');
    const todayDate = getTodayDate();
    dateInput.min = todayDate; 
    dateInput.max = getTwoMonthsFromToday();
    dateInput.value = todayDate;
});
document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper('.container-one', {
        slidesPerView: 4,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        loop: false,
    });
    swiper.update();
});
flatpickr(".date-picker", {
    locale: "ko",
    dateFormat: "Y-m-d",
    defaultDate: "today",
    showMonths: 2,
    minDate: "today",
    maxDate: new Date().fp_incr(60)
});

const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click',()=>{
	if(submitBtn.getAttribute('data-uId') === null || submitBtn.getAttribute('data-uId')===""){
		const userAnswer = confirm('로그인이 필요한 서비스입니다. 로그인하시겠습니까?');
		if(userAnswer){
			window.location.href="/login";
			
		}
		event.preventDefault();
	}
});


const wishlistBtn = document.getElementById('wishlist-button');
wishlistBtn.addEventListener('click',()=>{
	const uId = wishlistBtn.getAttribute('data-uId');
	const cId = wishlistBtn.getAttribute('data-cId');
	if(uId !== null && uId !== ""){
		fetch(`/api/wishlist/add?uId=${uId}&cId=${cId}`,{
			method:'POST'
		}).then(alert('위시리스트에 추가되었습니다!'));
	}else{
		const userAnswer = confirm('로그인이 필요한 서비스입니다. 로그인하시겠습니까?');
		if(userAnswer){
			window.location.href="/login";
		}
	}
});

let descriptionns = document.getElementById('description-temp').getAttribute('data-value');
document.getElementById("description").innerHTML = descriptionns;









