"use strict";
const hostAuthenticationButton = document.getElementById('host_authentication_button');
hostAuthenticationButton.style.borderBottom = '5px solid rgb(18,51,100)';
const introductionButton = document.getElementById('introduction_button');
introductionButton.style.borderBottom = 'none';
const amountAndScheduleButton = document.getElementById('amount_and_schedule_button');
amountAndScheduleButton.style.borderBottom = 'none';
const hostAuthenticationSideButton = document.getElementById('step1-1');
hostAuthenticationSideButton.style.border = '2px solid rgb(18,51,100)';
hostAuthenticationSideButton.style.borderRadius = '5px';
const introductionSideButton = document.getElementById('step2-1');
introductionSideButton.style.border = 'none';
introductionSideButton.style.borderRadius = 'none';
const amountAndScheduleSideButton = document.getElementById('step3-1');
amountAndScheduleSideButton.style.border = 'none';
amountAndScheduleSideButton.style.borderRadius = 'none';
const phoneNumber = document.getElementById('phone_number');
const feedbackIcon = document.getElementById('feedback_icon');
feedbackIcon.style.opacity = '0';
phoneNumber.addEventListener('input', formatPhoneNumber);
function formatPhoneNumber() {
    let value = phoneNumber.value.replace(/\D/g, ''); 
    if (value.length > 11) {
        value = value.substring(0, 11);
    }
    if (value.length > 3 && value.length <= 7) {
        value = value.replace(/(\d{3})(\d+)/, '$1-$2');
    }
    else if (value.length > 7) {
        value = value.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3');
    }
    phoneNumber.value = value;
    checkPhoneNumber(phoneNumber);
}
function checkPhoneNumber(phoneNumber) {
    const value = phoneNumber.value.trim();
    if (value === "") {
        phoneNumberButton.style.pointerEvents = 'none';
        phoneNumberButton.style.backgroundColor = 'rgba(18,51,100,0.1)';
        phoneNumberButton.style.color = "darkgray";
        phoneNumberButton.style.fontWeight = '400';
        feedbackIcon.style.opacity = '0';
        nextButton.style.pointerEvents = 'none'; 
        nextButton.style.backgroundColor = 'rgba(18,51,100,0.1)';
        nextButtonColor.setAttribute('style', 'color: darkgray; font-weight: 400;');
    }
    else if (/^\d{3}-\d{4}-\d{4}$/.test(value)) {
        phoneNumberButton.style.pointerEvents = 'auto';
        phoneNumberButton.style.backgroundColor = 'rgb(18,51,100)';
        phoneNumberButton.style.color = "white";
        phoneNumberButton.style.fontWeight = 'bold';
        feedbackIcon.style.opacity = '1';
        feedbackIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24"><path fill="rgb(87, 196, 145)" fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z"/></svg>';
    }
    else {
        phoneNumberButton.style.pointerEvents = 'none';
        phoneNumberButton.style.backgroundColor = 'rgba(18,51,100,0.1)';
        phoneNumberButton.style.color = "darkgray";
        phoneNumberButton.style.fontWeight = '400';
        nextButton.style.pointerEvents = 'none';
        nextButton.style.backgroundColor = 'rgba(18,51,100,0.1)';
        nextButtonColor.setAttribute('style', 'color: darkgray; font-weight: 400;');
        feedbackIcon.style.opacity = '1';
        feedbackIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none"><path fill="rgb(240, 127, 123)" fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8.96963 8.96965C9.26252 8.67676 9.73739 8.67676 10.0303 8.96965L12 10.9393L13.9696 8.96967C14.2625 8.67678 14.7374 8.67678 15.0303 8.96967C15.3232 9.26256 15.3232 9.73744 15.0303 10.0303L13.0606 12L15.0303 13.9696C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0303 15.0303C9.73742 15.3232 9.26254 15.3232 8.96965 15.0303C8.67676 14.7374 8.67676 14.2625 8.96965 13.9697L10.9393 12L8.96963 10.0303C8.67673 9.73742 8.67673 9.26254 8.96963 8.96965Z"/></svg>';
    }
}
const phoneNumberButton = document.getElementById('phonenumb_button');
phoneNumberButton.dataset.phoneConfirmation = 'false';
phoneNumberButton.style.pointerEvents = 'none';
phoneNumberButton.style.backgroundColor = 'rgba(18,51,100,0.1)';
phoneNumberButton.style.color = "darkgray";
phoneNumberButton.addEventListener('click', () => {
    phoneNumberButton.dataset.phoneConfirmation = 'true';
    nextButtonColor.setAttribute('style', 'color: white; font-weight: 600;');
    nextButton.style.pointerEvents = 'auto';
    nextButton.style.backgroundColor = 'rgb(18,51,100)';
    nextButton.style.fontWeight = '400';
    nextButton.style.opacity = '1';
});
const ectInputBox = document.getElementById('ect_input');
const instagramCheckButton = document.getElementById('check_btn1');
const emailCheckButton = document.getElementById('check_btn2');
const googleCheckButton = document.getElementById('check_btn3');
const kakaoCheckButton = document.getElementById('check_btn4');
const friendCheckButton = document.getElementById('check_btn5');
const studentCheckButton = document.getElementById('check_btn6');
const naverCheckButton = document.getElementById('check_btn7');
const ectCheckButton = document.getElementById('check_btn8');
const subSelection1 = document.getElementById('sub1');
const subSelection2 = document.getElementById('sub2');
const subSelection3 = document.getElementById('sub3');
const subSelection4 = document.getElementById('sub4');
const subSelection5 = document.getElementById('sub5');
const subSelection6 = document.getElementById('sub6');
const subSelection7 = document.getElementById('sub7');
const checkButtons = [
    instagramCheckButton,
    emailCheckButton,
    googleCheckButton,
    kakaoCheckButton,
    friendCheckButton,
    studentCheckButton,
    naverCheckButton,
    ectCheckButton
];
function updateCheckButton(currentButton) {
    checkButtons.forEach(button => {
        button.checked = (button === currentButton);
    });
    console.log("Button checked:", currentButton.id);
}
checkButtons.forEach(button => {
    button.addEventListener('click', () => {
        updateCheckButton(button);
        ectInputBox.value = "";
    });
});
ectInputBox.addEventListener('click', () => {
    updateCheckButton(ectCheckButton);
    ectInputBox.disabled = false; 
});
const nextButton = document.getElementById('next_button');
const nextButtonWrapper = document.getElementById('next_button_wrapper');
const nextButtonColor = document.getElementById('next-button-color');
nextButton.style.pointerEvents = 'none'; 
nextButton.style.backgroundColor = 'rgba(18,51,100,0.1)';
nextButtonColor.setAttribute('style', 'color: darkgray; font-weight: 400;');
function replaceSvgElement(containerId, newSvgMarkup) {
    const container = document.getElementById(containerId);
    if (container) {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        container.innerHTML = newSvgMarkup;
    }
    else {
        console.error(`컨테이너 ID ${containerId}를 찾을 수 없습니다.`);
    }
}
const newArrow = `<svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none"><script xmlns=""/><path d="M18.6806 13.9783L15.4706 10.7683L13.5106 8.79828C12.6806 7.96828 11.3306 7.96828 10.5006 8.79828L5.32056 13.9783C4.64056 14.6583 5.13056 15.8183 6.08056 15.8183H11.6906H17.9206C18.8806 15.8183 19.3606 14.6583 18.6806 13.9783Z" fill="#292D32"/><script xmlns=""/></svg>`;
const prevArrow = '<svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none"><script xmlns=""/><path d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z" fill="#292D32"/><script xmlns=""/></svg>';

