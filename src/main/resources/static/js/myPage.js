"use strict";
const changeButtonForGuestHost = document.getElementById('change_button_for_guest_host');
const changeButtonForProfile = document.getElementById('change_profile');
const leftBox = document.getElementById('left_box');
const rightBoxFirst = document.getElementById('right_box1');
const rightBoxSecond = document.getElementById('right_box2');
const rightBoxThird = document.getElementById('right_box3');
const cancelButton = document.getElementById('cancel_button');
const guestOrHost = document.getElementById('guest_or_host');
const modeText = document.getElementById('mode_text');
changeButtonForProfile.addEventListener('click', () => {
    rightBoxFirst.style.display = 'none';
    rightBoxSecond.style.display = 'none';
    rightBoxThird.style.display = 'block';
    rightBoxThird.style.borderWidth = '2px';
    rightBoxThird.style.borderColor = 'rgb(18,51,100)';
    leftBox.style.opacity = '0.5';
    changeButtonForGuestHost.style.pointerEvents = 'none';
    changeButtonForProfile.style.pointerEvents = 'none';
    const isRightBoxFirstVisible = rightBoxFirst.style.display !== "none" && rightBoxFirst.style.display !== "";
    const isRightBoxSecondVisible = rightBoxSecond.style.display !== "none" && rightBoxSecond.style.display !== "";
    if (isRightBoxSecondVisible) {
        guestOrHost.textContent = "호스트";
        modeText.textContent = "게스트 모드로 전환";
    }
    else {
        guestOrHost.textContent = "게스트";
        modeText.textContent = "호스트 모드로 전환";
    }
});
cancelButton.addEventListener('click', () => {
    rightBoxFirst.style.display = 'grid';
    rightBoxThird.style.display = 'none';
    leftBox.style.opacity = '1';
    changeButtonForGuestHost.style.pointerEvents = 'auto';
    changeButtonForProfile.style.pointerEvents = 'auto';
});
if(changeButtonForGuestHost){
	changeButtonForGuestHost.addEventListener('click', () => {

	    if (guestOrHost.textContent === "게스트") {
	        guestOrHost.textContent = "호스트";
	    }
	    else {
	        guestOrHost.textContent = "게스트";
	    }

	    if (modeText.textContent === "호스트 모드로 전환") {
	        modeText.textContent = "게스트 모드로 전환";
	    }
	    else {
	        modeText.textContent = "호스트 모드로 전환";
	    }

	    const isRightBoxFirstVisible = rightBoxFirst.style.display !== "none" && rightBoxFirst.style.display !== "";
	    const isRightBoxSecondVisible = rightBoxSecond.style.display !== "none" && rightBoxSecond.style.display !== "";

	    if (isRightBoxSecondVisible) {
	        rightBoxSecond.style.display = "none";
	        rightBoxFirst.style.display = "grid";
	        rightBoxThird.style.display = 'none';
	    }
	    else {
	        rightBoxFirst.style.display = "none";
	        rightBoxSecond.style.display = "grid";
	        rightBoxThird.style.display = 'none';
	    }
	});
}

let imageUploaded3 = false;
let isNameEntered = false;
let isPhoneNumberValid = false;

function updateCompletedButtonState() {
    if (imageUploaded3 && isNameEntered && isPhoneNumberValid) {
        completedButton2.style.pointerEvents = 'auto';
        completedButton2.style.backgroundColor = 'rgb(18,51,100)';
        completedButton2.style.color = 'white';
        completedButton2.style.fontWeight = '600';
        completedButton2.style.opacity = '1';
        completedButton2.style.border = 'none';
    }
    else {
        completedButton2.style.pointerEvents = 'none';
        completedButton2.style.backgroundColor = 'rgba(18,51,100,0.1)';
        completedButton2.style.color = 'darkgray';
        completedButton2.style.fontWeight = '400';
    }
}

