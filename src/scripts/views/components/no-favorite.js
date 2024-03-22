class NoFavorite extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `        
        <style>
        no-favorite {
            display: grid;
            justify-items: center;
            align-items: center;
            text-align: center;
            width: 100%;
        }
        
        .no-favorite-tag p {
            color: white;
            font-size: 16px;
        }
        
        .no-favorite-image{
            width: 100%;
            height: auto;
        }

        @media screen and (min-width: 540px) {
            .no-favorite-image{
                width: 500px;
                height: 500px;
            }

            .no-favorite-tag p {
                color: white;
                font-size: 20px;
            }
        }

        @media screen and (min-width: 1023px) {
            .no-favorite-image{
                width: 550px;
                height: 550px;
            }

            .no-favorite-tag p {
                color: white;
                font-size: 24px;
            }
        }
        </style>
            <img class="no-favorite-image" src="images/empty.png" alt="Empty" />
            <div class="no-favorite-tag">
                <p>Yahh.. Kamu belum punya restoran favorit nih</p>
            </div>
          `;
    }
}

customElements.define('no-favorite', NoFavorite);
