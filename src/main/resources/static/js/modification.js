"use strict";

let isPhoneNumberFilled_m = false;
let isClassNameFilled_m = false;
let isCategorySelected_m = true;
let isMainImageUploaded_m = true;

let isDifficultySelected_m = true;
let isTimeSelected_m = false;
let isCurriculumFilled_m = false;
let isUserPictureUploaded_m = true;
let isNicknameFilled_m = false;
let isUserDescriptionFilled_m = false;

let isPriceFilled_m = false;

const spans = document.querySelectorAll('.first_row span');
const orders_m = document.querySelectorAll('.order1');
const numbersRight_m = document.getElementById('numbers_right2');
const stepIds = [
    'step-main-1',
    'step-main-2-1',
    'step-main-3-1',
    'step-main-4-1',
    'step-main-5-1',
    'step-main-6-1',
    'step-main-7-1',
    'step-main-8-1',
    'step-main-9-1'
];
const steps = stepIds.map(id => Array.from(document.getElementsByClassName(id)));
const headerHeight = 280;
let previousStepIndex = -1;
let currentPage1 = 1;
function setActiveStep(stepIndex) {
    spans.forEach((span, index) => {
        
        span.classList.remove('active');
        span.classList.remove('remove');
        span.classList.remove('removefix');
    });
   
    if (stepIndex === 0) {
        spans[0].classList.remove('active2');
        spans[0].classList.remove('active3');
        numbersRight_m.style.display = 'none';
    }
    else if (stepIndex >= 1 && stepIndex <= 7) {
        spans[0].classList.add('active2');
        spans[0].classList.remove('active3');
        numbersRight_m.style.display = 'block';
    }
    else if (stepIndex === 8) {
        spans[0].classList.remove('active2');
        spans[0].classList.add('active3');
        numbersRight_m.style.display = 'none';
    }
    previousStepIndex = stepIndex;
    updateOrderBackground1();
}
function updateOrderBackground1() {
    orders_m.forEach((order, index) => {
        if (index === currentPage1 - 1) {
            if (!order.classList.contains('active')) {
                order.classList.add('active');
            }
        }
        else {
            if (order.classList.contains('active')) {
                order.classList.remove('active');
            }
        }
    });
}
function updateActiveStep() {
    const scrollY = window.scrollY || window.pageYOffset;
    let activeStepIndex = -1;
    for (let i = 0; i < steps.length; i++) {
        const stepElements = steps[i];
        for (const step of stepElements) {
            if (step) {
                const rect = step.getBoundingClientRect();
                const offsetTop = rect.top + window.pageYOffset;

                if (scrollY + headerHeight >= offsetTop && scrollY + headerHeight < offsetTop + step.offsetHeight) {
                    activeStepIndex = i;
                    break;
                }
            }
        }
    }
    if (activeStepIndex >= 0) {
        setActiveStep(activeStepIndex);
        currentPage1 = activeStepIndex;
    }
}
window.addEventListener('scroll', updateActiveStep);
updateActiveStep();

const phoneNumber_m = document.getElementById('phone_number');
const feedbackIcon_m = document.getElementById('feedback_icon');
feedbackIcon_m.style.opacity = '0';
phoneNumber_m.addEventListener('input', formatPhoneNumber_m);
function formatPhoneNumber_m() {
    let value = phoneNumber_m.value.replace(/\D/g, '');

    if (value.length > 11) {
        value = value.substring(0, 11);
    }

    if (value.length > 3 && value.length <= 7) {
        value = value.replace(/(\d{3})(\d+)/, '$1-$2');
    }
    else if (value.length > 7) {
        value = value.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3');
    }
    phoneNumber_m.value = value;
    checkPhoneNumber_m(phoneNumber_m);
}

function checkPhoneNumber_m(phoneNumber_m) {
    const value = phoneNumber_m.value.trim();
    if (value === "") {
        phoneNumberButton_m.style.pointerEvents = 'none';
        phoneNumberButton_m.style.backgroundColor = 'rgba(18,51,100,0.1)';
        phoneNumberButton_m.style.color = "darkgray";
        phoneNumberButton_m.style.fontWeight = '400';
        feedbackIcon_m.style.opacity = '0';
        isPhoneNumberFilled_m = false;
    }
    else if (/^\d{3}-\d{4}-\d{4}$/.test(value)) {
        phoneNumberButton_m.style.pointerEvents = 'auto';
        phoneNumberButton_m.style.backgroundColor = 'rgb(18,51,100)';
        phoneNumberButton_m.style.color = "white";
        phoneNumberButton_m.style.fontWeight = 'bold';
        feedbackIcon_m.style.opacity = '1';
        feedbackIcon_m.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24"><path fill="rgb(87, 196, 145)" fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z"/></svg>';
        isPhoneNumberFilled_m = true;
    }
    else {
        phoneNumberButton_m.style.pointerEvents = 'none';
        phoneNumberButton_m.style.backgroundColor = 'rgba(18,51,100,0.1)';
        phoneNumberButton_m.style.color = "darkgray";
        phoneNumberButton_m.style.fontWeight = '400';
        feedbackIcon_m.style.opacity = '1';
        feedbackIcon_m.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none"><path fill="rgb(240, 127, 123)" fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8.96963 8.96965C9.26252 8.67676 9.73739 8.67676 10.0303 8.96965L12 10.9393L13.9696 8.96967C14.2625 8.67678 14.7374 8.67678 15.0303 8.96967C15.3232 9.26256 15.3232 9.73744 15.0303 10.0303L13.0606 12L15.0303 13.9696C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0303 15.0303C9.73742 15.3232 9.26254 15.3232 8.96965 15.0303C8.67676 14.7374 8.67676 14.2625 8.96965 13.9697L10.9393 12L8.96963 10.0303C8.67673 9.73742 8.67673 9.26254 8.96963 8.96965Z"/></svg>';
        isPhoneNumberFilled_m = false;
    }
    updateModificationButtonState();
}

