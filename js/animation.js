class Animation {
  constructor(elements, options = {}) {
    this.elements = elements;
    this.options = Object.assign({
      duration: 700,
      delay: 100,
      translateY: -50,
      opacity: 0,
      stagger: 100,
    }, options);
  }

  animate() {
    this.elements.forEach((el, i) => {
      el.style.opacity = this.options.opacity;
      el.style.transform = `translateY(${this.options.translateY}px)`;
      setTimeout(() => {
        el.style.transition = `opacity ${this.options.duration}ms, transform ${this.options.duration}ms`;
        el.style.opacity = 1;
        el.style.transform = 'translateY(0)';
      }, this.options.delay + i * this.options.stagger);
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  // Header и заголовок появляются при загрузке
  const header = document.querySelector('.header');
  if (header) {
    new Animation([header], { duration: 800, delay: 100 }).animate();
  }
  const bannerTitle = document.querySelector('.banner__desc-h');
  if (bannerTitle) {
    new Animation([bannerTitle], { duration: 800, delay: 400 }).animate();
  }

  // Header scroll effect
  const headerEl = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      headerEl.classList.add('header--scrolled');
    } else {
      headerEl.classList.remove('header--scrolled');
    }
  });

  // Fade-in OOP
  class FadeIn {
    constructor(selector, options = {}) {
      this.elements = document.querySelectorAll(selector);
      this.options = Object.assign({
        duration: 800,
        translateY: 40,
        trigger: 0.85,
        stagger: 120,
      }, options);
      this.init();
      window.addEventListener('scroll', () => this.handleScroll());
      this.handleScroll();
    }
    init() {
      this.elements.forEach((el, i) => {
        el.style.opacity = 0;
        el.style.transform = `translateY(${this.options.translateY}px)`;
        el.style.transition = `opacity ${this.options.duration}ms, transform ${this.options.duration}ms`;
        el.dataset.animated = 'false';
      });
    }
    handleScroll() {
      this.elements.forEach((el, i) => {
        if (el.dataset.animated === 'true') return;
        
        const rect = el.getBoundingClientRect();
        const triggerPoint = window.innerHeight * this.options.trigger;
        if (rect.top < triggerPoint && rect.bottom > 0) {
          setTimeout(() => {
            el.style.opacity = 1;
            el.style.transform = 'translateY(0)';
            el.dataset.animated = 'true';
          }, i * this.options.stagger);
        }
      });
    }
  }

  new FadeIn('.airpods-card1', { duration: 700, translateY: 60, stagger: 120 });
  new FadeIn('.airpods-card2', { duration: 700, translateY: 60, stagger: 120 });
  new FadeIn('.airpods-card3', { duration: 700, translateY: 60, stagger: 120 });
  new FadeIn('.iphone-card', { duration: 700, translateY: 60, stagger: 120 });
  new FadeIn('.footer', { duration: 700, translateY: 60, stagger: 120 });
});
