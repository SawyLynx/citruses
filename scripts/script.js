const theme = document.querySelector('.theme-button');

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', currentTheme);

document.addEventListener('DOMContentLoaded', () => {
  const themeButton = document.querySelector('.theme-button');

  if (themeButton) {
      themeButton.addEventListener('click', () => {
          const activeTheme = document.documentElement.getAttribute('data-theme');
          const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
          
          document.documentElement.setAttribute('data-theme', newTheme);
          localStorage.setItem('theme', newTheme);
      });
  }

  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.menu');
  const menuLinks = document.querySelectorAll('.menu__link');

  function toggleMenu() {
    menu.classList.toggle('active');
    
    if (menu.classList.contains('active')) {
      hamburger.textContent = '✕';
      hamburger.setAttribute('aria-label', 'Закрыть меню');
    } else {
      hamburger.textContent = '☰';
      hamburger.setAttribute('aria-label', 'Открыть меню');
    }
  }

  function closeMenu() {
    menu.classList.remove('active');
    hamburger.textContent = '☰';
    hamburger.setAttribute('aria-label', 'Открыть меню');
  }

  if (hamburger && menu) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleMenu();
    });

    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    document.addEventListener('click', function(e) {
      if (menu.classList.contains('active') && !menu.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
      }
    });
  }
});
