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
const cancelBtn = document.getElementById('cancelBtn');
cancelBtn.addEventListener('click',()=>{
	modal.style.display = 'none';
});

const saveBtn = document.getElementById('saveBtn');

saveBtn.addEventListener('click', () => {
    const cpInput = document.getElementById('coupon_input');
    const code = cpInput.value;

    fetch('/cpreg', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(code)
    })
    .then(response => {
        return response.text().then(message => {
            if (response.ok) {
                alert("쿠폰 등록을 완료했습니다!");
				location.reload();
            } else {
                alert("이미 등록하신 쿠폰이거나 잘못된 쿠폰 코드입니다."); 
            }
        });
    })
    .catch(error => console.error('Error:', error));
});


