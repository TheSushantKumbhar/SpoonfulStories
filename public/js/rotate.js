
function movePlates() {
    const plates = document.querySelectorAll('.half-circle-img');

    let positions = [];
    plates.forEach(plate => {
        const computedStyle = window.getComputedStyle(plate).getPropertyValue('transform');
        positions.push(computedStyle);
    });
    plates.forEach((plate, index) => {
        if (index === plates.length - 1) {
            plate.style.transform = positions[0];
        } else {
            plate.style.transform = positions[index + 1];
        }
    });
}

setInterval(movePlates, 2000)
