"use strict";
window.difficultyValue = '';
window.hourValue = "";
window.curriculumData = [];

const curriculumContainer = document.getElementById('curriculum-container');
const addButton = document.getElementById('add_button2');

if (!curriculumContainer) {
    console.error('Curriculum container not found');
    throw new Error('Curriculum container not found');
}

let curriculumCount = 0;

for (let i = 0; i < 3; i++) {
    addCurriculum();
}

addButton?.addEventListener('click', () => {
    if (curriculumCount < 5) {
        addCurriculum();
    } else {
        alert('최대 5개의 단계만 추가할 수 있습니다.');
    }
});

function addCurriculum() {
    curriculumCount++;
    
    const curriculum = document.createElement('div');
    curriculum.className = 'curriculum';
    curriculum.id = `curriculum${curriculumCount}`;
    curriculum.style.display = 'grid';
    
    const subName = document.createElement('span');
    subName.className = 'sub_name';
    subName.textContent = `${curriculumCount}단계`;
    
    const inputSpan = document.createElement('span');
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = `${curriculumCount}단계에 대한 설명을 적어주세요`;
    input.id = `curriculum_info${curriculumCount}`;
    inputSpan.appendChild(input);
    
    const deleteButtonDiv = document.createElement('div');
    deleteButtonDiv.className = 'delete_button';
    deleteButtonDiv.innerHTML = `
        <div class="delete-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <a>삭제</a>
    `;
    deleteButtonDiv.addEventListener('click', () => {
        if (curriculumCount > 3) {
            curriculum.remove();
            curriculumCount--;
            updateCurriculumOrder();
        } else {
            alert('최소 3개의 단계를 유지해야 합니다.');
        }
    });
    
    curriculum.appendChild(subName);
    curriculum.appendChild(inputSpan);
    curriculum.appendChild(deleteButtonDiv);
    curriculumContainer.appendChild(curriculum);

    input.addEventListener('input', () => {
        updateCurriculumData();
    });

    updateCurriculumData();
}

function updateCurriculumData() {
    window.curriculumData = [];
    const curriculums = document.querySelectorAll('.curriculum');
    curriculums.forEach(curriculum => {
        const step = curriculum.querySelector('.sub_name').textContent;
        const description = curriculum.querySelector('input').value;
        window.curriculumData.push({ step, description });
    });
}
function updateCurriculumOrder() {
    const curriculums = Array.from(curriculumContainer.getElementsByClassName('curriculum'));
    curriculums.forEach((curriculum, index) => {
        const subName = curriculum.querySelector('.sub_name');
        const input = curriculum.querySelector('input');
        if (subName && input) {
            const stepNumber = index + 1;
            subName.textContent = `${stepNumber}단계`;
            input.placeholder = `${stepNumber}단계에 대한 설명을 적어주세요`;
        }
    });

    updateCurriculumData();
}

let isCurriculumFilled = false;
function checkCurriculumInput() {
    const inputs = curriculumContainer.querySelectorAll('input[type="text"]');
    isCurriculumFilled = Array.from(inputs).every(input => input.value.trim() !== '');
    updateNextButtonState2();
}
curriculumContainer.addEventListener('input', checkCurriculumInput);
let isDifficultySelected = false;
document.addEventListener('DOMContentLoaded', () => {
    const beginner = document.getElementById('beginner');
    const intermediate = document.getElementById('intermediate');
    const advanced = document.getElementById('advanced');
    const buttons = [beginner, intermediate, advanced];
    const handleButtonClick = (event, clickedButton) => {
		event.preventDefault();
        buttons.forEach(button => {
            if (button) {
                button.classList.remove('active');
            }
        });
        clickedButton.classList.add('active');
        window.difficultyValue = clickedButton.querySelector('a').getAttribute('data-value');
        console.log('Selected difficulty value:', window.difficultyValue);
		isDifficultySelected = true;
		updateNextButtonState2();
    };
    buttons.forEach(button => {
        if (button) {
            button.addEventListener('click', (event) => handleButtonClick(event, button));
        }
    });
});
const hour1 = document.getElementById('hour1');
const hour2 = document.getElementById('hour2');
const hour3 = document.getElementById('hour3');
const hour4 = document.getElementById('hour4');
const hour5 = document.getElementById('hour5');
const hours = [hour1, hour2, hour3, hour4, hour5];
let isTimeSelected = false;
const handleButtonClick1 = (clickedButton) => {
    hours.forEach(button => {
        if (button) {
            button.classList.remove('active');
        }
    });
    clickedButton.classList.add('active');
	window.hourValue = clickedButton.querySelector('a').getAttribute('data-value');
	console.log('Selected hour value:', window.hourValue);
	isTimeSelected = true;
    updateNextButtonState2();
};
hours.forEach(button => {
    if (button) {
        button.addEventListener('click', () => handleButtonClick1(button));
    }
});
const nextButton5 = document.getElementById('next_button5');
const prevButton5 = document.getElementById('prev_button5');
const prevButtonColor5 = document.getElementById('prev-button-color5');
const nextButtonColor5 = document.getElementById('next-button-color5');
nextButton5.style.pointerEvents = 'none';
prevButton5.style.pointerEvents = 'auto';
function prevUpdateRegistrationDisplaySection5() {
    subName3.style.color = 'rgb(18,51,100);';
    subName3.style.fontWeight = 'bold';
    subName3.style.opacity = '1';
    subName4.style.color = 'rgb(18,51,100);';
    subName4.style.fontWeight = '400';
    subName4.style.opacity = '0.5';
    replaceSvgElement('mark_svg2-3', originalMarkSvg);
}
function nextUpdateRegistrationDisplaySection5() {
    subName4.style.color = 'rgb(18,51,100);';
    subName4.style.fontWeight = '400';
    subName4.style.opacity = '0.5';
    subName5.style.color = 'rgb(18,51,100);';
    subName5.style.fontWeight = 'bold';
    subName5.style.opacity = '1';
    replaceSvgElement('mark_svg2-4', newmarkSvg);
}
if (prevButton5 && nextButton5) {
    prevButton5.addEventListener('click', goToPreviousPageForOrder);
    nextButton5.addEventListener('click', goToNextPageForOrder);
}
else {
    console.error('버튼 요소를 찾을 수 없습니다.');
}
prevButton5.addEventListener('click', () => {
	window.scrollTo({ top: 0 });
    prevUpdateRegistrationDisplaySection5();
    stepActive5.style.display = 'none';
    stepActive4.style.display = 'block';
    console.log("Button clicked!");
});
const stepActive6 = document.getElementById('step-active6');
nextButton5.addEventListener('click', () => {
	window.scrollTo({ top: 0 });
    nextUpdateRegistrationDisplaySection5();
    stepActive5.style.display = 'none';
    stepActive6.style.display = 'flex';
    console.log('Button clicked!');
});
function updateNextButtonState2() {
    const nextButton5 = document.getElementById('next_button5');
    if (isDifficultySelected && isTimeSelected && isCurriculumFilled) {
        nextButton5.style.pointerEvents = 'auto';
        nextButton5.style.backgroundColor = 'rgb(18, 51, 100)';
        nextButtonColor5.setAttribute('style', 'color: white; font-weight: 600;');
    }
    else {
        nextButton5.style.pointerEvents = 'none';
        nextButton5.style.backgroundColor = 'rgba(18,51,100,0.1)';
        nextButtonColor5.setAttribute('style', 'color: darkgray; font-weight: 400;');
    }
}
