"use strict";
const pricePerPerson = document.getElementById('price_per_person');
const discountCheckbox = document.getElementById('discount_checkbox');
const discountPercentage = document.getElementById('discount_percentage');
const finalPrice = document.getElementById('final_price');
const pricePerPersonResult = document.getElementById('price_per_person_result');
const tax = document.getElementById('tax');
const cardCommission = document.getElementById('card_commission');
const websiteCommissionCheckbox = document.getElementById('website_commission_checkbox');
const websiteCommission = document.getElementById('website_commission');
const finalResult = document.getElementById('final_result');
const resultButton = document.getElementById('result-button');
const buttonText = document.getElementById('button-text');
function calculateResults() {
    if (finalPrice.value.trim() === '') {
        pricePerPersonResult.textContent = '원';
        tax.textContent = '원';
        cardCommission.textContent = '원';
        websiteCommission.parentElement.nextElementSibling.textContent = '원';
        finalResult.textContent = '원';
        return;
    }
    const price = parseFloat(finalPrice.value.replace(/,/g, ''));
    pricePerPersonResult.textContent = `${Math.round(price).toLocaleString()} 원`;
    const taxAmount = Math.round(price * 0.033);
    tax.textContent = `${taxAmount.toLocaleString()} 원`;
    const cardCommissionAmount = Math.round(price * 0.0253);
    cardCommission.textContent = `${cardCommissionAmount.toLocaleString()} 원`;
    let websiteCommissionAmount = 0;
    if (websiteCommissionCheckbox.checked) {
        websiteCommissionAmount = Math.round(price * 0.9);
    }
    websiteCommission.parentElement.nextElementSibling.textContent = `${websiteCommissionAmount.toLocaleString()} 원`;
    const finalAmount = Math.round(price - (taxAmount + cardCommissionAmount + websiteCommissionAmount));
    finalResult.textContent = `${finalAmount.toLocaleString()} 원`;
}
finalPrice.addEventListener('input', calculateResults);
websiteCommissionCheckbox.addEventListener('change', calculateResults);
resultButton.addEventListener('click', () => {
    calculateResults();
    nextButton9.style.pointerEvents = 'auto';
    nextButtonColor9.setAttribute('style', 'color: white; font-weight: 600;'); // 다른 css 겹쳐서 색 변경 안되는 a 태그 바꾸는 법 
    nextButton9.style.backgroundColor = 'rgb(18,51,100)';
    nextButton9.style.opacity = '1';
    const existingSvg = resultButton.querySelector('svg');
    if (existingSvg) {
        resultButton.removeChild(existingSvg);
    }
    const newSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    newSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    newSvg.setAttribute("width", "8px");
    newSvg.setAttribute("height", "8px");
    newSvg.setAttribute("viewBox", "0 0 22 22");
    newSvg.style.marginTop = "7px";
    const newPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    newPath.setAttribute("fill", "white");
    newPath.setAttribute("d", `M14.9547098,7.98576084 L15.0711,7.99552 C15.6179,8.07328 15.9981,8.57957 15.9204,9.12636 C15.6826,10.7983 14.9218,12.3522 13.747,13.5654 C12.5721,14.7785 11.0435,15.5888 9.37999,15.8801 C7.7165,16.1714 6.00349,15.9288 4.48631,15.187 C3.77335,14.8385 3.12082,14.3881 2.5472,13.8537 L1.70711,14.6938 C1.07714,15.3238 3.55271368e-15,14.8776 3.55271368e-15,13.9867 L3.55271368e-15,9.99998 L3.98673,9.99998 C4.87763,9.99998 5.3238,11.0771 4.69383,11.7071 L3.9626,12.4383 C4.38006,12.8181 4.85153,13.1394 5.36475,13.3903 C6.50264,13.9466 7.78739,14.1285 9.03501,13.9101 C10.2826,13.6916 11.4291,13.0839 12.3102,12.174 C13.1914,11.2641 13.762,10.0988 13.9403,8.84476 C14.0181,8.29798 14.5244,7.91776 15.0711,7.99552 L14.9547098,7.98576084 Z M11.5137,0.812976 C12.2279,1.16215 12.8814,1.61349 13.4558,2.14905 L14.2929,1.31193 C14.9229,0.681961 16,1.12813 16,2.01904 L16,6.00001 L12.019,6.00001 C11.1281,6.00001 10.6819,4.92287 11.3119,4.29291 L12.0404,3.56441 C11.6222,3.18346 11.1497,2.86125 10.6353,2.60973 C9.49736,2.05342 8.21261,1.87146 6.96499,2.08994 C5.71737,2.30841 4.57089,2.91611 3.68976,3.82599 C2.80862,4.73586 2.23802,5.90125 2.05969,7.15524 C1.98193,7.70202 1.47564,8.08224 0.928858,8.00448 C0.382075,7.92672 0.00185585,7.42043 0.0796146,6.87364 C0.31739,5.20166 1.07818,3.64782 2.25303,2.43465 C3.42788,1.22148 4.95652,0.411217 6.62001,0.119916 C8.2835,-0.171384 9.99651,0.0712178 11.5137,0.812976 Z`);
    newSvg.appendChild(newPath);
    resultButton.insertBefore(newSvg, buttonText);
    resultButton.setAttribute('style', 'color: white; font-weight: 600;');
    resultButton.style.backgroundColor = 'rgb(18,51,100)';
    resultButton.style.opacity = '1';
    resultButton.style.width = "180px";
    buttonText.style.color = 'white';
    buttonText.style.fontWeight = '600';
    buttonText.textContent = "다시 계산하기";
});
const updateFinalPrice = () => {
    let priceValue = pricePerPerson.value;
    let discountValue = discountPercentage.value;
    let price = parseInt(priceValue.replace(/,/g, ''), 10);
    let discount = parseInt(discountValue, 10);
    if (isNaN(price) || price <= 0)
        price = 0;
    if (isNaN(discount) || discount < 0)
        discount = 0;
    if (discount > maxDiscount)
        discount = maxDiscount;
    let discountAmount = (price * discount) / 100;
    let finalAmount = price - discountAmount;
    finalPrice.value = formatNumber(finalAmount.toString());
};
const handleDiscountCheckboxChange = () => {
    if (discountCheckbox.checked) {
        updateFinalPrice();
    }
    else {
        discountPercentage.value = '';
        let priceValue = pricePerPerson.value;
        let price = parseInt(priceValue.replace(/,/g, ''), 10);
        if (isNaN(price) || price <= 0)
            price = 0;
        finalPrice.value = formatNumber(price.toString());
    }
};
pricePerPerson.addEventListener('input', () => {
    if (discountCheckbox.checked) {
        updateFinalPrice();
    }
    else {
        let priceValue = pricePerPerson.value;
        let price = parseInt(priceValue.replace(/,/g, ''), 10);
        if (isNaN(price) || price <= 0)
            price = 0;
        finalPrice.value = formatNumber(price.toString());
    }
});
discountCheckbox.addEventListener('change', handleDiscountCheckboxChange);
discountPercentage.addEventListener('input', (e) => {
    let value = e.target.value;

    value = value.replace(/[^0-9]/g, '');

    e.target.value = value;

    if (discountCheckbox.checked) {
        updateFinalPrice();
    }
});
const maxDiscount = 100;
const minDiscount = 0;
const validateDiscountPercentage = (event) => {
    const input = event.target;
    let value = input.value;
    let numberValue = parseInt(value, 10);
    if (isNaN(numberValue) || numberValue < minDiscount) {
        input.value = minDiscount.toString();
    }
    else if (numberValue > maxDiscount) {
        input.value = maxDiscount.toString();
    }
};
discountPercentage.addEventListener('input', validateDiscountPercentage);
discountPercentage.addEventListener('blur', validateDiscountPercentage);
discountPercentage.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        validateDiscountPercentage(event); 
    }
});
const maxAmount = 10000000;
const formatNumber = (value) => {
    const numberValue = parseInt(value.replace(/,/g, ''), 10);
    return isNaN(numberValue) ? '' : numberValue.toLocaleString();
};
const updatePriceField = () => {
    let value = pricePerPerson.value;
    let numberValue = parseInt(value.replace(/,/g, ''), 10);
    if (isNaN(numberValue) || numberValue <= 0) {
        pricePerPerson.value = '';
        return;
    }
    if (numberValue > maxAmount) {
        numberValue = maxAmount;
    }
    pricePerPerson.value = formatNumber(numberValue.toString());
};
pricePerPerson.addEventListener('input', updatePriceField);
pricePerPerson.addEventListener('blur', updatePriceField);
pricePerPerson.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        updatePriceField();
    }
});
const updateCheckButton2 = (checkbox) => {
    checkbox.checked = !checkbox.checked;
};
discountPercentage.addEventListener('click', () => {
    updateCheckButton2(discountCheckbox);
});
const nextButton9 = document.getElementById('next_button9');
const prevButton9 = document.getElementById('prev_button9');
const prevButtonColor9 = document.getElementById('prev-button-color9');
const nextButtonColor9 = document.getElementById('next-button-color9');
nextButton9.style.pointerEvents = 'none';
prevButton9.style.pointerEvents = 'auto';
function prevUpdateRegistrationDisplaySection9() {
    stepSubSelection.style.display = 'block';
    numbersRight.style.display = "flex";
    introductionButton.style.borderBottom = '5px solid rgb(18,51,100)';
    amountAndScheduleButton.style.borderBottom = 'none';
    introductionSideButton.style.border = '2px solid rgb(18,51,100)';
    introductionSideButton.style.borderRadius = '5px';
    amountAndScheduleSideButton.style.border = 'none';
    subName7.style.color = 'rgb(18,51,100);';
    subName7.style.fontWeight = '600';
    subName7.style.opacity = '1';
    replaceSvgElement('mark_svg2-7', originalMarkSvg);
    replaceSvgElement('mark_svg3', originalMarkSvg);
    replaceSvgElement('arrow1', newArrow);
}
const saveButton = document.getElementById('saveButton');
saveButton.style.pointerEvents = "none";
if (prevButton9) {
    prevButton9.addEventListener('click', goToPreviousPageForOrder);
}
else {
    console.error('버튼 요소를 찾을 수 없습니다.');
}
prevButton9.addEventListener('click', () => {
	saveButton.style.pointerEvents = "none";
	saveButton.style.backgroundColor = 'rgba(18,51,100,0.05)';
	saveButton.style.color = 'darkgray';
	saveButton.style.fontWeight = '100';
	saveButton.style.bordercolor = 'darkgray';
    prevUpdateRegistrationDisplaySection9();
    stepActive9.style.display = 'none';
    stepActive8.style.display = 'block';
    window.scrollTo({ top: 0 });
	replaceSvgElement('mark_svg2', originalMarkSvg);
	markSvg2.style.display = 'none';
    console.log("Button clicked!");
});
nextButton9.addEventListener('click', () => {
    saveButton.style.backgroundColor = 'rgb(18,51,100)';
    saveButton.style.pointerEvents = "auto";
    saveButton.style.color = 'white';
    saveButton.style.fontWeight = '600';
    saveButton.style.opacity = '1';
    window.scrollTo({ top: 0 });
    replaceSvgElement('mark_svg3', newmarkSvg);
    console.log('Registration Completed!');
});
