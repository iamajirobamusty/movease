const icon = document.getElementById('show-input');
const inputContainer = document.getElementById('input-container');
const openPopupButton = document.getElementById('open-popup');
const closePopupButton = document.getElementById('close-popup');
const popupContainer = document.getElementById('popup-container');
const overlay = document.getElementById('overlay');


icon.addEventListener('click', () => {
    if (inputContainer.style.display === 'none') {
        inputContainer.style.display = 'block';
    } else {
        inputContainer.style.display = 'none';
    }
});

openPopupButton.addEventListener('click', () => {
    popupContainer.style.display = 'block';
    overlay.style.display = 'block';
});

// Close the popup
closePopupButton.addEventListener('click', () => {
    popupContainer.style.display = 'none';
    overlay.style.display = 'none';
});

// Close the popup when clicking outside
overlay.addEventListener('click', () => {
    popupContainer.style.display = 'none';
    overlay.style.display = 'none';
});


