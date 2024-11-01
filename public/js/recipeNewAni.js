const input = document.getElementById('text-input');

input.addEventListener('input', (event) => {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');

    // Position the ripple at a random spot on the screen
    ripple.style.left = `${Math.random() * window.innerWidth}px`;
    ripple.style.top = `${Math.random() * window.innerHeight}px`;

    // Add ripple to the body
    document.body.appendChild(ripple);

    // Remove ripple after animation ends
    ripple.addEventListener('animationend', () => {
        ripple.remove();
    });
});