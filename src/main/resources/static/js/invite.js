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


const invBtn = document.getElementById('invite_friend_button');

invBtn.addEventListener('click', () => {
    const invCode = document.getElementById('invCode').getAttribute('data-value');
    const invInput = document.getElementById('invite_email_input').value;
    const username = document.getElementById('username').getAttribute('data-username');

    const emailData = {
        to: invInput,
        subject: `${username}님으로부터 취미존중 초대장이 도착했습니다!`,
        body: `${username}님의 초대장\n추천인 코드 : ${invCode}\nhttp://cmjj.loca.lt/main`
    };

    fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('네트워크 응답이 올바르지 않습니다.');
        }
        return response.text();
    })
    .then(data => {
        alert('성공적으로 친구를 초대했습니다!');
        window.location.href = '/mypage/invite';
    })
    .catch(error => {
        console.error('오류 발생:', error);
        alert('초대에 실패했습니다. 다시 시도해 주세요.');
    });
});

