import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
    constructor({ content }) {
        this._content = content;
        this._navLinks = document.querySelector('app-bar').shadowRoot.querySelectorAll('.nav_link');
    }

    async renderPage() {
        const url = UrlParser.parseActiveUrlWithCombiner();
        const page = routes[url];
        this._content.innerHTML = await page.render();
        await page.afterRender();
        this.highlightActiveLink(url);
        const skipLinkElem = document.querySelector('.skip-link');
        skipLinkElem.addEventListener('click', (event) => {
            event.preventDefault();
            document.querySelector('#mainContent').focus();
        });
    }

    highlightActiveLink(url) {
        const homeUrl = '/';

        this._navLinks.forEach((link) => {
            // eslint-disable-next-line max-len
            if ((url === homeUrl && link.getAttribute('href') === '#/home') || (url !== homeUrl && link.getAttribute('href') === `#${url}`)) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        });
    }
}

export default App;
