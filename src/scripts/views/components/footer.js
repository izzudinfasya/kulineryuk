class Footer extends HTMLElement {
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
            .footer {
              background-color: #1d1d1d;
              padding: 2rem 0;
            }
            
            .footer .container {
              display: flex;
              justify-content: center; /* center the <p> tag */
              align-items: center;
              flex-wrap: wrap;
            }
            
            .footer p {
              margin: 0;
              font-size: 0.8rem;
              text-align: center; /* center the text inside the <p> tag */
              color: #fff;
            }
            </style>

            <footer class="footer">
                <div class="container">
                <p>&copy; Copyright 2024 - KulinerYUK. All rights reserved.</p>
                </div>
            </footer>
          `;
    }
}

customElements.define('footer-bar', Footer);