const fileInput3 = document.getElementById('file-input3');
const preview3 = document.getElementById('preview3');
const filePreview3 = document.getElementById('filePreview3');
const preview4 = document.getElementById('preview4');
const filePreview4 = document.getElementById('filePreview4');
const needToHide3 = document.getElementById('needToHide3'); 
const needToHide4 = document.getElementById('needToHide4');
const changeName3 = document.getElementById('change_name3');
const completedButton2 = document.getElementById('completed_button2');
completedButton2.style.pointerEvents = 'none';
let selectedFile;
document.addEventListener("DOMContentLoaded", function() {
    const filePreview4 = document.getElementById('filePreview4');
    const filePreview3 = document.getElementById('filePreview3');
    const preview4 = document.getElementById('preview4');
    const preview3 = document.getElementById('preview3');
    const needToHide4 = document.getElementById('needToHide4');
    const needToHide3 = document.getElementById('needToHide3');

    filePreview4.onerror = function() {
        filePreview4.style.display = 'none';
        preview4.style.display = 'none';
        filePreview3.style.display = 'none';
        preview3.style.display = 'none';
        needToHide4.style.display = 'block';
        needToHide3.style.display = 'block';
    };

    filePreview4.onload = function() {
        filePreview4.style.display = 'block';
        preview4.style.display = 'block';
        filePreview3.style.display = 'block';
        preview3.style.display = 'block';
        needToHide4.style.display = 'none';
        needToHide3.style.display = 'none';
    };


    if (filePreview4.src && filePreview4.src !== window.location.href) {
        const img = new Image();
        img.src = filePreview4.src;

        img.onload = function() {
            filePreview4.src = img.src;
            filePreview3.src = img.src;
            preview4.style.display = 'block';
            filePreview4.style.display = 'block';
            preview3.style.display = 'block';
            filePreview3.style.display = 'block';
            needToHide4.style.display = 'none';
            needToHide3.style.display = 'none';
        };

        img.onerror = function() {
            filePreview4.style.display = 'none';
            preview4.style.display = 'none';
            filePreview3.style.display = 'none';
            preview3.style.display = 'none';
            needToHide4.style.display = 'block';
            needToHide3.style.display = 'block';
        };
    } else {
        needToHide4.style.display = 'block';
        needToHide3.style.display = 'block';
        preview4.style.display = 'none';
        filePreview4.style.display = 'none';
        preview3.style.display = 'none';
        filePreview3.style.display = 'none';
    }
});


fileInput3.addEventListener('change', (event) => {
    var _a;
    const file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target && e.target.result) {
                filePreview3.src = e.target.result;
                filePreview3.style.display = 'block';
                preview3.style.display = 'block';
                changeName3.textContent = '다른 사진으로 변경';
                changeName3.style.color = 'white';
                changeName3.style.fontWeight = 'bold';
                changeName3.style.backgroundColor = 'rgb(18,51,100)';
                changeName3.style.border = 'none';
                imageUploaded3 = true;
				selectedFile = file;
                if (needToHide3) {
                    needToHide3.style.display = 'none';
                }
                preview3.style.textAlign = 'center';
                updateCompletedButtonState();
            }
        };
        reader.readAsDataURL(file);
    }
    else {
        if (filePreview3) {
            filePreview3.src = '';
            imageUploaded3 = false;
        }
        if (preview3) {
            preview3.style.display = 'none';
        }
        if (needToHide3) {
            needToHide3.style.display = '';
        }
        updateCompletedButtonState();
    }
    updateButtonState3();
});

async function saveImage() {
    const fileInput = document.getElementById('file-input3');
    const file = fileInput.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch('/uploadprofile', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Image upload failed: ' + response.statusText);
        }

        const data = await response.json();
		filePreview4.src = `/user_profile_uploads/${data.uId}.jpg`;
    } else {
        alert('No file selected.');
    }
}

async function changePhnum() {
    const phnum = document.getElementById('phone_number2').value;
    const encodedPhnum = encodeURIComponent(phnum);
    const phnumurl = `/phnum/${encodedPhnum}`;

    const response = await fetch(phnumurl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Phone number update failed: ' + response.statusText);
    }

}

