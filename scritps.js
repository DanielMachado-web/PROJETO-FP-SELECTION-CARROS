let prevButton = document.getElementById('prev')
let nextButton = document.getElementById('next')
let container = document.querySelector('.container')
let items = container.querySelectorAll('.list .item')
let indicator = document.querySelector('.indicators')
let dots = indicator.querySelectorAll('ul li')
let list = container.querySelector('.list')

let active = 0
let firstPosition = 0
let lastPosition = items.length - 1

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
  dotsOld.classList.remove('active')
  dots[active].classList.add('active')

  // Add active class to new item
  items[active].classList.add('active')

  // Animate content elements
  const newContent = items[active].querySelectorAll('.content *')
  setTimeout(() => {
    newContent.forEach((el, index) => {
      setTimeout(() => {
        el.style.transform = 'translateX(0)'
        el.style.opacity = '1'
      }, index * 100)
    })
  }, 100)

  indicator.querySelector('.number').innerHTML = '0' + (active + 1)
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