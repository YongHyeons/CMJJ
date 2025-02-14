"use strict";
const nextButton3 = document.getElementById('next_button3');
const prevButton3 = document.getElementById('prev_button3');
const prevButtonColor3 = document.getElementById('prev-button-color3');
const nextButtonColor3 = document.getElementById('next-button-color3');
nextButton3.style.pointerEvents = 'none'; 
prevButton3.style.pointerEvents = 'auto';
document.addEventListener('DOMContentLoaded', function() {
    initAutocomplete();

    const fileInput1 = document.getElementById('file-input1');
    const preview = document.getElementById('preview');
    const filePreview = document.getElementById('filePreview');
    const needToHide = document.getElementById('needToHide');

    fileInput1.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                if (e.target && e.target.result) {
                    filePreview.src = e.target.result;
                    preview.style.display = 'block';
                    if (needToHide) {
                        needToHide.style.display = 'none';
                    }
                    preview.style.textAlign = 'center';
					nextButton3.style.pointerEvents = 'auto';
	                nextButton3.style.opacity = '1';
	                nextButtonColor3.setAttribute('style', 'color: white; font-weight: 600;');
	                nextButton3.style.backgroundColor = 'rgb(18,51,100)';
                }
            };
            reader.readAsDataURL(file);

            const formData = new FormData();
            formData.append('file', file);

            $.ajax({
                url: `/api/mainImageUpload/${globalRandomKey}`,
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
	        nextButton3.style.pointerEvents = 'none';
	        nextButton3.style.opacity = '0.5'; 
	    }
    });
});
function prevUpdateRegistrationDisplaySection3() {
    subName1.style.color = 'rgb(18,51,100);';
    subName1.style.fontWeight = 'bold';
    subName1.style.opacity = '1';
    subName2.style.color = 'rgb(18,51,100);';
    subName2.style.fontWeight = '400';
    subName2.style.opacity = '0.5';
    replaceSvgElement('mark_svg2-1', originalMarkSvg);
}
function nextUpdateRegistrationDisplaySection3() {
    subName2.style.color = 'rgb(18,51,100);';
    subName2.style.fontWeight = '400';
    subName2.style.opacity = '0.5';
    subName3.style.color = 'rgb(18,51,100);';
    subName3.style.fontWeight = 'bold';
    subName3.style.opacity = '1';
    replaceSvgElement('mark_svg2-2', newmarkSvg);
}
if (prevButton3 && nextButton3) {
    prevButton3.addEventListener('click', goToPreviousPageForOrder);
    nextButton3.addEventListener('click', goToNextPageForOrder);
}
else {
    console.error('버튼 요소를 찾을 수 없습니다.');
}
prevButton3.addEventListener('click', () => {
	window.scrollTo({ top: 0 });
    prevUpdateRegistrationDisplaySection3();
    stepActive3.style.display = 'none';
    stepActive2.style.display = 'block';
    console.log("Button clicked!");
});
const stepActive4 = document.getElementById('step-active4');
nextButton3.addEventListener('click', (e) => {
	window.scrollTo({ top: 0 });
	if (nextButton3.style.pointerEvents === 'none') {
        e.preventDefault();
        alert('이미지를 업로드해야 다음 단계로 진행할 수 있습니다.');
    }
    else {
        nextUpdateRegistrationDisplaySection3();
        stepActive3.style.display = 'none';
        stepActive4.style.display = 'flex';
    }
});
