"use strict";

const classItems = document.querySelectorAll('.class-made');
classItems.forEach(item => {
    item.addEventListener('click', () => {
        classItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.class-svg-two').forEach(function (svgIcon) {
        svgIcon.addEventListener('click', function () {
            const classBox = this.closest('.class-box-two');
            if (classBox) {
                classBox.remove();
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const createClassBtn = document.getElementById('create-class-btn');
    const createClassContent = document.getElementById('create-class-content');
    const registeredClassContent = document.getElementById('registered-class-content');
    createClassBtn.addEventListener('click', function () {
        createClassContent.style.display = 'block';
        registeredClassContent.style.display = 'none';
        createClassBtn.classList.add('active');
    });
});







