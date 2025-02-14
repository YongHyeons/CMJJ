let category_main = document.getElementById('categorymain-temp').getAttribute('data-main');
let category_sub = document.getElementById('categorymain-temp').getAttribute('data-sub');

document.addEventListener('DOMContentLoaded', function() {
    const menuFirst = document.getElementById('menuFirst');
    menuFirst.value = category_main;

    const menuSeconds = document.querySelectorAll('#selectContainer2 .menu_choice');
    menuSeconds.forEach(select => {
        select.style.display = 'none';
    });

    const targetId = menuFirst.options[menuFirst.selectedIndex].getAttribute('data-target');
    if (targetId) {
        const targetMenu = document.getElementById(targetId);
        if (targetMenu) {
            targetMenu.style.display = 'block';
            targetMenu.value = category_sub;
        }
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const savedDifficultyValue = document.getElementById('difficulty-temp').getAttribute('data-value');
    const buttons_m = [document.getElementById('beginner'), document.getElementById('intermediate'), document.getElementById('advanced')];

    buttons_m.forEach(button => {
        const buttonValue = button.querySelector('a').getAttribute('data-value');
        if (parseInt(buttonValue) === parseInt(savedDifficultyValue)) {
            button.classList.add('active');
            window.difficultyValue_m = buttonValue;
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const savedHourValue = document.getElementById('hour-temp').getAttribute('data-value'); 
    const hours_m = [
        document.getElementById('hour1'),
        document.getElementById('hour2'),
        document.getElementById('hour3'),
        document.getElementById('hour4'),
        document.getElementById('hour5')
    ];

    hours_m.forEach(button => {
        const buttonValue = button.querySelector('a').getAttribute('data-value');
        if (parseInt(buttonValue) === parseInt(savedHourValue)) {
            button.classList.add('active');
            window.hourValue_m = buttonValue;
        }
    });
});



