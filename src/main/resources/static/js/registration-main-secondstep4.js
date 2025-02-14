"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add_button');
    const container = document.getElementById('recommendation_container');
    const deleteButtonOriginal = document.getElementById('delete_button');
    let inputCount = 1; 
    if (deleteButtonOriginal) {
        deleteButtonOriginal.addEventListener('click', () => {
            if (inputCount === 1) {
                alert('첫번째 항목은 삭제할 수 없습니다.');
            }
            else {
                const originalRow = deleteButtonOriginal.closest('.bottom-row');
                if (originalRow && container) {
                    container.removeChild(originalRow);
                    inputCount--;
                }
            }
        });
    }
    addButton === null || addButton === void 0 ? void 0 : addButton.addEventListener('click', () => {
        if (inputCount < 10) {
            const bottomRow = document.createElement('div');
            bottomRow.className = 'bottom-row';
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = '클래스를 추천해 주고 싶은 분을 적어주세요.';
            input.id = `recommendation_${inputCount + 1}`;
            const deleteButton = document.createElement('div');
            deleteButton.className = 'delete_button';
            const deleteIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            deleteIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            deleteIcon.setAttribute('width', '18');
            deleteIcon.setAttribute('height', '15');
            deleteIcon.setAttribute('viewBox', '0 0 24 24');
            deleteIcon.setAttribute('fill', 'none');
            const deletePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            deletePath.setAttribute('d', 'M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17');
            deletePath.setAttribute('stroke-width', '2');
            deletePath.setAttribute('stroke-linecap', 'round');
            deletePath.setAttribute('stroke-linejoin', 'round');
            deleteIcon.appendChild(deletePath);
            const deleteText = document.createElement('a');
            deleteText.innerText = '삭제';
            deleteButton.appendChild(deleteIcon);
            deleteButton.appendChild(deleteText);
            deleteButton.addEventListener('click', () => {
                if (inputCount > 1) { 
                    container === null || container === void 0 ? void 0 : container.removeChild(bottomRow);
                    inputCount--;
                }
                else {
                    alert('최소 하나의 항목은 유지해야 합니다.');
                }
            });
            bottomRow.appendChild(input);
            bottomRow.appendChild(deleteButton);
            container === null || container === void 0 ? void 0 : container.appendChild(bottomRow);
            inputCount++;
        }
        else {
            alert('최대 10개의 항목만 추가할 수 있습니다.');
        }
    });
});
const nextButton4 = document.getElementById('next_button4');
const prevButton4 = document.getElementById('prev_button4');
const prevButtonColor4 = document.getElementById('prev-button-color4');
const nextButtonColor4 = document.getElementById('next-button-color4');
nextButton4.style.pointerEvents = 'none';
prevButton4.style.pointerEvents = 'auto';
function prevUpdateRegistrationDisplaySection4() {
    subName2.style.color = 'rgb(18,51,100);';
    subName2.style.fontWeight = 'bold';
    subName2.style.opacity = '1';
    subName3.style.color = 'rgb(18,51,100);';
    subName3.style.fontWeight = '400';
    subName3.style.opacity = '0.5';
    replaceSvgElement('mark_svg2-2', originalMarkSvg);
}
function nextUpdateRegistrationDisplaySection4() {
    subName3.style.color = 'rgb(18,51,100);';
    subName3.style.fontWeight = '400';
    subName3.style.opacity = '0.5';
    subName4.style.color = 'rgb(18,51,100);';
    subName4.style.fontWeight = 'bold';
    subName4.style.opacity = '1';
    replaceSvgElement('mark_svg2-3', newmarkSvg);
}
if (prevButton4 && nextButton4) {
    prevButton4.addEventListener('click', goToPreviousPageForOrder);
    nextButton4.addEventListener('click', goToNextPageForOrder);
}
else {
    console.error('버튼 요소를 찾을 수 없습니다.');
}
prevButton4.addEventListener('click', () => {
	window.scrollTo({ top: 0 });
    prevUpdateRegistrationDisplaySection4();
    stepActive4.style.display = 'none';
    stepActive3.style.display = 'block';
    console.log("Button clicked!");
});
const stepActive5 = document.getElementById('step-active5');
nextButton4.addEventListener('click', () => {
	window.scrollTo({ top: 0 });
    nextUpdateRegistrationDisplaySection4();
    stepActive4.style.display = 'none';
    stepActive5.style.display = 'flex';
    console.log('Button clicked!');
});
