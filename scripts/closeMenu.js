let closeButton = document.getElementsByClassName('closeButton')[0];
let menu = document.getElementsByClassName('menu')[0];

closeButton.addEventListener('click', function() {
    menu.classList.remove('open');
    document.body.style.overflow = 'auto';
});