"use strict";

function getCsrfToken() {
    const token = document.querySelector('meta[name="_csrf"]').getAttribute('content');
    if (!token) {
        console.error('CSRF token not found');
    }
    return token;
}
document.addEventListener('DOMContentLoaded', () => {
    const heartButtons = document.querySelectorAll('.heart');

    heartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const cId = button.getAttribute('data-class-id');
            const uId = button.getAttribute('data-user-id');

            const isActive = button.classList.contains('active');


            fetch(isActive ? `/api/wishlist/remove?uId=${uId}&cId=${cId}` : `/api/wishlist/add?uId=${uId}&cId=${cId}`, {
                method: 'POST',
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    button.classList.toggle('active');
                } else {
                    console.error(isActive ? 'Failed to remove from wishlist:' : 'Failed to add to wishlist:', data.message);
                }
            })
            .catch(error => console.error(isActive ? 'Error removing from wishlist:' : 'Error adding to wishlist:', error));
        });

        fetch(`/api/wishlist/check?uId=${button.getAttribute('data-user-id')}&cId=${button.getAttribute('data-class-id')}`)
            .then(response => response.json())
            .then(data => {
                if (data.isInWishlist) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            })
            .catch(error => console.error('Error fetching wishlist status:', error));
    });
});
