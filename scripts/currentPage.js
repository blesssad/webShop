document.addEventListener("DOMContentLoaded", function () {
    const currentUrl = window.location.href;
    const navLinks = document.querySelectorAll('.rightHeader a');

    for (let i = 0; i < navLinks.length; i++) {
        console.log(navLinks[i])
        if (navLinks[i].href === currentUrl) {
            navLinks[i].classList.add('active');
            break;
        }
    }
});