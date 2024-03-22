import 'regenerator-runtime';
import '../styles/main.css';
import '../styles/style.scss';
import '../styles/responsive.css';
import './views/components/footer';
import './views/components/app-bar';
import App from './views/app';
import swRegister from './utils/sw-register';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const app = new App({
    content: document.querySelector('#mainContent'),
});

const navToggle = document.querySelector('app-bar').shadowRoot.getElementById('nav-toggle');
const navClose = document.querySelector('app-bar').shadowRoot.getElementById('nav-close');
const navMenu = document.querySelector('app-bar').shadowRoot.getElementById('nav-menu');
const header = document.querySelector('app-bar').shadowRoot.getElementById('header');

const blurHeader = () => {
    if (window.scrollY >= 50) {
        header.classList.add('blur-header');
    } else {
        header.classList.remove('blur-header');
    }
};

window.addEventListener('scroll', blurHeader);

// Show Menu Hamburger
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Preload
const preloader = document.querySelector('[data-preaload]');

window.addEventListener('load', () => {
    preloader.classList.add('loaded');
    document.body.classList.add('loaded');
});

window.addEventListener('hashchange', () => {
    app.renderPage();
});

window.addEventListener('load', () => {
    app.renderPage();
    swRegister();
});
