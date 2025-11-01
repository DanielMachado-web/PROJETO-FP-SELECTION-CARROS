let prevButton = document.getElementById('prev')
let nextButton = document.getElementById('next')
let container = document.querySelector('.container')
let items = container.querySelectorAll('.list .item')
let indicator = document.querySelector('.indicators')
let dots = indicator.querySelectorAll('ul li')
let list = container.querySelector('.list')
let section = document.querySelector('section')

let active = 0
let firstPosition = 0
let lastPosition = items.length - 1

// Define background colors for each car
const backgroundColors = [
    'linear-gradient(135deg, #470964, #791fd3, #2c0442)',
    'linear-gradient(135deg, #d31f1f, #ff2b2b, #8b0000)',
    'linear-gradient(135deg, #0a5e0a, #0bdb0b, #044d04)'
]

// Add initial animation classes
document.addEventListener('DOMContentLoaded', function() {
    // Set initial background
    if (section) {
        section.style.background = backgroundColors[active]
    }
    
    // Add staggered animations to content elements
    const activeItem = document.querySelector('.item.active');
    if (activeItem) {
        const contentElements = activeItem.querySelectorAll('.content > *');
        contentElements.forEach((el, index) => {
            el.style.animationDelay = `${0.3 + index * 0.2}s`;
        });
    }
});

function setSlider() {
  let itemOld = container.querySelector('.list .item.active')
  if (itemOld) {
    itemOld.classList.remove('active')
    // Reset animations for the old item
    const oldContent = itemOld.querySelectorAll('.content *')
    oldContent.forEach(el => {
      el.style.transform = 'translateX(100px)'
      el.style.opacity = '0'
    })
  }

  let dotsOld = indicator.querySelector('ul li.active')
  if (dotsOld) {
    dotsOld.classList.remove('active')
  }
  
  if (dots[active]) {
    dots[active].classList.add('active')
  }

  // Add active class to new item
  items[active].classList.add('active')

  // Animate content elements with staggered delays
  const newContent = items[active].querySelectorAll('.content > *')
  newContent.forEach((el, index) => {
    // Reset any existing animations
    el.style.animation = 'none';
    
    // Trigger reflow
    void el.offsetWidth;
    
    // Apply new animation with delay
    el.style.animation = null;
    el.style.animationDelay = `${index * 0.2}s`;
  });

  // Update indicator number
  const numberElement = indicator.querySelector('.number');
  if (numberElement) {
    numberElement.innerHTML = '0' + (active + 1);
    
    // Add pulse effect when changing
    numberElement.style.animation = 'none';
    void numberElement.offsetWidth;
    numberElement.style.animation = 'numberPulse 0.5s';
  }
  
  // Change background color with transition
  if (section) {
    section.style.transition = 'background 0.8s ease-in-out';
    section.style.background = backgroundColors[active];
  }
}

nextButton.onclick = () => {
  list.style.setProperty('--calculation', 1)
  active = active + 1 > lastPosition ? 0 : active + 1
  setSlider()
  items[active].classList.add('active')
}

prevButton.onclick = () => {
  list.style.setProperty('--calculation', -1)
  active = active - 1 < firstPosition ? lastPosition : active - 1
  setSlider()
  items[active].classList.add('active')
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        prevButton.click();
    } else if (e.key === 'ArrowRight') {
        nextButton.click();
    }
});

// Add hover effects to buttons
const infoButtons = document.querySelectorAll('.information');
infoButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 5px 15px rgba(190, 255, 27, 0.4)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
    
    button.addEventListener('mousedown', function() {
        this.style.transform = 'translateY(1px)';
    });
});