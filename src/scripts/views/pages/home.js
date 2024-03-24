import RestoSource from '../../data/resto-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const modal = document.getElementById('loading-modal');

const Home = {
    async render() {
        return `
        <section class="hero" id="hero">
            <img class="hero_image lazyload" src="images/heros/hero-image.jpg" 
                alt="hero image" style="aspect-ratio: 16/9;">
            <div class="hero_shadow"></div>
            <div class="content">
            <h2>Find Your <span>Favorite</span> Restaurant<span>.</span></h2>
            <div class="search-box">
                <div class="row">
                <input
                    type="text"
                    id="input-box"
                    placeholder="Cari restoran disini..."
                    autocomplete="off"
                />
                </div>
                <div class="result-box"></div>
            </div>
            </div>
        </section>
  
        <section
            class="section restaurants"
            id="restaurants"
            aria-label="restaurants"
        >
            <div class="container" tabindex="0">
            <p class="section-subtitle label-2 text-center">Mari Eksplor</p>
            <h2 class="section-title headline-1 text-center">Daftar Restoran</h2>
                <div id="listRestaurants" class="listRestaurants">
            </div>
        </section>

        <div id="error-modal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <p id="error-message"></p>
            </div>
        </div>

        <a
            href="#"
            class="back-top-btn"
            aria-label="back to top"
            data-back-top-btn
        >
            <ion-icon name="chevron-up" aria-hidden="true"></ion-icon>
        </a>
      `;
    },

    async afterRender() {
        function openModal() {
            modal.style.display = 'block';
        }

        // Function to close the modal
        function closeModal() {
            modal.style.display = 'none';
        }

        // Modal Error
        const errorModal = document.getElementById('error-modal');
        const errorMessage = document.getElementById('error-message');
        const closeBtn = document.getElementsByClassName('close')[0];

        function showErrorModal(message) {
            errorMessage.textContent = message;
            errorModal.style.display = 'block';
        }

        closeBtn.addEventListener('click', () => {
            errorModal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === errorModal) {
                errorModal.style.display = 'none';
            }
        });

        openModal();
        try {
            const data = await RestoSource.listRestaurant();
            const { restaurants } = data;
            const restaurantContainer = document.querySelector('#listRestaurants');
            restaurants.forEach((restaurant) => {
                restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
            });
        } catch (error) {
            const customErrorMessage = 'Yahh.. restoran gagal dimuat, Silahkan coba lagi';
            showErrorModal(customErrorMessage);
        } finally {
            closeModal();
        }

        // Mendapatkan elemen gambar
        const img = document.querySelector('img');
        const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        // Mengganti src gambar berdasarkan ukuran layar
        if (width <= 768) {
            img.src = 'images/heros/hero-image-small.jpg';
        } else {
            img.src = 'images/heros/hero-image.jpg';
        }

        window.addEventListener('resize', () => {
            const widthWindow = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

            if (widthWindow <= 768) {
                img.src = 'images/heros/hero-image-small.jpg';
            } else {
                img.src = 'images/heros/hero-image.jpg';
            }
        });

        // Get the subtitle element
        const separator = 'images/separator.svg';
        fetch(separator)
            .then((response) => response.blob())
            .then((blob) => {
                const url = URL.createObjectURL(blob);

                // Create a new style element
                const style = document.createElement('style');

                // Set the custom CSS styles for the ::after pseudo-element
                style.innerHTML = `
                .section-subtitle::after {
                    content: url("${url}");
                    display: block;
                    width: 100px;
                    margin-inline: auto;
                    margin-block-start: 20px;
                }
                `;

                // Append the style element to the head element
                document.head.appendChild(style);
            })
            .catch((error) => {
                console.error('Error loading separator:', error);
            });

        // Get Result and Input Box
        const resultBox = document.querySelector('.result-box');
        const inputBox = document.getElementById('input-box');

        function selectInput(list) {
            inputBox.value = list.textContent.trim();
            resultBox.innerHTML = '';
        }

        function displayRestoList(result) {
            if (!result) {
                return;
            }

            const content = result.map((list) => {
                if (!list) {
                    return null;
                }

                const liElement = document.createElement('li');
                liElement.textContent = list.name;
                liElement.addEventListener('click', () => {
                    selectInput(liElement, result.indexOf(list));
                    window.location.hash = `#/detail/${list.id}`;
                });
                return liElement;
            });

            const listContainer = document.createElement('ul');
            content.forEach((liElement) => {
                if (liElement) {
                    listContainer.appendChild(liElement);
                }
            });

            if (resultBox) {
                resultBox.innerHTML = '';
                resultBox.appendChild(listContainer);
            }
        }

        async function loadResto(searchTerm) {
            openModal(); // Open the loading modal
            const URL = `https://restaurant-api.dicoding.dev/search?q=${searchTerm}`;
            const res = await fetch(`${URL}`);
            const dataSearch = await res.json();
            if (dataSearch.restaurants.length > 0) {
                closeModal(); // Close the loading modal
                displayRestoList(dataSearch.restaurants);
            } else {
                closeModal(); // Close the loading modal
                const customErrorMessage = 'Yahh.. restoran yang kamu cari gaada';
                showErrorModal(customErrorMessage);
            }
        }

        inputBox.addEventListener('keyup', () => {
            const result = [];
            const searchTerm = inputBox.value;
            if (searchTerm.length > 0) {
                loadResto(searchTerm);

                if (!result.length) {
                    resultBox.innerHTML = '';
                }
            } else {
                resultBox.innerHTML = '';
                closeModal(); // Close the loading modal
            }
        });

        // BackTop
        const backTopBtn = document.querySelector('[data-back-top-btn]');

        window.addEventListener('scroll', () => {
            if (window.scrollY >= 50) {
                backTopBtn.classList.add('active');
            } else {
                backTopBtn.classList.remove('active');
            }
        });

        backTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
        });
    },

};

export default Home;