async function changeNick(){
	const userNick = document.getElementById('user_name_input_box').value;
	const encodedUserNick = encodeURIComponent(userNick);
	const userNickurl = `/cnick/${encodedUserNick}`;
	
	const response = await fetch(userNickurl,{
		method : 'POST'
	});
	if(!response.ok){
		throw new Error('User Nickname update failed : ' + response.statusText);
	}
	
}

document.getElementById('completed_button2').addEventListener('click', async () => {
    try {
        await Promise.all([saveImage(), changePhnum(), changeNick()]);
        console.log('Both fetch requests completed successfully.');
		window.location.href="/mypage/home";
    } catch (error) {
        console.error('There was an error with the fetch operations:', error);
        alert('Error: ' + error.message); 
    }
});
 
function updateButtonState3() {
    if (imageUploaded3) {
        console.log('이미지 업로드됨');
    }
    else {
        console.log('이미지 미업로드');
    }
}

const userNameInputBox = document.getElementById('user_name_input_box');
const charCount3 = document.getElementById('charCount3');

const maxAllowedLength3 = 15;
const warningLength3 = 10;
userNameInputBox.addEventListener('input', () => {
    let currentLength = userNameInputBox.value.length;
    isNameEntered = currentLength > 0;
    if (currentLength > maxAllowedLength3) {
        userNameInputBox.value = userNameInputBox.value.substring(0, maxAllowedLength3);
        currentLength = maxAllowedLength3;
    }
    charCount3.textContent = `${currentLength}/${warningLength3}`;
    if (currentLength === 0) {
        charCount3.style.color = 'lightgray';
        charCount3.style.fontWeight = '400';
    }
    else if (currentLength > warningLength3) {
        charCount3.style.color = 'rgb(240, 127, 123)';
    }
    else {
        charCount3.style.color = 'darkgray';
        charCount3.style.fontWeight = '400';
    }
    updateCompletedButtonState();
});

userNameInputBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        let currentLength = userNameInputBox.value.length;
        if (currentLength > warningLength3) {
            userNameInputBox.value = userNameInputBox.value.substring(0, warningLength3);
            charCount3.textContent = `${warningLength3}/${warningLength3}`;
            charCount3.style.fontWeight = '400';
            charCount3.style.color = 'gray';
            event.preventDefault();
        }
    }
});
userNameInputBox.addEventListener('blur', () => {
    let currentLength = userNameInputBox.value.length;
    if (currentLength > warningLength3) {
        userNameInputBox.value = userNameInputBox.value.substring(0, warningLength3);
        charCount3.textContent = `${warningLength3}/${warningLength3}`;
        charCount3.style.color = 'gray';
    }
});

const phoneNumber2 = document.getElementById('phone_number2');
const phoneNumberButton2 = document.getElementById('phoneNumberButton2');
phoneNumber2.addEventListener('input', formatPhoneNumber2);
function formatPhoneNumber2() {
    let value = phoneNumber2.value.replace(/\D/g, ''); 
    if (value.length > 11) {
        value = value.substring(0, 11);
    }
    if (value.length > 3 && value.length <= 7) {
        value = value.replace(/(\d{3})(\d+)/, '$1-$2');
    }
    else if (value.length > 7) {
        value = value.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3');
    }
    phoneNumber2.value = value;
    checkPhoneNumber2(phoneNumber2); 
}
function checkPhoneNumber2(phoneNumber2) {
    const value = phoneNumber2.value.trim();
    if (value === "") {
        phoneNumberButton2.style.pointerEvents = 'none';
        phoneNumberButton2.style.backgroundColor = 'rgba(18,51,100,0.1)';
        phoneNumberButton2.style.color = "darkgray";
        phoneNumberButton2.style.fontWeight = '400';
    }
    else if (/^\d{3}-\d{4}-\d{4}$/.test(value)) {
        phoneNumberButton2.style.pointerEvents = 'auto';
        phoneNumberButton2.style.backgroundColor = 'rgb(18,51,100)';
        phoneNumberButton2.style.color = "white";
        phoneNumberButton2.style.fontWeight = 'bold';
        phoneNumberButton2.style.border = 'none';
        phoneNumberButton2.style.cursor = 'pointer';
    }
    else {
        phoneNumberButton2.style.pointerEvents = 'none';
        phoneNumberButton2.style.backgroundColor = 'rgba(18,51,100,0.1)';
        phoneNumberButton2.style.color = "darkgray";
        phoneNumberButton2.style.fontWeight = '400';
    }
}
phoneNumberButton2.dataset.phoneConfirmation = 'false';
phoneNumberButton2.style.pointerEvents = 'none';
phoneNumberButton2.style.backgroundColor = 'rgba(18,51,100,0.1)';
phoneNumberButton2.style.color = "darkgray";

