"use strict";

function getCsrfToken() {
    const token = document.querySelector('meta[name="_csrf"]').getAttribute('content');
    if (!token) {
        console.error('CSRF token not found');
    }
    return token;
}
function toggleVisibility(contentId, toggleElement) {
    const content = document.getElementById(contentId);
    const icon = toggleElement.querySelector('.select-icon');
    const classHead = toggleElement; 
    if (content.style.display === "none" || content.style.display === "") {
        content.style.display = "block";
        classHead.style.borderRadius = "5px 5px 0 0"; 
        icon.classList.add('rotated');
    }
    else {
        content.style.display = "none";
        classHead.style.borderRadius = "5px";
        icon.classList.remove('rotated');
    }
}
const modal = document.getElementById("editModal");
const editBtn = document.getElementById("editBtn");
const cancelBtn = document.getElementById("cancelBtn");
const saveBtn = document.getElementById("saveBtn");
const nicknameInput = document.getElementById("nickname");
const charCounter = document.getElementById("charCounter");
const phoneInput = document.getElementById("phone");
const displayNickname = document.getElementById("displayNickname");

editBtn.type = "button";
cancelBtn.type = "button";
saveBtn.type = "button";

editBtn.onclick = function () {
    modal.style.display = "flex";
};

cancelBtn.onclick = function () {
    modal.style.display = "none";
};
saveBtn.onclick = function () {
    const nicknameValue = nicknameInput.value;
    displayNickname.textContent = nicknameValue;
    modal.style.display = "none";
};
nicknameInput.addEventListener("input", function () {
    const currentLength = nicknameInput.value.length;
    charCounter.textContent = `${currentLength}/10`;
});
phoneInput.addEventListener("input", function () {
    let phone = phoneInput.value.replace(/[^0-9]/g, ''); 
    if (phone.length >= 3 && phone.length <= 7) {
        phone = phone.replace(/(\d{3})(\d+)/, '$1-$2');
    }
    else if (phone.length >= 8) {
        phone = phone.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3');
    }
    phoneInput.value = phone;
    const phoneBtn = document.getElementById("phoneBtn");
    if (phone.replace(/-/g, '').length === 11) {
        phoneBtn.classList.add('active');
    }
    else {
        phoneBtn.classList.remove('active');
    }
});
window.onclick = function (event) {
    if (event.target == modal || event.target == couponModal) {
        modal.style.display = "none";
        couponModal.style.display = "none";
    }
};
const couponModal = document.getElementById("couponModal");
const couponBtn = document.getElementById("applyCouponBtn");
const couponClose = document.querySelector(".coupon-close");
couponBtn.onclick = function () {
    couponModal.style.display = "block";
};
couponClose.onclick = function () {
    couponModal.style.display = "none";
};
window.onclick = function (event) {
    if (event.target == couponModal) {
        couponModal.style.display = "none";
    }
};

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function updateAmount() {
    const amountElement1 = document.getElementById('amount1');
    const amountElement2 = document.getElementById('amount2');
    const amountElement3 = document.getElementById('amount3');
	
    const amount1 = amountElement1.textContent || amountElement1.innerText;
    const formattedAmount1 = formatNumber(amount1);
    amountElement1.textContent = formattedAmount1;
    const amount2 = amountElement2.textContent || amountElement2.innerText;
    const formattedAmount2 = formatNumber(amount2);
    amountElement2.textContent = formattedAmount2;
    const amount3 = amountElement3.textContent || amountElement3.innerText;
    const formattedAmount3 = formatNumber(amount3);
    amountElement3.textContent = formattedAmount3;
}

document.addEventListener('DOMContentLoaded',()=>{
	updateAmount();
});
const paymodal = document.getElementById('paymodal');
const payButton = document.getElementById('pay-button');

payButton.addEventListener('click', () => {
    paymodal.style.display = 'flex';
});

window.addEventListener('click', (event) => {
    if (event.target === paymodal) {
        paymodal.style.display = 'none';
    }
});