const phoneNumberButton_m = document.getElementById('phonenumb_button');
phoneNumberButton_m.dataset.phoneConfirmation = 'false';
phoneNumberButton_m.style.pointerEvents = 'none';
phoneNumberButton_m.style.backgroundColor = 'rgba(18,51,100,0.1)';
phoneNumberButton_m.style.color = "darkgray";
phoneNumberButton_m.addEventListener('click', () => {
    phoneNumberButton_m.dataset.phoneConfirmation = 'true';
    isPhoneNumberFilled_m = true;
    updateModificationButtonState();
});

const classNameInputBox_m = document.getElementById('class_name_input_box');
const charCount_m = document.getElementById('charCount');
const maxAllowedLength_m = 40; 
const warningLength_m = 30;

classNameInputBox_m.addEventListener('input', () => {
    let currentLength = classNameInputBox_m.value.length;
    if (currentLength > maxAllowedLength_m) {
        
        classNameInputBox_m.value = classNameInputBox_m.value.substring(0, maxAllowedLength_m);
        currentLength = maxAllowedLength_m;
    }
    charCount_m.textContent = `${currentLength}/${warningLength_m}`;
    
    if (currentLength === 0) {
        charCount_m.style.color = 'lightgray';
        charCount_m.style.fontWeight = '400';
        isClassNameFilled_m = false;
    }
    else if (currentLength > warningLength_m) {
        
        charCount_m.style.color = 'rgb(240, 127, 123)';
        isClassNameFilled_m = false;
    }
    else {
        
        charCount_m.style.color = 'darkgray';
        charCount_m.style.fontWeight = '400';
        isClassNameFilled_m = true;
    }
    updateModificationButtonState(); 
});

classNameInputBox_m.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        let currentLength = classNameInputBox_m.value.length;
        if (currentLength > warningLength_m) {
            
            classNameInputBox_m.value = classNameInputBox_m.value.substring(0, warningLength_m);
            charCount_m.textContent = `${warningLength_m}/${warningLength_m}`;
            charCount_m.style.fontWeight = '400';
            charCount_m.style.color = 'gray';
            isClassNameFilled_m = true;
            updateModificationButtonState();
           
            event.preventDefault();
        }
    }
});

classNameInputBox_m.addEventListener('blur', () => {
    let currentLength = classNameInputBox_m.value.length;
    if (currentLength > warningLength_m) {
        
        classNameInputBox_m.value = classNameInputBox_m.value.substring(0, warningLength_m);
        charCount_m.textContent = `${warningLength_m}/${warningLength_m}`;
        charCount_m.style.color = 'gray';
        isClassNameFilled_m = true;
        updateModificationButtonState();
    }
});

const menuFirst_m = document.getElementById('menuFirst');
const menuSeconds_m = document.querySelectorAll('#selectContainer2 .menu_choice');

function updateMenuSecond_m() {

    menuSeconds_m.forEach(select => {
        select.style.display = 'none';
    });

    const selectedOption_m = menuFirst_m.options[menuFirst_m.selectedIndex];
    const targetId_m = selectedOption_m === null || selectedOption_m === void 0 ? void 0 : selectedOption_m.getAttribute('data-target'); // Optional chaining 사용

    if (selectedOption_m.value === "카테고리" || selectedOption_m.value === "") {
        isCategorySelected_m = false;
    }
    else {
        isCategorySelected_m = true;
    }

    if (targetId_m) {
        const menuSecondToShow_m = document.getElementById(targetId_m);
        if (menuSecondToShow_m) {
            menuSecondToShow_m.style.display = 'block';
        }
    }
    updateModificationButtonState();
}
menuFirst_m.addEventListener('change', updateMenuSecond_m);

let selectedFile = null;

