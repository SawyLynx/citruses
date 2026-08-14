const theme = document.querySelector('.theme-button');

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', currentTheme);

document.addEventListener('DOMContentLoaded', () => {
  // --- ЛОГИКА ПЕРЕКЛЮЧЕНИЯ ТЕМЫ ---
  const themeButton = document.querySelector('.theme-button');

  if (themeButton) {
      themeButton.addEventListener('click', () => {
          const activeTheme = document.documentElement.getAttribute('data-theme');
          const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
          
          document.documentElement.setAttribute('data-theme', newTheme);
          localStorage.setItem('theme', newTheme);
      });
  }

  // --- ЛОГИКА БУРГЕР-МЕНЮ ---
  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.menu');
  const menuLinks = document.querySelectorAll('.menu__link'); // Находим все ссылки внутри меню

  // Функция для переключения состояния меню и изменения иконки
  function toggleMenu() {
    menu.classList.toggle('active');
    
    if (menu.classList.contains('active')) {
      hamburger.textContent = '✕'; // Меняем на крестик
      hamburger.setAttribute('aria-label', 'Закрыть меню');
    } else {
      hamburger.textContent = '☰'; // Возвращаем три полоски
      hamburger.setAttribute('aria-label', 'Открыть меню');
    }
  }

  // Функция для принудительного закрытия меню
  function closeMenu() {
    menu.classList.remove('active');
    hamburger.textContent = '☰';
    hamburger.setAttribute('aria-label', 'Открыть меню');
  }

  if (hamburger && menu) {
    // Открытие/закрытие по клику на бургер
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleMenu();
    });

    // Закрытие меню при клике на любую ссылку внутри него
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Закрытие меню при клике в любое место экрана вне меню
    document.addEventListener('click', function(e) {
      // Проверяем, что меню открыто и клик произошел не по меню и не по кнопке гамбургера
      if (menu.classList.contains('active') && !menu.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
      }
    });
  }
});
