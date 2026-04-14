document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mouse tracking for cursor glow
  const cursorGlow = document.getElementById('cursor-glow');
  const cards = document.querySelectorAll('.card');
  
  // Throttle the mousemove for performance
  let isTicking = false;

  document.addEventListener('mousemove', (e) => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        const x = e.clientX;
        const y = e.clientY;
        
        // Move the glow orb
        cursorGlow.style.left = `${x}px`;
        cursorGlow.style.top = `${y}px`;

        // Parallax effect on cards
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const moveX = (x - centerX) / 50;
        const moveY = (y - centerY) / 50;

        cards.forEach((card, index) => {
          // Adjust movement factor per card
          const factor = index === 1 ? -1 : 1; 
          const depth = (index + 1) * 10;
          card.style.transform = `translate(${moveX * factor * depth}px, ${moveY * factor * depth}px) rotate(${getRotation(index)}deg)`;
        });

        isTicking = false;
      });
      isTicking = true;
    }
  });

  // Base rotation values for cards (to keep their original tilted look)
  function getRotation(index) {
    if(index === 0) return -10;
    if(index === 1) return 15;
    if(index === 2) return 5;
    return 0;
  }

});