document.addEventListener('DOMContentLoaded', function() {

    const fileInput1_m = document.getElementById('file-input1');
    const preview1_m = document.getElementById('preview');
    const filePreview1_m = document.getElementById('filePreview');
    const needToHide1_m = document.getElementById('needToHide');

    fileInput1_m.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            selectedFile = file; 
            const reader = new FileReader();
            reader.onload = function(e) {
                if (e.target && e.target.result) {
                    filePreview1_m.src = e.target.result;
                    preview.style.display = 'block';
                    
                    if (needToHide1_m) {
                        needToHide1_m.style.display = 'none';
                    }
					isMainImageUploaded_m = true;
					updateModificationButtonState();
                }
				else {
                    isMainImageUploaded_m = false;
                    updateModificationButtonState();
                }
            };
            reader.readAsDataURL(file);
        } else {
		   
		    isMainImageUploaded_m = false;
		    filePreview1_m.src = '';
		    preview1_m.style.display = 'none'; 
		    if (needToHide1_m) {
		        needToHide1_m.style.display = '';
		    }
		    updateModificationButtonState();
	    }
    });
});

const addButton_m = document.getElementById('add_button');
const container_m = document.getElementById('recommendation_container');

const deleteButtonOriginal_m = document.getElementById('delete_button');
let inputCount_m = 1; 
if (deleteButtonOriginal_m) {
    deleteButtonOriginal_m.addEventListener('click', () => {
        if (inputCount_m === 1) {
            alert('첫번째 항목은 삭제할 수 없습니다.');
        }
        else {
            const originalRow = deleteButtonOriginal_m.closest('.bottom-row');
            if (originalRow && container_m) {
                container_m.removeChild(originalRow);
                inputCount_m--;
            }
        }
    });
}

addButton_m === null || addButton_m === void 0 ? void 0 : addButton_m.addEventListener('click', () => {
    
    if (inputCount_m < 10) {
       
        const bottomRow_m = document.createElement('div');
        bottomRow_m.className = 'bottom-row';
       
        const input_m = document.createElement('input');
        input_m.type = 'text';
        input_m.placeholder = '클래스를 추천해 주고 싶은 분을 적어주세요.';
        input_m.id = `recommendation_${inputCount_m + 1}`;
        
        const deleteButton_m = document.createElement('div');
        deleteButton_m.className = 'delete_button';
        
        const deleteIcon_m = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        deleteIcon_m.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        deleteIcon_m.setAttribute('width', '18');
        deleteIcon_m.setAttribute('height', '15');
        deleteIcon_m.setAttribute('viewBox', '0 0 24 24');
        deleteIcon_m.setAttribute('fill', 'none');
        const deletePath_m = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        deletePath_m.setAttribute('d', 'M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17');
        deletePath_m.setAttribute('stroke-width', '2');
        deletePath_m.setAttribute('stroke-linecap', 'round');
        deletePath_m.setAttribute('stroke-linejoin', 'round');
        deleteIcon_m.appendChild(deletePath_m);
        
        const deleteText_m = document.createElement('a');
        deleteText_m.innerText = '삭제';
        deleteButton_m.appendChild(deleteIcon_m);
        deleteButton_m.appendChild(deleteText_m);
        
        deleteButton_m.addEventListener('click', () => {
            if (inputCount_m > 1) { 
                container_m === null || container_m === void 0 ? void 0 : container_m.removeChild(bottomRow_m);
                inputCount_m--;
            }
            else {
                alert('최소 하나의 항목은 유지해야 합니다.');
            }
        });
        
        bottomRow_m.appendChild(input_m);
        bottomRow_m.appendChild(deleteButton_m);
        
        container_m === null || container_m === void 0 ? void 0 : container_m.appendChild(bottomRow_m);
        inputCount_m++;
    }
    else {
        alert('최대 10개의 항목만 추가할 수 있습니다.');
    }
});

window.difficultyValue_m = '';
window.hourValue_m = "";
window.curriculumData_m = [];

const curriculumContainer_m = document.getElementById('curriculum-container');
const addButton2_m = document.getElementById('add_button2');
if (!curriculumContainer_m) {
    console.error('Curriculum container not found');
    throw new Error('Curriculum container not found');
}
let curriculumCount_m = 0;


var curriculumtemp = document.getElementById('curriculum-temp').getAttribute('data-value');

var curriculumSteps = curriculumtemp.split('pp');


const exampleCurriculumData = [];

for (var i = 0; i < curriculumSteps.length && i < 5; i++) {
    exampleCurriculumData.push({ description: curriculumSteps[i] });
}

exampleCurriculumData.forEach((curriculum) => {
    addCurriculum_m(curriculum.description);
});


for (let i = exampleCurriculumData.length; i < 3; i++) {
    addCurriculum_m();
}


addButton2_m?.addEventListener('click', () => {
    if (curriculumCount_m < 5) {
        addCurriculum_m();
    } else {
        alert('최대 5개의 단계만 추가할 수 있습니다.');
    }
});


