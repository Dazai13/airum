/*Scrolling*/
document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('[data-target]');
  
  // Добавляем обработчик клика для каждой кнопки
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();

      const targetSelector = this.getAttribute('data-target');

      const targetElement = document.querySelector(targetSelector);
      
      if (targetElement) {
        // Плавная прокрутка к элементу
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        targetElement.classList.add('scrolled-to');

        setTimeout(() => {
          targetElement.classList.remove('scrolled-to');
        }, 2000);
      } else {
        console.warn(`Элемент не найден: ${targetSelector}`);
      }
    });
  });
});
/*Slider*/
$(document).ready(function(){
  $('.banner__slider').slick({
    arrows:false,
    infinite: true,
    autoplay: true, 
    autoplaySpeed:7000,
    speed: 300,
    slidesToShow: 1,
    centerMode: false,
    adaptiveHeight: true
  });
});
/*Accordion*/
document.addEventListener('DOMContentLoaded', function() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion__item-header');
        const icon = header.querySelector('.accordion__header-icon use');
        const content = item.querySelector('.accordion__item-content');
        
        header.addEventListener('click', () => {
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherIcon = otherItem.querySelector('.accordion__header-icon use');
                    otherIcon.setAttribute('xlink:href', 'assets/images/sprite.svg#arrow');
                    const otherContent = otherItem.querySelector('.accordion__item-content');
                    otherContent.style.maxHeight = null;
                }
            });
            
            const isActive = item.classList.toggle('active');
            
            if (isActive) {
                icon.setAttribute('xlink:href', 'assets/images/sprite.svg#line');
                content.style.maxHeight = content.scrollHeight + 'px';
                setTimeout(() => {
                    content.style.maxHeight = 'none';
                }, 300);
            } else {
                icon.setAttribute('xlink:href', 'assets/images/sprite.svg#arrow');
                content.style.maxHeight = content.scrollHeight + 'px';
                setTimeout(() => {
                    content.style.maxHeight = '0';
                }, 10);
            }
        });
        
        content.addEventListener('transitionend', function() {
            if (!item.classList.contains('active')) {
                content.style.maxHeight = null;
            }
        });
        
        if (item.classList.contains('active')) {
            content.style.maxHeight = 'none';
        }
    });
});