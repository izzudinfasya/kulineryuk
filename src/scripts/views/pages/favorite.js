import FavoriteRestaurantIdb from '../../data/favorite-restaurants-idb';
import { createRestaurantItemTemplate } from '../templates/template-creator';
import '../components/no-favorite';

const Favorite = {
    async render() {
        return `
        <section
            class="section favorite"
            id="favorite"
            aria-label="favorite"
        >
                <div class="container" tabindex="0">
                    <p class="section-subtitle label-2 text-center">Cek Yuk</p>
                    <h2 class="section-title headline-1 text-center">Restoran Favoritmu</h2>
                    <div id="fav-container" class="fav-container">
                        <div id="listRestaurants" class="listRestaurants">
                    </div>
                </div>
        </section>

        <a
            href="#"
            class="back-top-btn"
            aria-label="back to top"
            data-back-top-btn
        >
            <ion-icon name="chevron-up" aria-hidden="true"></ion-icon>
        </a>

        <div id="error-modal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <p id="error-message"></p>
            </div>
        </div>

        
        <div class="modal" id="loading-modal">
            <div class="modal-content">
            <div class="loader mb-2"></div>
            <div>Loading</div>
            </div>
        </div>
      `;
    },

    async afterRender() {
        // Get modal loading
        const modalLoading = document.querySelector('#loading-modal');

        function openModal() {
            modalLoading.style.display = 'block';
        }

        // Function to close the modal
        function closeModal() {
            modalLoading.style.display = 'none';
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

        const restaurantsPromise = FavoriteRestaurantIdb.getAllRestaurants();
        const restaurantContainer = document.querySelector('#listRestaurants');
        openModal();
        restaurantsPromise
            .then((restaurants) => {
                // Hide loading indicator
                setTimeout(() => {
                    closeModal();
                }, 1000);

                if (restaurants.length > 0) {
                    restaurants.forEach((restaurant) => {
                        restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
                    });
                } else {
                    document.querySelector('#fav-container').innerHTML = '<no-favorite></no-favorite>';
                }
            })
            .catch(() => {
                // Hide loading indicator
                setTimeout(() => {
                    closeModal();
                }, 1000);

                // Tampilkan keterangan/umpan balik kegagalan
                const customErrorMessage = 'Yahh.. data restoran gagal dimuat. Silahkan coba lagi';
                showErrorModal(customErrorMessage);
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

export default Favorite;