function addCurriculum_m(description = '') {
    curriculumCount_m++;

    const curriculum_m = document.createElement('div');
    curriculum_m.className = 'curriculum';
    curriculum_m.id = `curriculum${curriculumCount_m}`;
    curriculum_m.style.display = 'grid';

    const subName_m = document.createElement('span');
    subName_m.className = 'sub_name';
    subName_m.textContent = `${curriculumCount_m}단계`;

    const inputSpan_m = document.createElement('span');
    const input_m = document.createElement('input');
    input_m.type = 'text';
    input_m.placeholder = `${curriculumCount_m}단계에 대한 설명을 적어주세요`;
    input_m.id = `curriculum_info${curriculumCount_m}`;
    input_m.value = description;
    inputSpan_m.appendChild(input_m);

    const deleteButtonDiv_m = document.createElement('div');
    deleteButtonDiv_m.className = 'delete_button';
    deleteButtonDiv_m.innerHTML = `
        <div class="delete-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <a>삭제</a>
    `;
    deleteButtonDiv_m.addEventListener('click', () => {
        if (curriculumCount_m > 3) {
            curriculum_m.remove();
            curriculumCount_m--;
            updateCurriculumOrder_m();
            checkCurriculumInput_m();
        } else {
            alert('최소 3개의 단계를 유지해야 합니다.');
        }
    });
    curriculum_m.appendChild(subName_m);
    curriculum_m.appendChild(inputSpan_m);
    curriculum_m.appendChild(deleteButtonDiv_m);
    curriculumContainer_m.appendChild(curriculum_m);

    input_m.addEventListener('input', () => {
        updateCurriculumData_m();
    });


    updateCurriculumData_m();

    checkCurriculumInput_m();
}

function updateCurriculumData_m() {
    window.curriculumData_m = [];
    const curriculums = document.querySelectorAll('.curriculum');
    curriculums.forEach(curriculum => {
        const step = curriculum.querySelector('.sub_name').textContent;
        const description = curriculum.querySelector('input').value;
        console.log(`Updating curriculum data - Step: ${step}, Description: ${description}`);
        window.curriculumData_m.push({ step, description });
    });
}

function updateCurriculumOrder_m() {
    const curriculums = Array.from(curriculumContainer_m.getElementsByClassName('curriculum'));
    curriculums.forEach((curriculum, index) => {
        const subName = curriculum.querySelector('.sub_name');
        const input = curriculum.querySelector('input');
        if (subName && input) {
            const stepNumber = index + 1;
            subName.textContent = `${stepNumber}단계`;
            input.placeholder = `${stepNumber}단계에 대한 설명을 적어주세요`;
        }
    });

    updateCurriculumData_m();
}


function checkCurriculumInput_m() {
    const inputs_m = curriculumContainer_m.querySelectorAll('input[type="text"]');
    isCurriculumFilled_m = Array.from(inputs_m).every(input => input.value.trim() !== '');
    
    if (isCurriculumFilled_m) {
        isCurriculumFilled_m = true;
    }
    else {
        isCurriculumFilled_m = false;
    }
   
    updateModificationButtonState(); 
}

curriculumContainer_m.addEventListener('input', checkCurriculumInput_m);

const beginner_m = document.getElementById('beginner');
const intermediate_m = document.getElementById('intermediate');
const advanced_m = document.getElementById('advanced');
const buttons_m = [beginner_m, intermediate_m, advanced_m];

const handleButtonClick_m = (event,clickedButton) => {
	event.preventDefault();
    buttons_m.forEach(button => {
        if (button) {
            button.classList.remove('active');
        }
    });
	window.difficultyValue_m = clickedButton.querySelector('a').getAttribute('data-value');
	console.log('Selected difficulty value:', window.difficultyValue_m);
    clickedButton.classList.add('active');
    isDifficultySelected_m = true;
    updateModificationButtonState();
};
buttons_m.forEach(button => {
    if (button) {
        button.addEventListener('click', (event) => handleButtonClick_m(event, button));
    }
});

const hour1_m = document.getElementById('hour1');
const hour2_m = document.getElementById('hour2');
const hour3_m = document.getElementById('hour3');
const hour4_m = document.getElementById('hour4');
const hour5_m = document.getElementById('hour5');

const hours_m = [hour1_m, hour2_m, hour3_m, hour4_m, hour5_m];

const handleButtonClick1_m = (event, clickedButton) => {
	event.preventDefault()
    
    hours_m.forEach(button => {
        if (button) {
            button.classList.remove('active');
        }
    });
    
	window.hourValue_m = clickedButton.querySelector('a').getAttribute('data-value');
	console.log('Selected hour value:', window.hourValue_m);
    clickedButton.classList.add('active');
    isTimeSelected_m = true;
    updateModificationButtonState(); 
};

hours_m.forEach(button => {
    if (button) {
        button.addEventListener('click', (event) => handleButtonClick1_m(event, button));
    }
});

let selectedHostFile_m = null;
const fileInput2_m = document.getElementById('file-input2');

