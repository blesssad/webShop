document.addEventListener("DOMContentLoaded", function () {
    const list = document.querySelector('.list');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    let currentIndex = 0;
    let timer;

    function showSlide(index) {
        const newPosition = -index * 100;
        list.style.transform = `translateX(${newPosition}%)`;
    }

    function navigate() {
        currentIndex += 1;

        if (currentIndex === list.children.length) {
            currentIndex = 0;
        }

        showSlide(currentIndex);
    }

    function resetTimer() {
        clearInterval(timer);
        timer = setInterval(navigate, 6000);
    }

    prevButton.addEventListener('click', function () {

        currentIndex -= 1;

        if (currentIndex < 0) {
            currentIndex = list.children.length - 1;
        }

        showSlide(currentIndex);
        resetTimer();
    });

    nextButton.addEventListener('click', function () {

        currentIndex += 1;

        if (currentIndex === list.children.length) {
            currentIndex = 0;
        }

        showSlide(currentIndex);
        resetTimer();
    });

    timer = setInterval(navigate, 6000);
});