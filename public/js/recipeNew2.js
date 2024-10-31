let currentSlide = 0;
const boxes = document.querySelectorAll('.recipe-form-box1, .recipe-form-box2, .recipe-form-box3');

function showSlide(index) {
    boxes.forEach((box, i) => {
        box.classList.remove('active', 'exit');
        
        if (i === index) {
            box.classList.add('active');
        } else if (i === index - 1) {
            box.classList.add('exit');
        }
    });
}

function nextSlide() {
    if (currentSlide < boxes.length - 1) {
        currentSlide++;
        showSlide(currentSlide);
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        showSlide(currentSlide);
    }
}


showSlide(currentSlide);