document.addEventListener('DOMContentLoaded', function() {
	const preview2_m = document.getElementById('preview2');
	const filePreview2_m = document.getElementById('filePreview2');
	const needToHide2_m = document.getElementById('needToHide2');
	const userAddButton_m = document.querySelector('.user_add_button');
	const changeName_m = document.querySelector('.change_name_for_user_add_button');
	fileInput2_m.addEventListener('change', (event) => {
	    const file_m = event.target.files[0];
	    if (file_m) {
			selectedHostFile_m = file_m;
			
	        const reader = new FileReader();
	        reader.onload = (e) => {
	            if (e.target && e.target.result) {
	                filePreview2_m.src = e.target.result;
	                preview2_m.style.display = 'block';

	                if (needToHide2_m) {

	                    needToHide2_m.style.display = 'none';
	                }

	                preview2_m.style.textAlign = 'center';

	                if (userAddButton_m) {
	                    userAddButton_m.classList.add('active');
	                    userAddButton_m.style.pointerEvents = 'auto';
	                }
	                if (changeName_m) {
	                    changeName_m.textContent = '사진 변경';
	                }

	                isUserPictureUploaded_m = true;
	            }
	        };
	        reader.readAsDataURL(file_m);
	    }
	    else {
	        if (filePreview2_m) {
	            filePreview2_m.src = '';
	        }
	        if (preview2_m) {
	            preview2_m.style.display = 'none'; 
	        }
	        if (needToHide2_m) {
	            
	            needToHide2_m.style.display = ''; 
	        }
	        if (userAddButton_m) {
	            userAddButton_m.classList.remove('active');
	            userAddButton_m.style.pointerEvents = '';
	        }
	        if (changeName_m) {
	            changeName_m.textContent = '사진 등록';
	        }
	        
	        isUserPictureUploaded_m = false;
			selectedHostFile_m = null; 
	    }
	    
	    updateModificationButtonState();
	});
	
	fetch(`/api/modhostImage/${globalRandomKey}?year=${year}&month=${month}&day=${day}`)
        .then(response => response.blob())
        .then(blob => {
            const url = URL.createObjectURL(blob);
            filePreview2_m.src = url;
            preview2_m.style.display = 'block';

            if (needToHide2_m) {
                needToHide2_m.style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error loading host image:', error);
        });
});
$('#modificationButton').on('click', function() {
    if (selectedHostFile_m) {
        $.ajax({
            url: `/api/moddeleteMainFiles/${globalRandomKey}`,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ prefix: 'host', year, month, day }),
            headers: {
                'X-CSRF-TOKEN': getCsrfToken()
            },
            success: function(response) {
                console.log('Host files deleted successfully:', response);

                let formData = new FormData();
                formData.append('file', selectedHostFile_m);
                formData.append('year', year);
                formData.append('month', month);
                formData.append('day', day);

                $.ajax({
                    url: `/api/modhostImageUpload/${globalRandomKey}`,
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(response) {
                        console.log('Host image uploaded successfully:', response);
                    },
                    error: function(xhr, status, error) {
                        console.error('Host image upload failed:', error);
                    }
                });
            },
            error: function(xhr, status, error) {
                console.error('Error deleting host files:', error);
            }
        });
    } else {
        console.log('No new host file selected. Skipping deletion and upload.');
    }
});

const userNickname_m = document.getElementById('user_nickname');
const charCountNickName_m = document.getElementById('char_count_nikname');

const maxAllowedLengthNickname_m = 20;
const warningLengthNickname_m = 15;

function updateCharacterCount_m() {
    let currentLength_m = userNickname_m.value.length;
    if (currentLength_m > maxAllowedLengthNickname_m) {

        userNickname_m.value = userNickname_m.value.substring(0, maxAllowedLengthNickname_m);
        currentLength_m = maxAllowedLengthNickname_m;
    }
    charCountNickName_m.textContent = `${currentLength_m}/${warningLengthNickname_m}`;

    if (currentLength_m === 0) {
        charCountNickName_m.style.color = 'lightgray';
        charCountNickName_m.style.fontWeight = '400';

        isNicknameFilled_m = false;
    }
    else if (currentLength_m > warningLengthNickname_m) {
        charCountNickName_m.style.color = 'rgb(240, 127, 123)';

        isNicknameFilled_m = false;
    }
    else {
        charCountNickName_m.style.color = 'darkgray';
        charCountNickName_m.style.fontWeight = '400';
 
        isNicknameFilled_m = true;
    }
    updateModificationButtonState();
}

function handleEnterKey_m(event) {
    if (event.key === 'Enter') {
        let currentLength_m = userNickname_m.value.length;
        if (currentLength_m > warningLengthNickname_m) {

            userNickname_m.value = userNickname_m.value.substring(0, warningLengthNickname_m);
            charCountNickName_m.textContent = `${warningLengthNickname_m}/${warningLengthNickname_m}`;
            charCountNickName_m.style.fontWeight = '400';
            charCountNickName_m.style.color = 'gray';

            event.preventDefault();

            updateModificationButtonState();
        }
    }
}

function handleBlur_m() {
    let currentLength_m = userNickname_m.value.length;
    if (currentLength_m > warningLengthNickname_m) {

        userNickname_m.value = userNickname_m.value.substring(0, warningLengthNickname_m);
        charCountNickName_m.textContent = `${warningLengthNickname_m}/${warningLengthNickname_m}`;
        charCountNickName_m.style.color = 'gray';
    }

    updateModificationButtonState();
}

userNickname_m.addEventListener('input', updateCharacterCount_m);
userNickname_m.addEventListener('keydown', handleEnterKey_m);
userNickname_m.addEventListener('blur', handleBlur_m);

const userDescription_m = document.getElementById('user_description');
const charCountDescription_m = document.getElementById('char_count_description');

