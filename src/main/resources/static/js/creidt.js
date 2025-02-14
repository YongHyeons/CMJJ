"use strict";

function showTab(tabName) {

    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => {
        content.style.display = 'none';
    });

    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.style.display = 'flex';
    }

    document.querySelectorAll('.coupon-tab').forEach(function (tab) {
        tab.classList.remove('active');
    });

    document.querySelector('.coupon-tab[onclick="showTab(\'' + tabName + '\')"]').classList.add('active');
}

const modal = document.getElementById('editModal');
const registerButton = document.getElementById('register-coupon');

registerButton.addEventListener('click', () => {
    modal.style.display = 'flex';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

const creditModal = document.getElementById('creditModal');
const creditButton = document.getElementById('credit-delete');

creditButton.addEventListener('click', () => {
    creditModal.style.display = 'flex';
});

window.addEventListener('click', (event) => {
    if (event.target === creditModal) {
        creditModal.style.display = 'none';
    }
});
