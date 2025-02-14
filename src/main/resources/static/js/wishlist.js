"use strict";
function addWishlistItem(item) {
    const wishlistItemsContainer = document.getElementById('wishlist-items');
    const newItem = document.createElement('div');
    newItem.className = 'wishlist-item';
    newItem.innerText = item;
    wishlistItemsContainer.appendChild(newItem);
    updateWishlistState();
}
function updateWishlistState() {
    const wishlistItemsContainer = document.getElementById('wishlist-items');
    const emptyWishlistMessage = document.getElementById('empty-wishlist');
    if (wishlistItemsContainer.children.length > 0) {
        emptyWishlistMessage.style.display = 'none';
        wishlistItemsContainer.style.display = 'grid';
    }
    else {
        emptyWishlistMessage.style.display = 'block';
        wishlistItemsContainer.style.display = 'none';
    }
}
document.addEventListener('DOMContentLoaded', function () {
    updateWishlistState();
});
const heartDivs = document.querySelectorAll('.heart');

heartDivs.forEach(div => {
    div.addEventListener('click', () => {
        const cId = div.getAttribute('data-class-id');
        const uId = div.getAttribute('data-user-id');
        const isActive = div.classList.contains('active');
		const gridItemElement = div.closest('.grid-item');
		const emptyMessage = div.classList.contains('wishlist-message');
        fetch(isActive ? `/api/wishlist/remove?uId=${uId}&cId=${cId}` : `/api/wishlist/add?uId=${uId}&cId=${cId}`, {
            method: 'POST',
        })
        .then(response => response.text())
        .then(result => {
            if (result === "success") {
                div.classList.toggle('active'); 
				if (gridItemElement) {
					gridItemElement.classList.add('hidden');
				}
				updateWishlistState();
				
            } else {
                console.error(isActive ? '찜 목록에서 제거 실패:' : '찜 목록에 추가 실패:', result);
            }
        })
        .catch(error => console.error(isActive ? '찜 목록에서 제거하는 중 오류 발생:' : '찜 목록에 추가하는 중 오류 발생:', error));
    });

    fetch(`/api/wishlist/check?uId=${div.getAttribute('data-user-id')}&cId=${div.getAttribute('data-class-id')}`, {
        method: 'GET', 
    })
    .then(response => response.text())
    .then(result => {
        if (result === "true") {
            div.classList.add('active');
        } else {
            div.classList.remove('active'); 
        }
    })
    .catch(error => console.error('위시리스트 상태를 가져오는 중 오류 발생:', error));
});
function updateWishlistState() {
    const wishlistItemsContainer = document.getElementById('wishlist-items');
    const emptyWishlistMessage = document.getElementById('empty-wishlist');
    
    const visibleItems = wishlistItemsContainer.querySelectorAll('.grid-item:not(.hidden)');
    
    if (visibleItems.length > 0) {
        emptyWishlistMessage.style.display = 'none';
        wishlistItemsContainer.style.display = 'grid';
    } else {
        emptyWishlistMessage.style.display = 'block';
        wishlistItemsContainer.style.display = 'none';
    }
}