const maxAllowedLengthDescription_m = 610;
const warningLengthDescription_m = 600;

function updateCharacterCountDescription_m() {
    let currentLength_m = userDescription_m.value.length;
    if (currentLength_m > maxAllowedLengthDescription_m) {

        userDescription_m.value = userDescription_m.value.substring(0, maxAllowedLengthDescription_m);
        currentLength_m = maxAllowedLengthDescription_m;
    }
    charCountDescription_m.textContent = `${currentLength_m}/${warningLengthDescription_m}`;

    if (currentLength_m === 0) {
        charCountDescription_m.style.color = 'lightgray';
        charCountDescription_m.style.fontWeight = '400';
    }
    else if (currentLength_m > warningLengthDescription_m) {
        charCountDescription_m.style.color = 'rgb(240, 127, 123)';
    }
    else {
        charCountDescription_m.style.color = 'darkgray';
        charCountDescription_m.style.fontWeight = '400';
        isUserDescriptionFilled_m = true;
    }

    updateModificationButtonState();
}

function handleEnterKeyDescription_m(event) {
    if (event.key === 'Enter') {
        let currentLength_m = userDescription_m.value.length;
        if (currentLength_m > warningLengthDescription_m) {
            
            userDescription_m.value = userDescription_m.value.substring(0, warningLengthDescription_m);
            charCountDescription_m.textContent = `${warningLengthDescription_m}/${warningLengthDescription_m}`;
            charCountDescription_m.style.fontWeight = '400';
            charCountDescription_m.style.color = 'gray';
            
            event.preventDefault();
        }
    }
    
    updateModificationButtonState();
}

function handleBlurDescription_m() {
    let currentLength_m = userDescription_m.value.length;
    if (currentLength_m > warningLengthDescription_m) {
        
        userDescription_m.value = userDescription_m.value.substring(0, warningLengthDescription_m);
        charCountDescription_m.textContent = `${warningLengthDescription_m}/${warningLengthDescription_m}`;
        charCountDescription_m.style.color = 'gray';
    }

    updateModificationButtonState();
}

userDescription_m.addEventListener('input', updateCharacterCountDescription_m);
userDescription_m.addEventListener('keydown', handleEnterKeyDescription_m);
userDescription_m.addEventListener('blur', handleBlurDescription_m);

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


const pricePerPerson_m = document.getElementById('price_per_person');
const discountCheckbox_m = document.getElementById('discount_checkbox');
const discountPercentage_m = document.getElementById('discount_percentage');
const finalPrice_m = document.getElementById('final_price');
const pricePerPersonResult_m = document.getElementById('price_per_person_result');
const tax_m = document.getElementById('tax');
const cardCommission_m = document.getElementById('card_commission');
const websiteCommissionCheckbox_m = document.getElementById('website_commission_checkbox');
const websiteCommission_m = document.getElementById('website_commission');
const finalResult_m = document.getElementById('final_result');
const resultButton_m = document.getElementById('result-button');
const buttonText_m = document.getElementById('button-text');
function calculateResults_m() {

    if (finalPrice_m.value.trim() === '') {
        pricePerPersonResult_m.textContent = '원';
        tax_m.textContent = '원';
        cardCommission_m.textContent = '원';
        websiteCommission_m.parentElement.nextElementSibling.textContent = '원';
        finalResult_m.textContent = '원';
        return;
    }
    const price_m = parseFloat(finalPrice_m.value.replace(/,/g, ''));
    pricePerPersonResult_m.textContent = `${Math.round(price_m).toLocaleString()} 원`;
    const taxAmount_m = Math.round(price_m * 0.033);
    tax_m.textContent = `${taxAmount_m.toLocaleString()} 원`;
    const cardCommissionAmount_m = Math.round(price_m * 0.0253);
    cardCommission_m.textContent = `${cardCommissionAmount_m.toLocaleString()} 원`;
    let websiteCommissionAmount_m = 0;
    if (websiteCommissionCheckbox_m.checked) {
        websiteCommissionAmount_m = Math.round(price_m * 0.9);
    }
    websiteCommission_m.parentElement.nextElementSibling.textContent = `${websiteCommissionAmount_m.toLocaleString()} 원`;
    const finalAmount_m = Math.round(price_m - (taxAmount_m + cardCommissionAmount_m + websiteCommissionAmount_m));
    finalResult_m.textContent = `${finalAmount_m.toLocaleString()} 원`;
}
finalPrice_m.addEventListener('input', calculateResults_m);
websiteCommissionCheckbox_m.addEventListener('change', calculateResults_m);

