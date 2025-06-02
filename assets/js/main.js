/*Lazy load*/
document.addEventListener('DOMContentLoaded', function() {
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      rootMargin: '200px',
      threshold: 0.1
    };

    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          if (img.dataset.srcset) img.srcset = img.dataset.srcset;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    }, observerOptions);

    const lazyImages = document.querySelectorAll('img.lazy');

    lazyImages.forEach(img => {
   const imgRect = img.getBoundingClientRect();
      const isVisible = (
        imgRect.top <= window.innerHeight && 
        imgRect.bottom >= 0
      );
      
      if (isVisible) {
        if (img.dataset.srcset) img.srcset = img.dataset.srcset;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
      } else {

        lazyImageObserver.observe(img);
      }
    });

  } else {

    console.warn('Intersection Observer не поддерживается. Загружаем все изображения.');
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

const image = document.getElementById('responsive-image');
function updateImageBasedOnScreenWidth() {
  const screenWidth = window.innerWidth;

  if (screenWidth < 1200) {
    image.src = 'assets/images/catalog__image-7.png';
  } 
  else {
    image.src = 'assets/images/catalog__image-6.png';
  }
}
window.addEventListener('load', updateImageBasedOnScreenWidth);
window.addEventListener('resize', updateImageBasedOnScreenWidth);

document.addEventListener('DOMContentLoaded', function() {

  const body = document.body;
  const header = document.querySelector('.header');
  const headerInnerMob = document.querySelector('.header__inner-mob');
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('overlay');
  const menuClose = document.getElementById('menuClose');

  const mobileDefaultContent = `
    <div class="header__inner-burger">
        <svg id="menuToggle">
            <use xlink:href="assets/images/sprite.svg#burger"></use>
        </svg>
    </div>
    <div class="header__inner-logo">
      <img class="lazy" src="assets/images/logo__ver2.png" alt="">
    </div>
    <div class="header__inner-nav">
      <nav class="header__nav">
        <ul class="header__nav-items">
          <li class="header__nav-item">
            <img class="lazy" src="assets/images/catalog.png" alt="">
            <a data-target="#catalog" class="header__nav-link">Каталог</a>
          </li>
          <li class="header__nav-item">
            <img class="lazy" src="assets/images/preorder.png" alt="">
            <a data-target="#catalog" class="header__nav-link">Предзаказ</a>
          </li>
          <li class="header__nav-item">
            <img class="lazy" src="assets/images/credit__icon.png" alt="">
            <a data-target="#credit" class="header__nav-link">Рассрочка</a>
          </li>
          <li class="header__nav-item">
            <img class="lazy" src="assets/images/contact.png" alt="">
            <a data-target="#contact" class="header__nav-link">Связаться</a>
          </li>
        </ul>
      </nav>
    </div>
    <nav class="mobile-menu" id="mobileMenu">
      <div class="mobile__menu-header">
        <div class="container">
          <div class="menu__header-close" id="menuClose"><img src="assets/images/close.png" alt=""></div>
          <div class="menu__header-logo"><img src="assets/images/logo__ver2.png" alt=""></div>
        </div>
      </div>
      <div class="mobile__menu-body">
        <nav class="footer__nav">
          <div class="footer__nav-item">
            <a data-target="#catalog" class="footer__nav-link">
              <span class="footer__link-text">Каталог</span>
              <svg class="menu__header-icon"><use xlink:href="assets/images/sprite.svg#arrow__black"></use></svg>
            </a>
          </div>
          <div class="footer__nav-item">
            <a data-target="#catalog" class="footer__nav-link">
              <span class="footer__link-text">Предзаказ</span>
              <svg class="menu__header-icon"><use xlink:href="assets/images/sprite.svg#arrow__black"></use></svg>
            </a>
          </div>
          <div class="footer__nav-item">
            <a data-target="#credit" class="footer__nav-link">
              <span class="footer__link-text">Рассрочка</span>
              <svg class="menu__header-icon"><use xlink:href="assets/images/sprite.svg#arrow__black"></use></svg>
            </a>
          </div>
          <div class="footer__nav-item">
            <a data-target="#cooperation" class="footer__nav-link">
              <span class="footer__link-text">Франшиза Айрум</span>
              <svg class="menu__header-icon"><use xlink:href="assets/images/sprite.svg#arrow__black"></use></svg>
            </a>
          </div>
          <div class="footer__nav-item">
            <a data-target="#contact" class="footer__nav-link">
              <span class="footer__link-text">Связаться</span>
              <svg class="menu__header-icon"><use xlink:href="assets/images/sprite.svg#arrow__black"></use></svg>
            </a>
          </div>
        </nav>
        <div class="mobile__menu-policy">Все права защищены. © 2025 </div>
      </div>
    </nav>
    <div class="overlay" id="overlay"></div>
  `;

  const mobileScrolledContent = `
    <div class='header__inner-icons'>
        <div class="header__inner-burger">
            <svg id="menuToggle">
                <use xlink:href="assets/images/sprite.svg#burger__green"></use>
            </svg>
        </div>
        <div class="header__inner-logo">
        <img class="lazy" src="assets/images/logo__ver1.png" alt="">
        </div>
    </div>
    <div class="header__inner-nav">
      <nav class="header__nav">
        <ul class="header__nav-items">
          <li class="header__nav-item">
            <img class="lazy" src="assets/images/catalog.png" alt="">
            <a data-target="#catalog" class="header__nav-link">Каталог</a>
          </li>
          <li class="header__nav-item">
            <img class="lazy" src="assets/images/preorder.png" alt="">
            <a data-target="#catalog" class="header__nav-link">Предзаказ</a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="header__block-item">
    <img class="lazy" src="assets/images/contact__black.png" alt="">
    <a data-target="#contact" class="header__nav-link">Связаться</a>
    </div>
    <nav class="mobile-menu" id="mobileMenu">
      <div class="mobile__menu-header">
        <div class="container">
          <div class="menu__header-close" id="menuClose"><img src="assets/images/close.png" alt=""></div>
          <div class="menu__header-logo"><img src="assets/images/logo__ver2.png" alt=""></div>
        </div>
      </div>
      <div class="mobile__menu-body">
        <nav class="footer__nav">
          <div class="footer__nav-item">
            <a data-target="#catalog" class="footer__nav-link">
              <span class="footer__link-text">Каталог</span>
              <svg class="menu__header-icon"><use xlink:href="assets/images/sprite.svg#arrow__black"></use></svg>
            </a>
          </div>
          <div class="footer__nav-item">
            <a data-target="#catalog" class="footer__nav-link">
              <span class="footer__link-text">Предзаказ</span>
              <svg class="menu__header-icon"><use xlink:href="assets/images/sprite.svg#arrow__black"></use></svg>
            </a>
          </div>
          <div class="footer__nav-item">
            <a data-target="#credit" class="footer__nav-link">
              <span class="footer__link-text">Рассрочка</span>
              <svg class="menu__header-icon"><use xlink:href="assets/images/sprite.svg#arrow__black"></use></svg>
            </a>
          </div>
          <div class="footer__nav-item">
            <a data-target="#cooperation" class="footer__nav-link">
              <span class="footer__link-text">Франшиза Айрум</span>
              <svg class="menu__header-icon"><use xlink:href="assets/images/sprite.svg#arrow__black"></use></svg>
            </a>
          </div>
          <div class="footer__nav-item">
            <a data-target="#contact" class="footer__nav-link">
              <span class="footer__link-text">Связаться</span>
              <svg class="menu__header-icon"><use xlink:href="assets/images/sprite.svg#arrow__black"></use></svg>
            </a>
          </div>
        </nav>
        <div class="mobile__menu-policy">Все права защищены. © 2025 </div>
      </div>
    </nav>
    <div class="overlay" id="overlay"></div>
  `;

 let headerHeight = header ? header.offsetHeight : 0;
  if (headerInnerMob) headerInnerMob.innerHTML = mobileDefaultContent;

  function toggleMenu(open) {
    if (open) {
      body.classList.add('menu-open');
      if (overlay) overlay.classList.add('active');
      if (mobileMenu) mobileMenu.classList.add('active');
    } else {
      body.classList.remove('menu-open');
      if (overlay) overlay.classList.remove('active');
      if (mobileMenu) mobileMenu.classList.remove('active');
    }
  }

  function updateHeaderContent(scrolled) {
    if (!headerInnerMob) return;
    
    headerInnerMob.innerHTML = scrolled ? mobileScrolledContent : mobileDefaultContent;

    initEventListeners();
  }

  function handleSmoothScroll(e) {
    e.preventDefault();
    const targetSelector = this.getAttribute('data-target');
    const targetElement = document.querySelector(targetSelector);
    
    if (targetElement) {
      toggleMenu(false);
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      targetElement.classList.add('scrolled-to');
      setTimeout(() => targetElement.classList.remove('scrolled-to'), 2000);
    }
  }

  function initEventListeners() {

    const newMenuToggle = document.getElementById('menuToggle');
    if (newMenuToggle) {
      newMenuToggle.addEventListener('click', () => toggleMenu(true));
    }

    document.querySelectorAll('[data-target]').forEach(link => {
      link.addEventListener('click', handleSmoothScroll);
    });
  }

  let isScrolling;
  window.addEventListener('scroll', function() {
    const currentScroll = window.scrollY;
    const scrollThreshold = 100;
    
    clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
      const scrolled = currentScroll > scrollThreshold;
      
      if (scrolled) {
        header.classList.add('fixed-header');
        updateHeaderContent(true);
      } else {
        header.classList.remove('fixed-header');
        updateHeaderContent(false);
      }
    }, 100);
  }, false);

  if (overlay) overlay.addEventListener('click', () => toggleMenu(false));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && toggleMenu(false));

  initEventListeners();
  updateHeaderContent(false);
});