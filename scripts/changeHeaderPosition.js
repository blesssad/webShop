window.addEventListener("scroll", function() {
    let header = document.querySelector("header");
    let isSticky = window.scrollY > header.offsetHeight;

    if (!header.classList.contains("sticky") && isSticky) {
        header.classList.add("sticky");
    }

    if (header.classList.contains("sticky") && !isSticky) {
        header.classList.remove("sticky");
    }
});
