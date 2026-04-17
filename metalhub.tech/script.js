const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');
if (burger) {
  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(mobileMenu.classList.contains('open')));
  });
  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => mobileMenu.classList.remove('open')));
}

const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, {threshold: 0.15});
reveals.forEach((el) => io.observe(el));

const parallaxLayers = document.querySelectorAll('.parallax-layer');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  parallaxLayers.forEach(layer => {
    const speed = Number(layer.dataset.speed || 0.08);
    layer.style.transform = `translateY(${y * speed}px) scale(1.06)`;
  });
}, { passive: true });

const tiltItems = document.querySelectorAll('.tilt');
const isTouch = window.matchMedia('(pointer: coarse)').matches;
if (!isTouch) {
  tiltItems.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rx = ((y / rect.height) - 0.5) * -8;
      const ry = ((x / rect.width) - 0.5) * 10;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
    });
    card.addEventListener('mouseleave', () => card.style.transform = '');
  });
}

const magneticButtons = document.querySelectorAll('.magnetic');
if (!isTouch) {
  magneticButtons.forEach((button) => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      button.style.transform = `translate(${x * 0.08}px, ${y * 0.12}px)`;
    });
    button.addEventListener('mouseleave', () => {
      button.style.transform = '';
    });
  });
}

const slides = document.querySelectorAll('.gallery-slide');
const track = document.querySelector('.gallery-track');
const dotsWrap = document.querySelector('.gallery-dots');
let current = 0;
function renderDots() {
  if (!dotsWrap) return;
  dotsWrap.innerHTML = '';
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    if (index === current) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(index));
    dotsWrap.appendChild(dot);
  });
}
function goTo(index) {
  current = (index + slides.length) % slides.length;
  if (track) track.style.transform = `translateX(-${current * 100}%)`;
  renderDots();
}
document.querySelector('.gallery-arrow.next')?.addEventListener('click', () => goTo(current + 1));
document.querySelector('.gallery-arrow.prev')?.addEventListener('click', () => goTo(current - 1));
renderDots();

const cookieBanner = document.getElementById('cookieBanner');
const acceptCookies = document.getElementById('acceptCookies');
if (cookieBanner && !localStorage.getItem('metalhub_cookie_ok')) {
  setTimeout(() => cookieBanner.classList.add('show'), 700);
}
acceptCookies?.addEventListener('click', () => {
  localStorage.setItem('metalhub_cookie_ok', '1');
  cookieBanner.classList.remove('show');
});
