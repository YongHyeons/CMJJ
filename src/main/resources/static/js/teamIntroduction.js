"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const coloredElements = document.querySelectorAll('.colored');
    const teamPics = document.querySelectorAll('.team_pic');
    const topNames = document.querySelectorAll('.top-name');
    const teamPicsBorder = document.querySelectorAll('.team_image');
    const elementColors = new Map();
    const borderAndColorState = new Map();
    function interpolateColor(color1, color2, ratio) {
        if (color1.length !== 3 || color2.length !== 3) {
            console.error('Color arrays must have exactly 3 elements.');
            return 'rgb(0, 0, 0)';
        }
        const [r1, g1, b1] = color1;
        const [r2, g2, b2] = color2;
        if ([r1, g1, b1, r2, g2, b2].some(val => val < 0 || val > 255)) {
            console.error('Color values must be between 0 and 255.');
            return 'rgb(0, 0, 0)';
        }
        const clampedRatio = Math.min(Math.max(ratio, 0), 1);
        const r = Math.round(r1 * (1 - clampedRatio) + r2 * clampedRatio);
        const g = Math.round(g1 * (1 - clampedRatio) + g2 * clampedRatio);
        const b = Math.round(b1 * (1 - clampedRatio) + b2 * clampedRatio);
        return `rgb(${r}, ${g}, ${b})`;
    }
    function handleScroll() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        coloredElements.forEach((element, index) => {
            let targetScrollPosition = (index + 1) * 200;
            if (scrollTop === 0) {
                element.style.color = '';
                elementColors.delete(element);
            }
            else if (scrollTop >= targetScrollPosition - 100 && scrollTop <= targetScrollPosition + 100) {
                const scrollRatio = (scrollTop - (targetScrollPosition - 100)) / 200;
                const clampedRatio = Math.min(Math.max(scrollRatio, 0), 1);
                const color1 = [87, 196, 145];
                const color2 = [18, 51, 100];
                const r = Math.round(color1[0] * (1 - clampedRatio) + color2[0] * clampedRatio);
                const g = Math.round(color1[1] * (1 - clampedRatio) + color2[1] * clampedRatio);
                const b = Math.round(color1[2] * (1 - clampedRatio) + color2[2] * clampedRatio);
                const newColor = `rgb(${r}, ${g}, ${b})`;
                element.style.color = newColor;
                elementColors.set(element, newColor);
            }
            else {
                if (!elementColors.has(element)) {
                    elementColors.set(element, '');
                }
                element.style.color = elementColors.get(element) || '';
            }
        });
        teamPics.forEach((element, index) => {
            let targetScrollPosition = 1000 + (index + 1) * 150;
            if (scrollTop === 0) {
                element.style.borderColor = '';
                teamPicsBorder[index].style.borderColor = '';
                topNames[index].style.color = '';
                borderAndColorState.delete(element);
            }
            else if (scrollTop >= targetScrollPosition - 150 && scrollTop <= targetScrollPosition + 150) {
                const scrollRatio = (scrollTop - (targetScrollPosition - 150)) / 300;
                const clampedRatio = Math.min(Math.max(scrollRatio, 0), 1);
                const borderColorStart = [87, 196, 145];
                const borderColorEnd = [18, 51, 100];
                const textColorStart = [87, 196, 145];
                const textColorEnd = [18, 51, 100];
                const borderColor = interpolateColor(borderColorStart, borderColorEnd, clampedRatio);
                const textColor = interpolateColor(textColorStart, textColorEnd, clampedRatio);
                element.style.borderColor = borderColor;
                topNames[index].style.color = textColor;
                teamPicsBorder[index].style.borderColor = borderColor;
                borderAndColorState.set(element, { borderColor, textColor });
            }
            else {
                if (!borderAndColorState.has(element)) {
                    borderAndColorState.set(element, { borderColor: '', textColor: '' });
                }
                const savedColors = borderAndColorState.get(element) || { borderColor: '', textColor: '' };
                element.style.borderColor = savedColors.borderColor;
                topNames[index].style.color = savedColors.textColor;
                teamPicsBorder[index].style.borderColor = savedColors.borderColor;
            }
        });
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll();
});
