"use strict";
const orders = document.querySelectorAll('.order');
let currentPage = 1;
const totalPages = 8; 
function updateOrderBackground() {
    console.log('Updating order background');
    orders.forEach((order, index) => {
        if (index === currentPage - 1) {
            if (!order.classList.contains('active')) {
                order.classList.add('active');
                console.log(`Added 'active' class to order ${index + 1}`);
            }
        }
        else {
            if (order.classList.contains('active')) {
                order.classList.remove('active');
                console.log(`Removed 'active' class from order ${index + 1}`);
            }
        }
    });
    console.log(`현재 페이지: ${currentPage}`);
}
function goToPreviousPageForOrder() {
    if (currentPage > 1) {
        currentPage--;
        updateOrderBackground();
        console.log('Checked Prev Page For the Order List');
    }
}
function goToNextPageForOrder() {
    if (currentPage < totalPages) {
        currentPage++;
        updateOrderBackground();
        console.log('Checked Next Page For the Order List');
    }
}
const menuFirst = document.getElementById('menuFirst');
const menuSeconds = document.querySelectorAll('#selectContainer2 .menu_choice');
function updateMenuSecond() {
    menuSeconds.forEach(select => {
        select.style.display = 'none';
    });
    const selectedOption = menuFirst.options[menuFirst.selectedIndex];
    const targetId = selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.getAttribute('data-target'); // Optional chaining 사용
    if (targetId) {
        const menuSecondToShow = document.getElementById(targetId);
        if (menuSecondToShow) {
            menuSecondToShow.style.display = 'block';
        }
    }
}
menuFirst.addEventListener('change', updateMenuSecond);
const classNameInputBox = document.getElementById('class_name_input_box');
const charCount = document.getElementById('charCount');
const maxAllowedLength = 40; 
const warningLength = 30; 
classNameInputBox.addEventListener('input', () => {
    let currentLength = classNameInputBox.value.length;
    if (currentLength > maxAllowedLength) {
        classNameInputBox.value = classNameInputBox.value.substring(0, maxAllowedLength);
        currentLength = maxAllowedLength;
    }
    charCount.textContent = `${currentLength}/${warningLength}`;
    if (currentLength === 0) {
        charCount.style.color = 'lightgray';
        charCount.style.fontWeight = '400';
    }
    else if (currentLength > warningLength) {
        charCount.style.color = 'rgb(240, 127, 123)';
    }
    else {
        charCount.style.color = 'darkgray';
        charCount.style.fontWeight = '400';
    }
});
classNameInputBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        let currentLength = classNameInputBox.value.length;
        if (currentLength > warningLength) {
            classNameInputBox.value = classNameInputBox.value.substring(0, warningLength);
            charCount.textContent = `${warningLength}/${warningLength}`;
            charCount.style.fontWeight = '400';
            charCount.style.color = 'gray';
            event.preventDefault();
        }
    }
});
classNameInputBox.addEventListener('blur', () => {
    let currentLength = classNameInputBox.value.length;
    if (currentLength > warningLength) {
        classNameInputBox.value = classNameInputBox.value.substring(0, warningLength);
        charCount.textContent = `${warningLength}/${warningLength}`;
        charCount.style.color = 'gray';
    }
});
// -------------------------------------------------------------------------------------------------------
const prevButton2 = document.getElementById('prev_button2');
const nextButton2 = document.getElementById('next_button2');
const prevButtonColor2 = document.getElementById('prev-button-color2');
const nextButtonColor2 = document.getElementById('next-button-color2');
prevButton2.style.pointerEvents = 'auto';
prevButton2.style.backgroundColor = 'rgb(18,51,100)';
prevButtonColor2.setAttribute('style', 'color: white; font-weight: bold;'); 
nextButton2.style.pointerEvents = 'none';
nextButton2.style.backgroundColor = 'rgba(18,51,100,0.1)';
nextButtonColor2.setAttribute('style', 'color: gray; font-weight: bold;');
function updateNextButtonState() {
    const isClassNameValid = classNameInputBox.value.length >= 1;
    const isMenuSelected = menuFirst.selectedIndex > 0;
    const value = classNameInputBox.value.trim();
    if (value === "") {
        nextButton2.style.pointerEvents = 'none';
        nextButton2.style.backgroundColor = 'rgba(18,51,100,0.1)';
        nextButtonColor2.setAttribute('style', 'color: darkgray; font-weight: 400;');
    }
    if (isClassNameValid && isMenuSelected) {
        nextButton2.style.pointerEvents = 'auto';
        nextButton2.style.backgroundColor = 'rgb(18,51,100)';
        prevButtonColor2.setAttribute('style', 'color: white; font-weight: bold;');
        nextButtonColor2.setAttribute('style', 'color: white; font-weight: bold;'); 
    }
    else {
        nextButton2.style.pointerEvents = 'none';
        nextButton2.style.backgroundColor = 'rgba(18,51,100,0.1)';
        nextButton2.style.color = "darkgray";
        nextButton2.style.fontWeight = '400';
    }
}
classNameInputBox.addEventListener('input', updateNextButtonState);
menuFirst.addEventListener('change', updateNextButtonState);
updateNextButtonState();
function updateRegistrationDisplaySection2() {
    hostAuthenticationButton.dataset.clicked = 'false';
    introductionButton.dataset.clicked = 'false';
    amountAndScheduleButton.dataset.clicked = 'true';
    subName1.style.color = 'rgba(18,51,100);';
    subName1.style.fontWeight = '400';
    subName1.style.opacity = '0.5';
    subName2.style.color = 'rgba(18,51,100);';
    subName2.style.fontWeight = 'bold';
    subName2.style.opacity = '1';
    replaceSvgElement('mark_svg2-1', newmarkSvg);
    console.log("Button clicked!");
}
function prevUpdateRegistrationDisplaySection2() {
    hostAuthenticationButton.style.borderBottom = '5px solid rgb(18,51,100)';
    introductionButton.style.border = 'none';
    hostAuthenticationSideButton.style.border = '2px solid rgb(18,51,100)';
    hostAuthenticationSideButton.style.borderRadius = '5px';
    introductionSideButton.style.border = 'none';
    introductionSideButton.style.borderRadius = 'none';
    stepSubSelection.style.display = 'none';
    markSvg2.style.display = 'block';
    replaceSvgElement('arrow1', prevArrow);
    replaceSvgElement('mark_svg1', originalMarkSvg);
}
const stepActive3 = document.getElementById('step-active3');
stepActive3.style.display = 'none';
nextButton2.addEventListener('click', () => {
	window.scrollTo({ top: 0 });
    updateRegistrationDisplaySection2();
    stepActive2.style.display = 'none';
    stepActive3.style.display = 'flex';
});
prevButton2.addEventListener('click', () => {
	window.scrollTo({ top: 0 });
    prevUpdateRegistrationDisplaySection2();
    stepActive2.style.display = 'none';
    stepActive.style.display = 'block';
    phoneNumberButton.dataset.phoneConfirmation = 'false';
    phoneNumberButton.style.pointerEvents = 'auto';
    phoneNumberButton.style.backgroundColor = 'rgb(18,51,100)';
    phoneNumberButton.style.color = "white";
    phoneNumberButton.style.fontWeight = 'bold';
    numbersRight.style.display = 'none';
});
if (prevButton2 && nextButton2) {
    prevButton2.addEventListener('click', goToPreviousPageForOrder);
    nextButton2.addEventListener('click', goToNextPageForOrder);
}
else {
    console.error('버튼 요소를 찾을 수 없습니다.');
}
