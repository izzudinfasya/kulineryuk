import FavoriteRestaurantIdb from '../data/favorite-restaurants-idb';
import { createLikeRestaurantButtonTemplate, createUnlikeRestaurantButtonTemplate }
    from '../views/templates/template-creator';

const LikeButtonPresenter = {
    async init({ likeButtonContainer, restaurant }) {
        this._likeButtonContainer = likeButtonContainer;
        this._restaurant = restaurant;
        this._favoriteRestaurants = FavoriteRestaurantIdb;

        await this._renderButton();
    },

    async _renderButton() {
        const { id } = this._restaurant;

        if (await this._isRestaurantExist(id)) {
            this._renderLiked();
        } else {
            this._renderLike();
        }
    },

    async _isRestaurantExist(id) {
        const restaurant = await this._favoriteRestaurants.getRestaurant(id);
        return !!restaurant;
    },

    _renderLike() {
        this._likeButtonContainer.innerHTML = createLikeRestaurantButtonTemplate();

        const likeButton = this._likeButtonContainer.querySelector('#likeButton');
        likeButton.addEventListener('click', async () => {
            await FavoriteRestaurantIdb.putRestaurant(this._restaurant);
            this._renderButton();
        });
    },

    _renderLiked() {
        this._likeButtonContainer.innerHTML = createUnlikeRestaurantButtonTemplate();

        const likeButton = this._likeButtonContainer.querySelector('#likeButton');
        likeButton.addEventListener('click', async () => {
            await FavoriteRestaurantIdb.deleteRestaurant(this._restaurant.id);
            this._renderButton();
        });
    },
};

export default LikeButtonPresenter;
