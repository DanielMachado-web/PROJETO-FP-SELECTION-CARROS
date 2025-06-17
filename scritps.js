const items = document.querySelectorAll('.list .item');
const indicators = document.querySelectorAll('.indicators ul li');
let currentIndex = 0;

// Função para atualizar o slide ativo
function updateSlide(index) {
    items.forEach((item, i) => {
        item.classList.toggle('active', i === index);
        item.style.opacity = i === index ? '1' : '0';
    });

    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
}

// Navegar para o próximo slide
function nextSlide() {
    currentIndex = (currentIndex + 1) % items.length;
    updateSlide(currentIndex);
}

// Navegar para o slide anterior
function prevSlide() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateSlide(currentIndex);
}

// Adicionar eventos aos botões de navegação
document.querySelector('.arrows button:nth-child(1)').addEventListener('click', prevSlide);
document.querySelector('.arrows button:nth-child(2)').addEventListener('click', nextSlide);

// Inicializar o primeiro slide
updateSlide(currentIndex);

// Adicionar efeito de hover nos carros
const carImages = document.querySelectorAll('.car-img .img');

carImages.forEach((img) => {
    img.addEventListener('mouseenter', () => {
        img.style.transform = 'rotate(0deg)';
        img.style.transition = 'transform 0.5s';
    });

    img.addEventListener('mouseleave', () => {
        img.style.transform = 'rotate(-23deg)';
    });
});