resultButton_m.addEventListener('click', () => {
    calculateResults_m();
    isPriceFilled_m = true;
    updateModificationButtonState();
    const existingSvg_m = resultButton_m.querySelector('svg');
    if (existingSvg_m) {
        resultButton_m.removeChild(existingSvg_m);
    }

    const newSvg_m = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    newSvg_m.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    newSvg_m.setAttribute("width", "8px");
    newSvg_m.setAttribute("height", "8px");
    newSvg_m.setAttribute("viewBox", "0 0 22 22");
    newSvg_m.style.marginTop = "7px";
    const newPath_m = document.createElementNS("http://www.w3.org/2000/svg", "path");
    newPath_m.setAttribute("fill", "white");
    newPath_m.setAttribute("d", `M14.9547098,7.98576084 L15.0711,7.99552 C15.6179,8.07328 15.9981,8.57957 15.9204,9.12636 C15.6826,10.7983 14.9218,12.3522 13.747,13.5654 C12.5721,14.7785 11.0435,15.5888 9.37999,15.8801 C7.7165,16.1714 6.00349,15.9288 4.48631,15.187 C3.77335,14.8385 3.12082,14.3881 2.5472,13.8537 L1.70711,14.6938 C1.07714,15.3238 3.55271368e-15,14.8776 3.55271368e-15,13.9867 L3.55271368e-15,9.99998 L3.98673,9.99998 C4.87763,9.99998 5.3238,11.0771 4.69383,11.7071 L3.9626,12.4383 C4.38006,12.8181 4.85153,13.1394 5.36475,13.3903 C6.50264,13.9466 7.78739,14.1285 9.03501,13.9101 C10.2826,13.6916 11.4291,13.0839 12.3102,12.174 C13.1914,11.2641 13.762,10.0988 13.9403,8.84476 C14.0181,8.29798 14.5244,7.91776 15.0711,7.99552 L14.9547098,7.98576084 Z M11.5137,0.812976 C12.2279,1.16215 12.8814,1.61349 13.4558,2.14905 L14.2929,1.31193 C14.9229,0.681961 16,1.12813 16,2.01904 L16,6.00001 L12.019,6.00001 C11.1281,6.00001 10.6819,4.92287 11.3119,4.29291 L12.0404,3.56441 C11.6222,3.18346 11.1497,2.86125 10.6353,2.60973 C9.49736,2.05342 8.21261,1.87146 6.96499,2.08994 C5.71737,2.30841 4.57089,2.91611 3.68976,3.82599 C2.80862,4.73586 2.23802,5.90125 2.05969,7.15524 C1.98193,7.70202 1.47564,8.08224 0.928858,8.00448 C0.382075,7.92672 0.00185585,7.42043 0.0796146,6.87364 C0.31739,5.20166 1.07818,3.64782 2.25303,2.43465 C3.42788,1.22148 4.95652,0.411217 6.62001,0.119916 C8.2835,-0.171384 9.99651,0.0712178 11.5137,0.812976 Z`);
    newSvg_m.appendChild(newPath_m);
    resultButton_m.insertBefore(newSvg_m, buttonText_m);
    resultButton_m.setAttribute('style', 'color: white; font-weight: 600;');
    resultButton_m.style.backgroundColor = 'rgb(18,51,100)';
    resultButton_m.style.opacity = '1';
    resultButton_m.style.width = "180px";
    buttonText_m.style.color = 'white';
    buttonText_m.style.fontWeight = '600';
    buttonText_m.textContent = "다시 계산하기";
});

const updateFinalPrice_m = () => {
    let priceValue_m = pricePerPerson_m.value;
    let discountValue_m = discountPercentage_m.value;

    let price_m = parseInt(priceValue_m.replace(/,/g, ''), 10);
    let discount_m = parseInt(discountValue_m, 10);
    if (isNaN(price_m) || price_m <= 0)
        price_m = 0;
    if (isNaN(discount_m) || discount_m < 0)
        discount_m = 0;
    if (discount_m > maxDiscount_m)
        discount_m = maxDiscount_m;

    let discountAmount_m = (price_m * discount_m) / 100;
    let finalAmount_m = price_m - discountAmount_m;

    finalPrice_m.value = formatNumber_m(finalAmount_m.toString());
};

const handleDiscountCheckboxChange_m = () => {
    if (discountCheckbox_m.checked) {

        updateFinalPrice_m();
    }
    else {
        discountPercentage_m.value = '';
        let priceValue_m = pricePerPerson_m.value;
        let price_m = parseInt(priceValue_m.replace(/,/g, ''), 10);
        if (isNaN(price_m) || price_m <= 0)
            price_m = 0;
        finalPrice_m.value = formatNumber_m(price_m.toString());
    }
};

pricePerPerson_m.addEventListener('input', () => {
    if (discountCheckbox_m.checked) {
        updateFinalPrice_m();
    }
    else {
        let priceValue_m = pricePerPerson_m.value;
        let price_m = parseInt(priceValue_m.replace(/,/g, ''), 10);
        if (isNaN(price_m) || price_m <= 0)
            price_m = 0;
        finalPrice_m.value = formatNumber_m(price_m.toString());
    }
});

discountCheckbox_m.addEventListener('change', handleDiscountCheckboxChange_m);

discountPercentage_m.addEventListener('input', () => {
    if (discountCheckbox_m.checked) {
        updateFinalPrice_m();
    }
});

