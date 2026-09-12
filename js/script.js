import { renderNavbar } from './components/Navbar.js';
import { renderFooter } from './components/Footer.js';

const loadLayout = () => {
    const navbarContainer = document.getElementById('navbar-placeholder');
    const footerContainer = document.getElementById('footer-placeholder');

    // Inject global components
    if (navbarContainer) {
        navbarContainer.innerHTML = renderNavbar();
    }
    
    if (footerContainer) {
        footerContainer.innerHTML = renderFooter();
    }

    // Mobile menu toggle
    const menuButton = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.main-nav');
    const openIcon = document.querySelector('.open-icon');
    const closeIcon = document.querySelector('.close-icon');

    if (menuButton && mobileMenu && openIcon && closeIcon) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            const isActive = mobileMenu.classList.contains('active');
            openIcon.style.display = isActive ? 'none' : 'block';
            closeIcon.style.display = isActive ? 'block' : 'none';
        });

        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                openIcon.style.display = 'block';
                closeIcon.style.display = 'none';
            });
        });
    }

    // Inicializar nuevas funcionalidades
    initThemeToggle();
    initScrollAnimations();
    initTypingEffect();
};

// Funcion para modo claro/oscuro
function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon-img');
    if (!themeBtn || !themeIcon) return;

    const currentURL = window.location.href.includes('/pages/');
    const root = currentURL ? '../' : '';

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        document.documentElement.classList.add('light-mode');
        themeIcon.src = `${root}img/icon/light/moon.svg`;
        updateAllIcons('light', root);
    } else {
        themeIcon.src = `${root}img/icon/dark/sun.svg`;
    }

    themeBtn.addEventListener('click', () => {
        document.documentElement.classList.toggle('light-mode');
        if (document.documentElement.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            themeIcon.src = `${root}img/icon/light/moon.svg`;
            updateAllIcons('light', root);
        } else {
            localStorage.setItem('theme', 'dark');
            themeIcon.src = `${root}img/icon/dark/sun.svg`;
            updateAllIcons('dark', root);
        }
    });
}

function updateAllIcons(theme, root) {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.src.includes('/icon/dark/') && theme === 'light') {
            img.src = img.src.replace('/icon/dark/', '/icon/light/');
        } else if (img.src.includes('/icon/light/') && theme === 'dark') {
            img.src = img.src.replace('/icon/light/', '/icon/dark/');
        }
    });
}

// Funcion para animaciones al hacer scroll
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
}

// Funcion para efecto de maquina de escribir
function initTypingEffect() {
    const subtitle = document.querySelector('.subtitle.typewriter-target');
    if (!subtitle) return;
    
    const text = subtitle.getAttribute('data-text') || subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.visibility = 'visible'; // Por si estaba oculto
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    setTimeout(typeWriter, 500);
}

// Initialize layout
document.addEventListener('DOMContentLoaded', loadLayout);
