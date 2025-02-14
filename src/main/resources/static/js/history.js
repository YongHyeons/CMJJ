"use strict";

function showTab(tabName) {

    const contents = document.querySelectorAll('.tab-content, .tab-content-four');
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

    const activeTab = document.querySelector(`.coupon-tab[onclick="showTab('${tabName}')"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
}