phoneNumberButton2.addEventListener('click', () => {
    phoneNumberButton2.dataset.phoneConfirmation = 'true';
    isPhoneNumberValid = true;
    updateCompletedButtonState();
});
const withdrawButton = document.getElementById('withdraw_button');
const withdrawPage = document.getElementById('right_box4');
withdrawButton.addEventListener('click', () => {
    rightBoxFirst.style.display = 'none';
    withdrawPage.style.display = 'block';
    withdrawPage.style.borderWidth = '2px';
    withdrawPage.style.borderColor = 'rgb(18,51,100)';
    leftBox.style.opacity = '0.5';
	if(changeButtonForGuestHost){changeButtonForGuestHost.style.pointerEvents = 'none';}
    changeButtonForProfile.style.pointerEvents = 'none';
});
const reasons = document.querySelectorAll('.reason_for_withdraw');
const finalWithdrawButton = document.getElementById('final_withdraw_button');
const agreement = document.getElementById('agreement_checkbox');
const cancleWithdrawButton = document.getElementById('cancel_withdraw');
finalWithdrawButton.style.pointerEvents = 'none';

function checkFormValidity() {
    let isReasonSelected = false;
    
    reasons.forEach(reason => {
        if (reason.checked) {
            isReasonSelected = true;
            console.log('탈퇴 사유 체크!');
        }
    });
   
    if (isReasonSelected && agreement.checked) {
        finalWithdrawButton.style.pointerEvents = 'auto';
        finalWithdrawButton.style.backgroundColor = 'rgb(18,51,100)';
        finalWithdrawButton.style.color = 'white';
        finalWithdrawButton.style.fontWeight = 'bold';
        finalWithdrawButton.style.border = 'none';
    }
    else {
        finalWithdrawButton.style.pointerEvents = 'none';
        finalWithdrawButton.style.backgroundColor = 'rgba(18,51,100,0.05)';
        finalWithdrawButton.style.color = 'darkgray';
        finalWithdrawButton.style.fontWeight = '100';
        finalWithdrawButton.style.border = '1px solid darkgray';
    }
}
reasons.forEach(reason => {
    reason.addEventListener('change', checkFormValidity);
});
agreement.addEventListener('change', checkFormValidity);
checkFormValidity();
cancleWithdrawButton.addEventListener('click', () => {
    rightBoxFirst.style.display = 'grid';
    withdrawPage.style.display = 'none';
    leftBox.style.opacity = '1';
    changeButtonForGuestHost.style.pointerEvents = 'auto';
    changeButtonForProfile.style.pointerEvents = 'none';
    alert('잘 선택하셨어요. 가길 어딜 가세요.');
});
document.addEventListener("DOMContentLoaded", function() {
    const phoneNumber = document.getElementById('phone_number');	

    let value = phoneNumber.textContent || phoneNumber.innerText;

    value = value.replace(/\D/g, '');

    if (value.length > 11) {
        value = value.substring(0, 11);
    }

    if (value.length > 3 && value.length <= 7) {
        value = value.replace(/(\d{3})(\d+)/, '$1-$2');
    } 
    else if (value.length > 7) {
        value = value.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3');
    }
    phoneNumber.textContent = value;
});
