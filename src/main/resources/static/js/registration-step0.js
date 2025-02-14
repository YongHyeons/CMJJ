"use strict";
const registrationDisplaySections = [];
const hostAuthenticationButton = document.getElementById('host_authentication_button');
hostAuthenticationButton.dataset.clicked = 'true';
hostAuthenticationButton.style.borderBottom = '5px solid rgb(18,51,100)';
const categoryButton = document.getElementById('category_button');
categoryButton.dataset.clicked = 'false';
categoryButton.style.borderBottom = 'none';
const introductionButton = document.getElementById('introduction_button');
introductionButton.dataset.clicked = 'false';
introductionButton.style.borderBottom = 'none';
const amountAndScheduleButton = document.getElementById('amount_and_schedule_button');
amountAndScheduleButton.dataset.clicked = 'false';
amountAndScheduleButton.style.borderBottom = 'none';
const hostAuthenticationSideButton = document.getElementById('step0-1');
hostAuthenticationSideButton.style.border = '2px solid rgb(18,51,100)';
hostAuthenticationSideButton.style.borderRadius = '5px';
const categorySideButton = document.getElementById('step1-1');
categorySideButton.style.border = 'none';
categorySideButton.style.borderRadius = 'none';
const introductionSideButton = document.getElementById('step2-1');
introductionSideButton.style.border = 'none';
introductionSideButton.style.borderRadius = 'none';
const amountAndScheduleSideButton = document.getElementById('step3-1');
amountAndScheduleSideButton.style.border = 'none';
amountAndScheduleSideButton.style.borderRadius = 'none';
const nextButton = document.getElementById('next_button');
function updateRegistrationDisplaySection() {
    if (hostAuthenticationButton.dataset.clicked == 'true') {
        hostAuthenticationButton.dataset.clicked = 'false';
        categoryButton.dataset.clicked = 'true';
        introductionButton.dataset.clicked = 'false';
        amountAndScheduleButton.dataset.clicked = 'false';
        hostAuthenticationButton.style.borderBottom = 'none';
        categoryButton.style.borderBottom = '5px solid rgb(18,51,100)';
        hostAuthenticationSideButton.style.border = 'none';
        hostAuthenticationSideButton.style.borderRadius = 'none';
        categorySideButton.style.border = '2px solid rgb(18,51,100)';
        categorySideButton.style.borderRadius = '5px';
    }
    else if (categoryButton.dataset.clicked == 'true') {
        hostAuthenticationButton.dataset.clicked = 'false';
        categoryButton.dataset.clicked = 'false';
        introductionButton.dataset.clicked = 'true';
        amountAndScheduleButton.dataset.clicked = 'false';
        categoryButton.style.borderBottom = 'none';
        introductionButton.style.borderBottom = '5px solid rgb(18,51,100)';
        categorySideButton.style.border = 'none';
        categorySideButton.style.borderRadius = 'none';
        introductionSideButton.style.border = '2px solid rgb(18,51,100)';
        introductionSideButton.style.borderRadius = '5px';
    }
    else if (introductionButton.dataset.clicked == 'true') {
        hostAuthenticationButton.dataset.clicked = 'false';
        categoryButton.dataset.clicked = 'false';
        introductionButton.dataset.clicked = 'false';
        amountAndScheduleButton.dataset.clicked = 'true';
        introductionButton.style.borderBottom = 'none';
        amountAndScheduleButton.style.borderBottom = '5px solid rgb(18,51,100)';
        introductionSideButton.style.border = 'none';
        introductionSideButton.style.borderRadius = 'none';
        amountAndScheduleSideButton.style.border = '2px solid rgb(18,51,100)';
        amountAndScheduleSideButton.style.borderRadius = '5px';
    }
    console.log("Button clicked!");
}
nextButton.addEventListener('click', () => {
    updateRegistrationDisplaySection();
});