const payButtonTwo = document.getElementById('pay-button-two');
payButtonTwo.addEventListener('click', () => {
    const infoDiv = document.getElementById("detail_info_for_process");

    const credit = parseInt(document.getElementById('userCredit').getAttribute('data-credit'));
    const totalPrice = parseInt(document.getElementById('amount2').getAttribute('data-value'));
    const creditInput = document.getElementById('user_credit_input');
    const creditInputValue = parseInt(creditInput.value) || 0;  // 기본값 0
    const finalPay = document.getElementById('amount3');
    const finalPayValue = parseInt(finalPay.getAttribute('data-value'));
    const uId = infoDiv.getAttribute("data-uId");
    const cId = infoDiv.getAttribute("data-cId");
    const participants = infoDiv.getAttribute("data-participants");
    const totalPrice2 = infoDiv.getAttribute("data-totalPrice");
    const givenCredit = parseInt(finalPayValue / 100);

    let cpCode = infoDiv.getAttribute('data-code');
    if (!cpCode || cpCode === null) {
        cpCode = 'none';
    }

	fetch('/payment/process', {
	    method: 'POST',
	    headers: {
	        'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({
	        uId: uId,
	        cId: cId,
	        participants: participants,
	        totalPrice: totalPrice2,
	        usedCredit: creditInputValue ? creditInputValue : 0,
	        givenCredit: givenCredit ? givenCredit : 0,
	        cpCode: cpCode
	    })
	})
    .then(response => {
        if (response.ok) {
            const creditUsagePromise = creditInputValue > 0
                ? fetch(`/useCredit?credit=${creditInputValue}`, { method: 'POST' })
                : Promise.resolve();

            creditUsagePromise
            .then(() => fetch(`/giveCredit?finalPay=${finalPayValue}`, { method: 'POST' }))
            .then(() => {
                window.location.href = `/view/${cId}`;
            });
        } else {
            console.error('신청 처리 중 오류 발생:', response.statusText);
        }
    })
    .catch(error => console.error('요청 중 오류 발생:', error));
});


const creditBtn = document.getElementById('credit_btn');
creditBtn.addEventListener('click',()=>{
	const credit = parseInt(document.getElementById('userCredit').getAttribute('data-credit'));
	const creditInput = document.getElementById('user_credit_input');
	const totalPrice = parseInt(document.getElementById('amount2').getAttribute('data-value'));
	if(credit > totalPrice) { 
		creditInput.setAttribute('value',`${totalPrice}`);
		creditInput.innerText = `${totalPrice}`;
		creditInput.value = `${totalPrice}`;
	}
	else { 
		creditInput.setAttribute('value',`${credit}`);
		creditInput.innerText= `${credit}`;
		creditInput.value=`${credit}`;
	}
	const creditInputValue = parseInt(creditInput.value);
	const finalPay = document.getElementById('amount3');
	finalPay.innerText = `${totalPrice - creditInputValue}`;
	if(creditInput.value > 0){
		cpName.innerText = '';
		cpName.removeAttribute('data-code');
	}
	updateAmount();
});

const creditInput = document.getElementById('user_credit_input');
creditInput.addEventListener('change',()=>{
	const totalPrice = parseInt(document.getElementById('amount2').getAttribute('data-value'));
	const creditInputValue = parseInt(creditInput.value);
	const finalPay = document.getElementById('amount3');
	if(creditInput.value === null || creditInput.value == ''){
		creditInputValue === parseInt(0);	
		finalPay.innerText = `${totalPrice}`;
	}
	else{finalPay.innerText = `${totalPrice - creditInputValue}`;}
	
	if(creditInputValue > 0){
		cpName.innerText = '';
		cpName.removeAttribute('data-code');
	}
	
	updateAmount();
});

const cpBoxes = document.querySelectorAll('.coupon-box');
const cpName = document.getElementById('coupon-selected-name');
const cpModal = document.getElementById('couponModal');
const totalPriceDiv = document.getElementById('amount2');
const totalPrice = parseInt(totalPriceDiv.getAttribute('data-value'));
const finalPayDiv = document.getElementById('amount3');

cpBoxes.forEach(cpBox =>{
	cpBox.addEventListener('click',() =>{
		const cpType = cpBox.getAttribute('data-type');
		const cpAmount = parseInt(cpBox.getAttribute('data-amount'));
		const wonSpan = document.getElementById('won-span');
		const userCreditInput = document.getElementById('user_credit_input');
		const cpCode = cpBox.getAttribute('data-code');
		cpModal.style.display='none';
		cpName.innerText = cpBox.querySelector('.coupon-p').innerText + ' ('+cpAmount + (cpType === 'PER' ? '%' : '원')+')';
		finalPayDiv.innerText = totalPrice - (cpType === 'PER' ? totalPrice*cpAmount/100 : cpAmount) ;
		wonSpan.innerText = ' (-'+cpAmount+(cpType === 'PER' ? '%' : '원')+')';
		userCreditInput.value = 0;
		cpName.setAttribute("data-code",cpCode);
	});
});




















