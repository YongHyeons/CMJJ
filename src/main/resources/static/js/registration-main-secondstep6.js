"use strict";

let imageUploaded2 = false;
const fileInput2 = document.getElementById('file-input2');
document.addEventListener('DOMContentLoaded', function() {
    const preview2 = document.getElementById('preview2');
    const filePreview2 = document.getElementById('filePreview2');
    const needToHide2 = document.getElementById('needToHide2');
    const userAddButton = document.querySelector('.user_add_button');
    const changeName = document.querySelector('.change_name_for_user_add_button');
    imageUploaded2 = false;

    fileInput2.addEventListener('change', function(event) {
		
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                if (e.target && e.target.result) {
                    filePreview2.src = e.target.result;
                    preview2.style.display = 'block';
                    if (needToHide2) {
                        needToHide2.style.display = 'none';
                    }
                    preview2.style.textAlign = 'center';
                    if (userAddButton) {
                        userAddButton.classList.add('active');
                        userAddButton.style.pointerEvents = 'auto';
                    }
                    if (changeName) {
                        changeName.textContent = '사진 변경';
                    }
                    imageUploaded2 = true;
                }
            };
            reader.readAsDataURL(file);
            const formData = new FormData();
            formData.append('profile', file);
            $.ajax({
                url: `/api/hostImageUpload/${globalRandomKey}`,
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                    console.log('File uploaded successfully:', response);
                },
                error: function(xhr, status, error) {
                    console.error('File upload failed:', error);
                }
            });
        } else {
            if (filePreview2) {
                filePreview2.src = '';
            }
            if (preview2) {
                preview2.style.display = 'none';
            }
            if (needToHide2) {
                needToHide2.style.display = '';
            }
            if (userAddButton) {
                userAddButton.classList.remove('active');
                userAddButton.style.pointerEvents = ''; 
            }
            if (changeName) {
                changeName.textContent = '사진 등록';
            }
            imageUploaded2 = false;
        }
        updateButtonState();
    });

});
const userNickname = document.getElementById('user_nickname');
const charCountNickName = document.getElementById('char_count_nikname');
const maxAllowedLengthNickname = 20;
const warningLengthNickname = 15;
function updateCharacterCount() {
    let currentLength = userNickname.value.length;
    if (currentLength > maxAllowedLengthNickname) {
        userNickname.value = userNickname.value.substring(0, maxAllowedLengthNickname);
        currentLength = maxAllowedLengthNickname;
    }
    charCountNickName.textContent = `${currentLength}/${warningLengthNickname}`;
    if (currentLength === 0) {
        charCountNickName.style.color = 'lightgray';
        charCountNickName.style.fontWeight = '400';
    }
    else if (currentLength > warningLengthNickname) {
        charCountNickName.style.color = 'rgb(240, 127, 123)';
    }
    else {
        charCountNickName.style.color = 'darkgray';
        charCountNickName.style.fontWeight = '400';
    }
    updateButtonState();
}
function handleEnterKey(event) {
    if (event.key === 'Enter') {
        let currentLength = userNickname.value.length;
        if (currentLength > warningLengthNickname) {
            userNickname.value = userNickname.value.substring(0, warningLengthNickname);
            charCountNickName.textContent = `${warningLengthNickname}/${warningLengthNickname}`;
            charCountNickName.style.fontWeight = '400';
            charCountNickName.style.color = 'gray';
            event.preventDefault();
        }
    }
}
function handleBlur() {
    let currentLength = userNickname.value.length;
    if (currentLength > warningLengthNickname) {
        userNickname.value = userNickname.value.substring(0, warningLengthNickname);
        charCountNickName.textContent = `${warningLengthNickname}/${warningLengthNickname}`;
        charCountNickName.style.color = 'gray';
    }
    updateButtonState();
}
userNickname.addEventListener('input', updateCharacterCount);
userNickname.addEventListener('keydown', handleEnterKey);
userNickname.addEventListener('blur', handleBlur);
const userDescription = document.getElementById('user_description');
const charCountDescription = document.getElementById('char_count_description');
const maxAllowedLengthDescription = 610;
const warningLengthDescription = 600;
function updateCharacterCountDescription() {
    let currentLength = userDescription.value.length;
    if (currentLength > maxAllowedLengthDescription) {
        userDescription.value = userDescription.value.substring(0, maxAllowedLengthDescription);
        currentLength = maxAllowedLengthDescription;
    }
    charCountDescription.textContent = `${currentLength}/${warningLengthDescription}`;
    if (currentLength === 0) {
        charCountDescription.style.color = 'lightgray';
        charCountDescription.style.fontWeight = '400';
    }
    else if (currentLength > warningLengthDescription) {
        charCountDescription.style.color = 'rgb(240, 127, 123)';
    }
    else {
        charCountDescription.style.color = 'darkgray';
        charCountDescription.style.fontWeight = '400';
    }
    updateButtonState();
}
function handleEnterKeyDescription(event) {
    if (event.key === 'Enter') {
        let currentLength = userDescription.value.length;
        if (currentLength > warningLengthDescription) {
            userDescription.value = userDescription.value.substring(0, warningLengthDescription);
            charCountDescription.textContent = `${warningLengthDescription}/${warningLengthDescription}`;
            charCountDescription.style.fontWeight = '400';
            charCountDescription.style.color = 'gray';
            event.preventDefault();
        }
    }
}
function handleBlurDescription() {
    let currentLength = userDescription.value.length;
    if (currentLength > warningLengthDescription) {
        userDescription.value = userDescription.value.substring(0, warningLengthDescription);
        charCountDescription.textContent = `${warningLengthDescription}/${warningLengthDescription}`;
        charCountDescription.style.color = 'gray';
    }
    updateButtonState();
}
userDescription.addEventListener('input', updateCharacterCountDescription);
userDescription.addEventListener('keydown', handleEnterKeyDescription);
userDescription.addEventListener('blur', handleBlurDescription);
const nextButton6 = document.getElementById('next_button6');
const prevButton6 = document.getElementById('prev_button6');
const prevButtonColor6 = document.getElementById('prev-button-color6');
const nextButtonColor6 = document.getElementById('next-button-color6');
nextButton6.style.pointerEvents = 'none'; 
prevButton6.style.pointerEvents = 'auto';
function prevUpdateRegistrationDisplaySection6() {
    subName4.style.color = 'rgb(18,51,100);';
    subName4.style.fontWeight = 'bold';
    subName4.style.opacity = '1';
    subName5.style.color = 'rgb(18,51,100);';
    subName5.style.fontWeight = '400';
    subName5.style.opacity = '0.5';
    replaceSvgElement('mark_svg2-4', originalMarkSvg);
}
function nextUpdateRegistrationDisplaySection6() {
    subName5.style.color = 'rgb(18,51,100);';
    subName5.style.fontWeight = '400';
    subName5.style.opacity = '0.5';
    subName6.style.color = 'rgb(18,51,100);';
    subName6.style.fontWeight = 'bold';
    subName6.style.opacity = '1';
    replaceSvgElement('mark_svg2-5', newmarkSvg);
}
if (prevButton6 && nextButton6) {
    prevButton6.addEventListener('click', goToPreviousPageForOrder);
    nextButton6.addEventListener('click', goToNextPageForOrder);
}
else {
    console.error('버튼 요소를 찾을 수 없습니다.');
}
prevButton6.addEventListener('click', () => {
	window.scrollTo({ top: 0 });
    prevUpdateRegistrationDisplaySection6();
    stepActive6.style.display = 'none';
    stepActive5.style.display = 'block';
    console.log("Button clicked!");
});
const stepActive7 = document.getElementById('step-active7');
nextButton6.addEventListener('click', () => {
	window.scrollTo({ top: 0 });
    nextUpdateRegistrationDisplaySection6();
    stepActive6.style.display = 'none';
    stepActive7.style.display = 'flex';
    console.log('Button clicked!');
});
function updateButtonState() {
    const nicknameFilled = userNickname.value.trim() !== '';
    const descriptionFilled = userDescription.value.trim().length >= 40;
    if (nicknameFilled && descriptionFilled && imageUploaded2) {
        nextButtonColor6.setAttribute('style', 'color: white; font-weight: 600;');
        nextButton6.style.pointerEvents = 'auto'; 
        nextButton6.style.backgroundColor = 'rgb(18,51,100)';
        nextButton6.style.fontWeight = '400';
        nextButton6.style.opacity = '1';
    }
    else {
        nextButtonColor6.style.color = 'darkgray';
        nextButton6.style.pointerEvents = 'none';
        nextButton6.style.backgroundColor = 'rgba(18,51,100,0.1)';
        nextButton6.style.fontWeight = '400';
    }
}
userNickname.addEventListener('input', updateButtonState);
userDescription.addEventListener('input', updateButtonState);
fileInput2.addEventListener('change', updateButtonState);
updateButtonState();
