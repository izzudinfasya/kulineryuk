import UrlParser from '../../routes/url-parser';
import RestoSource from '../../data/resto-source';
import { createRestaurantDetailTemplate, createLikeRestaurantButtonTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-presenter';
import FavoriteRestaurantIdb from '../../data/favorite-restaurants-idb';

const Detail = {
    async render() {
        return `
        <section
            class="section detail"
            id="detail"
            aria-label="detail"
        >
                <div class="container" tabindex="0">
                    <div id="resto" class="resto"></div>
                    <div id="likeButtonContainer"></div> 
                    <div id="reviewContainer" class="reviewContainer">
                    <h2 class="section-title headline-2 text-center">Add Your Review</h2>
                    <form id="reviewForm" method="POST">
                      <div class="review-form-group">
                        <label for="reviewName">Name:</label>
                        <input type="text" id="reviewName" name="name" required>
                      </div>
                      <div class="review-form-group">
                        <label for="reviewReview">Review:</label>
                        <textarea id="reviewText" name="review" required></textarea>
                      </div>
                      <div class="review-form-group">
                        <button type="submit" id="reviewSubmit">Submit</button>
                      </div>
                    </form>
                  </div>
                </div>
        </section>

        <div id="error-modal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <p id="error-message"></p>
            </div>
        </div>

        <div id="success-modal" class="modal">
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <p id="success-message"></p>
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

        // Modal Error
        const successModal = document.getElementById('success-modal');
        const successMessage = document.getElementById('success-message');
        const closeSuccessBtn = document.getElementsByClassName('close-modal')[0];

        function showSuccessModal(message) {
            successMessage.textContent = message;
            successModal.style.display = 'block';
        }

        closeSuccessBtn.addEventListener('click', () => {
            successModal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === successModal) {
                successModal.style.display = 'none';
            }
        });

        const url = UrlParser.parseActiveUrlWithoutCombiner();
        openModal();
        const dataPromise = await RestoSource.detailRestaurant(url.id)
            .then((data) => {
                // Hide loading modal
                setTimeout(() => {
                    closeModal();
                }, 1000);

                return data;
            })
            .catch(() => {
                // Hide loading modal
                setTimeout(() => {
                    closeModal();
                }, 1000);

                // Show error modal
                const customErrorMessage = 'Yahh.. data restoran gagal dimuat. Silahkan coba lagi';
                showErrorModal(customErrorMessage);
            });

        const { restaurant } = dataPromise;
        const restaurantContainer = document.querySelector('#resto');
        restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);
        const likeButtonContainer = document.querySelector('#likeButtonContainer');
        likeButtonContainer.innerHTML = createLikeRestaurantButtonTemplate();

        LikeButtonInitiator.init({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            favoriteRestaurants: FavoriteRestaurantIdb,
            restaurant: {
                id: restaurant.id,
                name: restaurant.name,
                description: restaurant.description,
                pictureId: restaurant.pictureId,
                rating: restaurant.rating,
                city: restaurant.city,
            },
        });

        // Get the separator element
        const separator = 'images/separator.svg';

        fetch(separator)
            .then((response) => response.blob())
            .then((blob) => {
                const urlSeparator = URL.createObjectURL(blob);

                // Create a new style element
                const style = document.createElement('style');

                // Set the custom CSS styles for the ::after pseudo-element
                style.innerHTML = `
                        .section-subtitle::after {
                            content: url("${urlSeparator}");
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

        const textReview = document.getElementById('reviewText');
        const nameReview = document.getElementById('reviewName');
        const btnReview = document.getElementById('reviewSubmit');

        btnReview.addEventListener('click', async (e) => {
            e.preventDefault();
            if (textReview.value !== '' && nameReview.value !== '') {
                try {
                    const response = await RestoSource.postReview({
                        id: restaurant.id,
                        name: nameReview.value,
                        review: textReview.value,
                    });

                    if (response.message === 'success') {
                        const customMessage = 'Yeay.. Anda berhasil menambahkan review';
                        showSuccessModal(customMessage);

                        // Clear form fields
                        nameReview.value = '';
                        textReview.value = '';

                        // Wait for 1 second before reloading the page
                        setTimeout(() => {
                            location.reload();
                        }, 1000);
                    } else {
                        const customMessage = 'Oops.. Something went wrong. Please try again later.';
                        showErrorModal(customMessage);
                    }
                } catch (error) {
                    const customMessage = 'Oops.. Something went wrong. Please try again later.';
                    showErrorModal(customMessage);
                }
            } else {
                const customMessage = 'Oopss.. Ada form yang belum diisi, jangan lupa diisi yaa..';
                showErrorModal(customMessage);
            }
        });
    },
};

export default Detail;
