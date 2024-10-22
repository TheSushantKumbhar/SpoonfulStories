document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('celebrationCanvas');
    if (!canvas) return; // Exit if the canvas is not found

    const ctx = canvas.getContext('2d');
    let particles = [];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Load chef hat image
    const chefHatImg = new Image();
    chefHatImg.src = '/images/chef1-hat.png'; // Replace with the path to your chef hat image

    // Helper function for random values
    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Particle (Chef Hat) class with gentle balloon float effect
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = random(30, 50); // Size of the chef hat image
            this.speedY = random(0.5, 1.5); // Slow upward movement
            this.sway = random(0.5, 2); // Horizontal sway effect
            this.angle = random(0, Math.PI * 2); // Initial angle for sway
            this.alpha = 1;
        }

        update() {
            this.y -= this.speedY; // Move upwards
            this.x += Math.sin(this.angle) * this.sway; // Sway left and right
            this.angle += 0.03; // Change angle for sway
            this.alpha -= 0.01; // Gradually fade out
            if (this.alpha < 0) this.alpha = 0;
        }

        draw() {
            ctx.globalAlpha = this.alpha;
            ctx.drawImage(chefHatImg, this.x, this.y, this.size, this.size);
            ctx.globalAlpha = 1;
        }
    }

    // Create fewer hats, with randomness
    function createSingleHat() {
        // Random chance to spawn a hat (e.g., 30% chance)
        if (Math.random() < 0.3) {
            const x = random(0, canvas.width); // Random x position
            const y = random(0, canvas.height); // Anywhere on the screen (top to bottom)
            particles.push(new Particle(x, y)); // Add a single hat particle
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle, index) => {
            particle.update();
            particle.draw();

            // Remove particles that have faded out or gone off-screen
            if (particle.alpha === 0 || particle.y < -particle.size) {
                particles.splice(index, 1);
            }
        });

        requestAnimationFrame(animate);
    }

    animate();

    //Add a single hat at random positions when user scrolls the page
    window.addEventListener('scroll', () => {
        createSingleHat();  
    });


    // Resize the canvas when window size changes
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});



// document.addEventListener('DOMContentLoaded', () => {
//     const canvas = document.getElementById('celebrationCanvas');
//     if (!canvas) return; // Exit if the canvas is not found

//     const ctx = canvas.getContext('2d');
//     let particles = [];
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     // Load chef hat image
//     const chefHatImg = new Image();
//     chefHatImg.src = 'images/chef1-hat.png'; // Replace with the path to your chef hat image

//     // Helper function for random values
//     function random(min, max) {
//         return Math.random() * (max - min) + min;
//     }

//     // Particle (Chef Hat) class with gentle balloon float effect
//     class Particle {
//         constructor(x, y) {
//             this.x = x;
//             this.y = y;
//             this.size = random(30, 50); // Size of the chef hat image
//             this.speedY = random(0.5, 1.5); // Slow upward movement
//             this.sway = random(0.5, 2); // Horizontal sway effect
//             this.angle = random(0, Math.PI * 2); // Initial angle for sway
//             this.alpha = 1;
//         }

//         update() {
//             this.y -= this.speedY; // Move upwards
//             this.x += Math.sin(this.angle) * this.sway; // Sway left and right
//             this.angle += 0.03; // Change angle for sway
//             this.alpha -= 0.01; // Gradually fade out
//             if (this.alpha < 0) this.alpha = 0;
//         }

//         draw() {
//             ctx.globalAlpha = this.alpha;
//             ctx.drawImage(chefHatImg, this.x, this.y, this.size, this.size);
//             ctx.globalAlpha = 1;
//         }
//     }

//     // Function to create multiple hats
//     function createMultipleHats() {
//         // Spawn 5-6 hats at random positions
//         const numberOfHats = Math.floor(random(5, 7)); // Randomly choose between 5 and 6 hats
//         for (let i = 0; i < numberOfHats; i++) {
//             const x = random(0, canvas.width); // Random x position
//             const y = random(0, canvas.height); // Random y position (anywhere on screen)
//             particles.push(new Particle(x, y)); // Add the particle
//         }
//     }

//     // Animation loop
//     function animate() {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         particles.forEach((particle, index) => {
//             particle.update();
//             particle.draw();

//             // Remove particles that have faded out or gone off-screen
//             if (particle.alpha === 0 || particle.y < -particle.size) {
//                 particles.splice(index, 1);
//             }
//         });

//         requestAnimationFrame(animate);
//     }

//     // Constantly create 5-6 hats every 500ms
//     setInterval(() => {
//         createMultipleHats();
//     }, 1000); // Adjust the interval time for different frequencies

//     animate();

//     // Resize the canvas when window size changes
//     window.addEventListener('resize', () => {
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;
//     });
// });