function updateRegistrationDisplaySection() {
    introductionButton.dataset.clicked = 'true';
    amountAndScheduleButton.dataset.clicked = 'false';
    hostAuthenticationButton.style.borderBottom = 'none';
    introductionButton.style.borderBottom = '5px solid rgb(18,51,100)';
    hostAuthenticationSideButton.style.border = 'none';
    hostAuthenticationSideButton.style.borderRadius = 'none';
    introductionSideButton.style.border = '2px solid rgb(18,51,100)';
    introductionSideButton.style.borderRadius = '5px';
    subName1.style.color = 'rgba(18,51,100);';
    subName1.style.fontWeight = 'bold';
    subName1.style.opacity = '1';
    markSvg2.style.display = 'none';
    replaceSvgElement('mark_svg1', newmarkSvg);
    replaceSvgElement('mark_svg2', originalMarkSvg);
    replaceSvgElement('mark_svg2-1', originalMarkSvg);
    replaceSvgElement('mark_svg2-2', originalMarkSvg);
    replaceSvgElement('mark_svg2-3', originalMarkSvg);
    replaceSvgElement('mark_svg2-4', originalMarkSvg);
    replaceSvgElement('mark_svg2-5', originalMarkSvg);
    replaceSvgElement('mark_svg2-6', originalMarkSvg);
    replaceSvgElement('mark_svg2-7', originalMarkSvg);
    replaceSvgElement('mark_svg3', originalMarkSvg);
    console.log("Button clicked!");
}
const stepActive = document.getElementById('step-active');
const markSvg1 = document.getElementById('mark_svg1');
const markSvg2 = document.getElementById('mark_svg2');
const markSvg2_1 = document.getElementById('mark_svg2-1');
const markSvg2_2 = document.getElementById('mark_svg2-2');
const markSvg2_3 = document.getElementById('mark_svg2-3');
const markSvg2_4 = document.getElementById('mark_svg2-4');
const markSvg2_5 = document.getElementById('mark_svg2-5');
const markSvg2_6 = document.getElementById('mark_svg2-6');
const markSvg2_7 = document.getElementById('mark_svg2-7');
const markSvg3 = document.getElementById('mark_svg3');
const subName1 = document.getElementById('sub1');
const subName2 = document.getElementById('sub2');
const subName3 = document.getElementById('sub3');
const subName4 = document.getElementById('sub4');
const subName5 = document.getElementById('sub5');
const subName6 = document.getElementById('sub6');
const subName7 = document.getElementById('sub7');
const numbersRight = document.getElementById('numbers_right');
numbersRight.style.display = 'none';
const originalMarkSvg = ' <svg id="mark_svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="800px" width="800px" version="1.1" id="_x32_" viewBox="0 0 512 512" xml:space="preserve"><g><path class="st0" d="M256,0C114.615,0,0,114.612,0,256s114.615,256,256,256c141.384,0,256-114.612,256-256S397.384,0,256,0z    M281.479,412.736c-6.925,6.917-15.409,10.364-25.479,10.364c-10.066,0-18.562-3.545-25.476-10.661   c-6.913-7.306-10.364-15.703-10.364-25.174c0-9.875,3.45-18.264,10.364-25.181c6.913-6.902,15.409-10.372,25.476-10.372   c10.265,0,18.769,3.356,25.479,10.074c6.905,6.918,10.364,15.405,10.364,25.479C291.843,397.331,288.384,405.835,281.479,412.736z    M290.657,137.463L267.549,315c-0.789,7.314-4.636,10.976-11.549,10.976c-2.963,0-5.537-1.191-7.698-3.554   c-2.178-2.38-3.463-4.851-3.856-7.421l-23.107-177.537c-0.397-3.546-0.587-7.984-0.587-13.323c0-8.694,2.963-16.685,8.884-24.008   c5.926-7.496,14.703-11.24,26.364-11.24c11.256,0,19.946,3.654,26.07,10.959c6.125,7.314,9.178,15.397,9.178,24.289   C291.248,129.868,291.05,134.322,290.657,137.463z" fill="rgb(255, 138, 134)"/></g></svg>';
const newmarkSvg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="100%" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><path fill="#32BEA6" opacity="1.000000" stroke="none" d=" M235.000000,0.999999   C249.354233,1.000000 263.708466,1.000000 278.742249,1.370252   C287.371002,2.808555 295.332489,3.793190 303.267120,4.960377   C326.567474,8.387878 348.546600,16.110312 369.606140,26.351318   C389.556091,36.052761 407.942932,48.197353 424.623566,62.979988   C440.372742,76.937164 454.635071,92.128189 466.840546,109.286308   C479.615753,127.245331 489.852753,146.572372 497.490173,167.176041   C504.134064,185.099380 509.006592,203.555573 511.041626,222.664276   C511.481964,226.798813 512.336304,230.889252 513.000000,235.000000   C513.000000,249.354233 513.000000,263.708466 512.629761,278.742249   C511.191376,287.371002 510.206726,295.332458 509.039581,303.267059   C505.612122,326.567444 497.889709,348.546570 487.648682,369.606110   C477.947266,389.556061 465.802673,407.942963 451.020050,424.623596   C437.062866,440.372772 421.871826,454.635071 404.713745,466.840607   C386.754730,479.615845 367.427582,489.852814 346.823914,497.490265   C328.900574,504.134125 310.444397,509.006561 291.335693,511.041565   C287.201141,511.481903 283.110748,512.336304 279.000000,513.000000   C264.645782,513.000000 250.291550,513.000000 235.257751,512.629761   C226.628906,511.191437 218.667343,510.206848 210.732666,509.039581   C187.432373,505.611877 165.453186,497.889679 144.393661,487.648621   C124.443726,477.947144 106.056953,465.802521 89.376312,451.019897   C73.627113,437.062744 59.364880,421.871643 47.159378,404.713562   C34.384155,386.754608 24.147131,367.427551 16.509731,346.823914   C9.865866,328.900574 4.993397,310.444397 2.958338,291.335693   C2.518014,287.201141 1.663651,283.110748 0.999999,279.000000   C1.000000,264.645782 1.000000,250.291550 1.370253,235.257767   C2.808553,226.629013 3.793188,218.667557 4.960370,210.732941   C8.387850,187.432556 16.110298,165.453415 26.351318,144.393860   C36.052753,124.443909 48.197376,106.057091 62.979984,89.376427   C76.937134,73.627220 92.128212,59.364929 109.286308,47.159443   C127.245323,34.384216 146.572372,24.147200 167.176041,16.509764   C185.099396,9.865876 203.555603,4.993410 222.664307,2.958339   C226.798828,2.518015 230.889267,1.663652 235.000000,0.999999  M388.707977,160.424667   C381.814545,157.606812 374.878113,159.071548 368.061462,160.530655   C349.542603,164.494659 333.863007,174.379578 319.021759,185.456604   C281.456177,213.494278 250.105377,247.651688 222.348953,285.243927   C221.127853,286.897736 219.887207,288.537048 219.085342,289.608826   C207.130402,277.733734 196.093292,265.646301 183.847076,254.942139   C172.978546,245.442154 161.006226,237.129471 149.067856,228.954636   C140.680405,223.211304 130.948715,224.028763 123.349884,229.718735   C115.919502,235.282562 112.665726,244.663559 115.043816,253.717606   C116.806236,260.427582 121.361618,264.859772 126.974930,268.499176   C150.837570,283.970490 171.291656,303.118774 188.472351,325.766449   C193.806122,332.797485 198.724091,340.170990 204.399414,346.910187   C215.558731,360.161407 235.503601,356.755676 242.391144,340.850861   C244.895416,335.067963 247.755554,329.376862 251.047989,324.008575   C264.092194,302.740204 280.365387,283.993958 297.368134,265.868958   C323.068634,238.472107 350.546509,213.476578 386.630035,200.105560   C394.718689,197.108276 399.321167,190.829941 399.639771,182.222809   C399.962646,173.499832 397.352478,165.768829 388.707977,160.424667  z"/><path fill="#FFFFFF" opacity="1.000000" stroke="none" d=" M234.531342,0.999999   C230.889267,1.663652 226.798828,2.518015 222.664307,2.958339   C203.555603,4.993410 185.099396,9.865876 167.176041,16.509764   C146.572372,24.147200 127.245323,34.384216 109.286308,47.159443   C92.128212,59.364929 76.937134,73.627220 62.979984,89.376427   C48.197376,106.057091 36.052753,124.443909 26.351318,144.393860   C16.110298,165.453415 8.387850,187.432556 4.960370,210.732941   C3.793188,218.667557 2.808553,226.629013 1.370253,234.789108   C1.000000,157.072952 1.000000,79.145912 1.000000,1.000000   C78.687424,1.000000 156.375061,1.000000 234.531342,0.999999  z"/><path fill="#FFFFFF" opacity="1.000000" stroke="none" d=" M513.000000,234.531342   C512.336304,230.889252 511.481964,226.798813 511.041626,222.664276   C509.006592,203.555573 504.134064,185.099380 497.490173,167.176041   C489.852753,146.572372 479.615753,127.245331 466.840546,109.286308   C454.635071,92.128189 440.372742,76.937164 424.623566,62.979988   C407.942932,48.197353 389.556091,36.052761 369.606140,26.351318   C348.546600,16.110312 326.567474,8.387878 303.267120,4.960377   C295.332489,3.793190 287.371002,2.808555 279.210876,1.370252   C356.927032,1.000000 434.854095,1.000000 513.000000,1.000000   C513.000000,78.687424 513.000000,156.375061 513.000000,234.531342  z"/><path fill="#FFFFFF" opacity="1.000000" stroke="none" d=" M0.999999,279.468658   C1.663651,283.110748 2.518014,287.201141 2.958338,291.335693   C4.993397,310.444397 9.865866,328.900574 16.509731,346.823914   C24.147131,367.427551 34.384155,386.754608 47.159378,404.713562   C59.364880,421.871643 73.627113,437.062744 89.376312,451.019897   C106.056953,465.802521 124.443726,477.947144 144.393661,487.648621   C165.453186,497.889679 187.432373,505.611877 210.732666,509.039581   C218.667343,510.206848 226.628906,511.191437 234.789093,512.629761   C157.072968,513.000000 79.145927,513.000000 1.000000,513.000000   C1.000000,435.312561 1.000000,357.624939 0.999999,279.468658  z"/><path fill="#FFFFFF" opacity="1.000000" stroke="none" d=" M279.468658,513.000000   C283.110748,512.336304 287.201141,511.481903 291.335693,511.041565   C310.444397,509.006561 328.900574,504.134125 346.823914,497.490265   C367.427582,489.852814 386.754730,479.615845 404.713745,466.840607   C421.871826,454.635071 437.062866,440.372772 451.020050,424.623596   C465.802673,407.942963 477.947266,389.556061 487.648682,369.606110   C497.889709,348.546570 505.612122,326.567444 509.039581,303.267059   C510.206726,295.332458 511.191376,287.371002 512.629761,279.210907   C513.000000,356.927032 513.000000,434.854095 513.000000,513.000000   C435.312561,513.000000 357.624939,513.000000 279.468658,513.000000  z"/><path fill="#FEFFFE" opacity="1.000000" stroke="none" d=" M389.041138,160.625488   C397.352478,165.768829 399.962646,173.499832 399.639771,182.222809   C399.321167,190.829941 394.718689,197.108276 386.630035,200.105560   C350.546509,213.476578 323.068634,238.472107 297.368134,265.868958   C280.365387,283.993958 264.092194,302.740204 251.047989,324.008575   C247.755554,329.376862 244.895416,335.067963 242.391144,340.850861   C235.503601,356.755676 215.558731,360.161407 204.399414,346.910187   C198.724091,340.170990 193.806122,332.797485 188.472351,325.766449   C171.291656,303.118774 150.837570,283.970490 126.974930,268.499176   C121.361618,264.859772 116.806236,260.427582 115.043816,253.717606   C112.665726,244.663559 115.919502,235.282562 123.349884,229.718735   C130.948715,224.028763 140.680405,223.211304 149.067856,228.954636   C161.006226,237.129471 172.978546,245.442154 183.847076,254.942139   C196.093292,265.646301 207.130402,277.733734 219.085342,289.608826   C219.887207,288.537048 221.127853,286.897736 222.348953,285.243927   C250.105377,247.651688 281.456177,213.494278 319.021759,185.456604   C333.863007,174.379578 349.542603,164.494659 368.061462,160.530655   C374.878113,159.071548 381.814545,157.606812 389.041138,160.625488  z"  fill="rgb(87, 196, 145)"/></svg>';
replaceSvgElement('mark_svg1', originalMarkSvg);
replaceSvgElement('mark_svg2', originalMarkSvg);
replaceSvgElement('mark_svg3', originalMarkSvg);
const stepActive2 = document.getElementById('step-active2');
stepActive2.style.display = 'none';
const stepSubSelection = document.getElementById('step-sub');
if (stepSubSelection != null)
    stepSubSelection.style.display = 'none';
nextButton.addEventListener('click', () => {
	window.scrollTo({ top: 0 });
	updateRegistrationDisplaySection();
    stepActive.style.display = 'none';
    stepActive2.style.display = 'flex';
    numbersRight.style.display = 'flex';
    updateOrderBackground();
    if (stepSubSelection != null)
        stepSubSelection.style.display = 'block';
    replaceSvgElement('arrow1', newArrow);
});
