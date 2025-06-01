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
/*Lazy load*/
document.addEventListener('DOMContentLoaded', function() {
  // Проверяем поддержку Intersection Observer
  if ('IntersectionObserver' in window) {
    // Настройки: загружать изображения за 200px до их появления в viewport
    const observerOptions = {
      rootMargin: '200px',
      threshold: 0.1
    };

    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          // Поддержка srcset
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
          }
          
          // Основной src
          img.src = img.dataset.src;
          
          // Удаляем класс lazy (опционально)
          img.classList.remove('lazy');
          
          // Отключаем наблюдение
          observer.unobserve(img);
        }
      });
    }, observerOptions);

    // Находим все lazy-изображения и добавляем их в Observer
    const lazyImages = document.querySelectorAll('img.lazy');
    lazyImages.forEach(img => lazyImageObserver.observe(img));

  } else {
    // Fallback для старых браузеров (загрузка всех изображений сразу)
    console.warn('Intersection Observer не поддерживается. Используем fallback.');
    const lazyImages = document.querySelectorAll('img.lazy');
    
    lazyImages.forEach(img => {
      if (img.dataset.srcset) img.srcset = img.dataset.srcset;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
    });
  }
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