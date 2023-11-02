let openButton = document.getElementsByClassName('menuButton')[0];
let navMenu = document.getElementsByClassName('menu')[0];

openButton.addEventListener('click', function() {
    navMenu.classList.toggle('open');
    document.body.style.overflow = 'hidden';
    console.log("sss")
});