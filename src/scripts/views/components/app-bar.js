class AppBar extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowDOM.innerHTML = `
            <style>
                a {
                    text-decoration: none;
                }

                a,
                button {
                min-width: 44px;
                min-height: 44px;
                padding: 12px;
                }

                .container {
                    max-width: 1120px;
                    margin-inline: 1.5rem;
                }

                /* Nav Header*/
                .header {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                z-index: 10000;
                transition: 0.5s;
                }

                /* Navbar */
                .nav {
                height: 3.5rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                }

                .nav_logo {
                color: #fff;
                font-weight: 700;
                font-size: 2em;
                text-decoration: none;
                }

                .nav_logo span {
                color: hsl(38, 61%, 73%);
                }

                .nav_toggle,
                .nav_close {
                border: 0;
                /* outline: 0; */
                background: transparent;
                display: flex;
                font-size: 1.25rem;
                color: white;
                cursor: pointer;
                }

                @media screen and (max-width: 1023px) {
                    .nav_menu {
                        position: fixed;
                        top: 0;
                        left: 0;
                        background-color: hsla(0, 0%, 0%, 0.3);
                        width: 100%;
                        padding-block: 4rem;
                        backdrop-filter: blur(24px);
                        -webkit-backdrop-filter: blur(24px);
                        transform: translateY(-100%);
                        transition: transform 0.4s ease;
                    }
                }

                .nav_list {
                    align-items: center;
                    display: flex;
                    flex-direction: column;
                    row-gap: 2.5rem;
                    list-style: none;
                    padding: 0;
                }

                .nav_link {
                    position: relative;
                    color: white;
                    font-weight: 400;
                    content: "";
                }

                .nav_link::after {
                    content: "";
                    width: 0;
                    height: 2px;
                    background-color: #fff;
                    position: absolute;
                    left: 50%; /* Set left position to 50% */
                    transform: translateX(-50%); /* Center the line */
                    bottom: 0.2rem;
                    transition: width 0.3s;
                }

                .nav_close {
                position: absolute;
                top: 1rem;
                right: 1.5rem;
                }

                /* Show menu  */
                .show-menu {
                    top: 0;
                }

                /* Blur  */
                .blur-header::after {
                content: "";
                position: absolute;
                width: 1000%;
                height: 100%;
                background-color: hsla(0, 0%, 0%, 0.3);
                backdrop-filter: blur(24px);
                -webkit-backdrop-filter: blur(24px);
                top: 0;
                left: 0;
                z-index: -1;
                }

                /* Responsive */
                @media screen and (max-width: 340px) {
                    .nav_logo {
                        font-size: 1.3rem;
                    }
                }

                @media screen and (max-width: 576px) {
                    .nav_logo {
                        font-size: 1.5rem;
                    }
                }

                @media screen and (min-width: 576px) {
                    .nav_logo {
                        font-size: 1.5rem;
                    }
                }

                @media screen and (min-width: 768px) {
                    .nav_logo {
                        font-size: 1.75rem;
                    }
                }

                @media screen and (min-width: 1023px) {
                    .nav_close,
                    .nav_toggle {
                        display: none;
                    }

                    .nav_list {
                        flex-direction: row;
                        column-gap: 4rem;
                    }

                    .nav_logo {
                        font-size: 1.8rem;
                    }
                }

                @media screen and (min-width: 1152px) {
                    .nav {
                        height: calc(3.5rem + 1.5rem);
                    }

                    .nav_logo {
                        font-size: 2rem;
                    }

                    .container {
                        margin-inline: auto;
                    }
                }

                .active-link::after {
                    width: 70%;
                  }
                  
            </style>

            <header class="header" id="header">
                <nav class="nav container">
                    <a href="#" class="nav_logo">Kuliner<span>YUK</span></a>
                    <button class="nav_toggle" id="nav-toggle" tabindex="0">≣</button>
                    <div class="nav_menu" id="nav-menu">
                        <ul class="nav_list">
                            <li class="nav_item">
                            <a href="#/home" class="nav_link active-link">Home</a>
                            </li>
                            <li class="nav_item">
                            <a href="#/favorite" class="nav_link">Favorite</a>
                            </li>
                            <li class="nav_item">
                            <a
                                href="https://portfolio-fasya.vercel.app/"
                                target="_blank"
                                class="nav_link"
                                rel="noopener"
                                >About Us</a
                            >
                            </li>
                        </ul>
                
                        <button class="nav_close" id="nav-close" tabindex="0">✕</button>
                    </div>
                </nav>
            </header>
        `;
    }
}

customElements.define('app-bar', AppBar);