const maxDiscount_m = 100;
const minDiscount_m = 0; 
const validateDiscountPercentage_m = (event) => {
    const input_m = event.target;
    let value_m = input_m.value;

    let numberValue_m = parseInt(value_m, 10);

    if (isNaN(numberValue_m) || numberValue_m < minDiscount_m) {
        input_m.value = minDiscount_m.toString();
    }
    else if (numberValue_m > maxDiscount_m) {
        input_m.value = maxDiscount_m.toString();
    }
};

discountPercentage_m.addEventListener('input', validateDiscountPercentage_m);
discountPercentage_m.addEventListener('blur', validateDiscountPercentage_m);
discountPercentage_m.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        validateDiscountPercentage_m(event);
    }
});
const maxAmount_m = 10000000;

const formatNumber_m = (value) => {
    const numberValue_m = parseInt(value.replace(/,/g, ''), 10);
    return isNaN(numberValue_m) ? '' : numberValue_m.toLocaleString();
};

const updatePriceField_m = () => {
    let value_m = pricePerPerson_m.value;
 
    let numberValue_m = parseInt(value_m.replace(/,/g, ''), 10);
 
    if (isNaN(numberValue_m) || numberValue_m <= 0) {
        pricePerPerson_m.value = '';
        return;
    }

    if (numberValue_m > maxAmount_m) {
        numberValue_m = maxAmount_m;
    }
    pricePerPerson_m.value = formatNumber_m(numberValue_m.toString());
};
pricePerPerson_m.addEventListener('input', updatePriceField_m);
pricePerPerson_m.addEventListener('blur', updatePriceField_m);
pricePerPerson_m.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        updatePriceField_m();
    }
});

const updateCheckButton2_m = (checkbox) => {
    checkbox.checked = !checkbox.checked;
};

discountPercentage_m.addEventListener('click', () => {
    updateCheckButton2_m(discountCheckbox_m);
});

const finishedButton = document.getElementById('finished_button');

function checkFormCompletion() {
    return isPhoneNumberFilled_m &&
           isClassNameFilled_m &&
           isCategorySelected_m && 
           isMainImageUploaded_m &&
           isDifficultySelected_m &&
           isTimeSelected_m &&
           isCurriculumFilled_m &&
           isUserPictureUploaded_m &&
           isNicknameFilled_m &&
           isUserDescriptionFilled_m &&
           isPriceFilled_m;
}


function updateModificationButtonState() {
    const modificationButton = document.getElementById('modificationButton');
    const isFormComplete = checkFormCompletion();

    if (isFormComplete) {
        modificationButton.style.pointerEvents = 'auto';
        modificationButton.style.backgroundColor = 'rgb(18,51,100)';
        modificationButton.style.color = 'white';
        modificationButton.style.fontWeight = 'bold';
        modificationButton.style.border = 'none';
    } else {
        modificationButton.style.pointerEvents = 'none';
        modificationButton.style.backgroundColor = 'rgba(18,51,100,0.05)';
        modificationButton.style.color = 'darkgray';
        modificationButton.style.fontWeight = '100';
        modificationButton.style.border = '1px solid darkgray';
    }
}

finishedButton.addEventListener('click', () => {
    finishedButtonStateUpdate();
    updateModificationButtonState();
});

let allFieldsFilled = true;
function finishedButtonStateUpdate() {
    if(!isPhoneNumberFilled_m) {
        window.scrollTo(0,0);
        alert('전화번호를 입력하세요.');
        allFieldsFilled = false;

    } else if (!isClassNameFilled_m) {
        window.scrollTo(0, 370);
        alert('클래스명을 입력하세요.');
        allFieldsFilled = false;
    } else if (!isCategorySelected_m) {
        window.scrollTo(0, 370);
        alert('카테고리를 선택하세요.');
        allFieldsFilled = false;
    } else if (!isMainImageUploaded_m) {
        window.scrollTo(0, 848);
        alert('대표 이미지를 등록하세요.');
        allFieldsFilled = false;
    } 

    
      else if (!isDifficultySelected_m) {
        window.scrollTo(0, 2879);
        alert('난이도를 선택하세요.');
        allFieldsFilled = false;
    } else if (!isTimeSelected_m) {
        window.scrollTo(0, 2879);
        alert('시간을 선택하세요.');
        allFieldsFilled = false;
    } else if (!isCurriculumFilled_m) {
        window.scrollTo(0, 2879);
        alert('클래스 단계를 입력하세요.');
        allFieldsFilled = false;
    } else if (!isUserPictureUploaded_m) {
        window.scrollTo(0, 3558);
        alert('강사님 사진을 등록하세요.');
        allFieldsFilled = false;
    } else if (!isNicknameFilled_m) {
        window.scrollTo(0, 3558);
        alert('강사님 이름이나 닉네임을 입력하세요.');
        allFieldsFilled = false;
    } else if (!isUserDescriptionFilled_m) {
        window.scrollTo(0, 3855);
        alert('강사님 소개를 40자 이상 입력하세요.');
        allFieldsFilled = false;
    } 

     else if (!isPriceFilled_m) {
        window.scrollTo(0, 5920);
        alert('가격을 작성한 후 계산 버튼을 눌러주세요.');
        allFieldsFilled = false;
    } 
}

