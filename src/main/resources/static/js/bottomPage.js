"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const buttons = {
        termsOfService: document.querySelector('.terms_of_service_button'),
        privacyPolicy: document.querySelector('.privacy_policy_button'),
        businessInformationVerification: document.querySelector('.business_information_verification_button'),
        faqContainer: document.querySelector('.faq_container_button'),
        serviceIntroduction: document.querySelector('.service_introduction_button')
    };
    const contents = {
        termsOfService: document.getElementById('terms_of_service'),
        privacyPolicy: document.getElementById('privacy_policy'),
        businessInformationVerification: document.getElementById('business_information_verification'),
        faqContainer: document.getElementById('faq_container'),
        serviceIntroduction: document.getElementById('service_introduction')
    };

    function setInitialStates() {
        if (buttons.termsOfService && contents.termsOfService) {
            buttons.termsOfService.classList.add('active');
            contents.termsOfService.style.display = 'flex';
        }
        Object.values(buttons).forEach(button => {
            if (button && button !== buttons.termsOfService) {
                button.classList.remove('active');
            }
        });
        Object.values(contents).forEach(content => {
            if (content && content !== contents.termsOfService) {
                content.style.display = 'none';
            }
        });
    }

    setInitialStates();

    function resetStates() {
        Object.values(buttons).forEach(button => button === null || button === void 0 ? void 0 : button.classList.remove('active'));
        Object.values(contents).forEach(content => {
            if (content) {
                content.style.display = 'none';
            }
        });
    }

    function setupButton(buttonKey, contentKey, displayStyle) {
        const button = buttons[buttonKey];
        const content = contents[contentKey];
        if (button && content) {
            button.addEventListener('click', () => {
                resetStates();
                button.classList.add('active');
                content.style.display = displayStyle;
            });
        }
    }

    setupButton('termsOfService', 'termsOfService', 'flex');
    setupButton('privacyPolicy', 'privacyPolicy', 'flex');
    setupButton('businessInformationVerification', 'businessInformationVerification', 'block');
    setupButton('faqContainer', 'faqContainer', 'block');
    setupButton('serviceIntroduction', 'serviceIntroduction', 'block');

    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');
        const answerDiv = item.querySelector('.faq-answer');
        if (questionButton && answerDiv) {
            questionButton.addEventListener('click', () => {
                if (item.classList.contains('active')) {
                    item.classList.remove('active');
                    answerDiv.style.display = 'none';
                }
                else {
                    faqItems.forEach(i => {
                        i.classList.remove('active');
                        const answer = i.querySelector('.faq-answer');
                        if (answer) {
                            answer.style.display = 'none';
                        }
                    });
                    item.classList.add('active');
                    answerDiv.style.display = 'block';
                }
            });
        }
    });

    const pageInfo = parseInt(document.getElementById('cho-ice').getAttribute('data-page'));
    resetStates();
    
    if(pageInfo === 1){
        buttons['termsOfService'].classList.add('active');
        contents['termsOfService'].style.display = 'flex';
    }else if(pageInfo === 2){
        buttons['privacyPolicy'].classList.add('active');
        contents['privacyPolicy'].style.display = 'flex';
    }else if(pageInfo === 3){
        buttons['businessInformationVerification'].classList.add('active');
        contents['businessInformationVerification'].style.display = 'block';
    }else if(pageInfo === 4){
        buttons['faqContainer'].classList.add('active');
        contents['faqContainer'].style.display = 'block';
    }else if(pageInfo === 5){
        buttons['serviceIntroduction'].classList.add('active');
        contents['serviceIntroduction'].style.display = 'block';
    }



});
