"use strict";
const nextButton8 = document.getElementById('next_button8');
const prevButton8 = document.getElementById('prev_button8');
const prevButtonColor8 = document.getElementById('prev-button-color8');
const nextButtonColor8 = document.getElementById('next-button-color8');
nextButton8.style.pointerEvents = 'auto'; 
prevButton8.style.pointerEvents = 'auto';
function prevUpdateRegistrationDisplaySection8() {
    subName6.style.color = 'rgb(18,51,100);';
    subName6.style.fontWeight = 'bold';
    subName6.style.opacity = '1';
    subName7.style.color = 'rgb(18,51,100);';
    subName7.style.fontWeight = '400';
    subName7.style.opacity = '0.5';
    replaceSvgElement('mark_svg2-6', originalMarkSvg);
}
function nextUpdateRegistrationDisplaySection8() {
    stepSubSelection.style.display = 'none';
    numbersRight.style.display = 'none';
    amountAndScheduleButton.style.borderBottom = '5px solid rgb(18,51,100)';
    introductionButton.style.borderBottom = 'none';
    amountAndScheduleSideButton.style.border = '2px solid rgb(18,51,100)';
    amountAndScheduleSideButton.style.borderRadius = '5px';
    introductionSideButton.style.border = 'none';
    markSvg2.style.display = "block";
    replaceSvgElement('mark_svg2', newmarkSvg);
    replaceSvgElement('arrow1', prevArrow);
}
if (prevButton8) {
    prevButton8.addEventListener('click', goToPreviousPageForOrder);
    nextButton8.addEventListener('click', goToNextPageForOrder);
}
else {
    console.error('버튼 요소를 찾을 수 없습니다.');
}
prevButton8.addEventListener('click', () => {
	window.scrollTo({ top: 0 });
    prevUpdateRegistrationDisplaySection8();
    stepActive8.style.display = 'none';
    stepActive7.style.display = 'block';
    console.log("Button clicked!");
});
const stepActive9 = document.getElementById('step-active9');
nextButton8.addEventListener('click', () => {
	window.scrollTo({ top: 0 });
    nextUpdateRegistrationDisplaySection8();
    stepActive8.style.display = 'none';
    stepActive9.style.display = 'flex';
    console.log('Button clicked!');
});
