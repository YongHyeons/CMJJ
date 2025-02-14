"use strict";
const scrollStep1 = document.getElementById('scroll_step1');
const scrollStep2 = document.getElementById('scroll_step2');
const scrollStep3 = document.getElementById('scroll_step3');
const scrollStep4 = document.getElementById('scroll_step4');
const explains = document.querySelectorAll('.explain');
const firstSvg = document.getElementById('first_svg');
const elements = document.querySelectorAll('.sub_name2 > .right, .sub_name2 > .left');
let stepLocation1 = 277;
let stepLocation2 = 900;
let stepLocation4 = 4950;
let scrollLocation1 = 200;
let scrollLocation2 = 700;
let scrollLocation4 = 4800;
scrollStep1.addEventListener('click', () => {
    console.log('scrollStep1 clicked!');
    window.scroll({
        top: stepLocation1,
        behavior: 'smooth'
    });
    explains.forEach((explain, index) => {
        setTimeout(() => {
            if (index > 0) {
                explains[index - 1].classList.remove('active');
            }
            explain.classList.add('active');
        }, index * 600);
    });
    setTimeout(() => {
        explains[explains.length - 1].classList.remove('active');
    }, explains.length * 600);
});
scrollStep2.addEventListener('click', () => {
    console.log('scrollStep2 clicked!');
    window.scroll({
        top: stepLocation2,
        behavior: 'smooth'
    });
    if (firstSvg) {
        firstSvg.classList.add('visible');
    }
});
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition === 0) {
        if (firstSvg) {
            firstSvg.classList.remove('visible');
        }
    }
    if (scrollPosition == scrollLocation1) {
        explains.forEach((explain, index) => {
            setTimeout(() => {
                if (index > 0) {
                    explains[index - 1].classList.remove('active');
                }
                explain.classList.add('active');
            }, index * 600);
        });
        setTimeout(() => {
            explains[explains.length - 1].classList.remove('active');
        }, explains.length * 600);
    }
    if (scrollPosition > scrollLocation2) {
        if (firstSvg) {
            firstSvg.classList.add('visible');
        }
    }
    if (scrollPosition < scrollLocation4) {
        elements.forEach(element => element.classList.remove('visible'));
    }
    if (scrollPosition > scrollLocation4) {
        let delay = 0;
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('visible');
            }, delay);
            delay += 850;
        });
    }
});
scrollStep4.addEventListener('click', () => {
    console.log('scrollStep2 clicked!');
    window.scroll({
        top: stepLocation4,
        behavior: 'smooth'
    });
    elements.forEach(element => element.classList.remove('visible'));
    let delay = 0;
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('visible');
        }, delay);
        delay += 850;
    });
});
