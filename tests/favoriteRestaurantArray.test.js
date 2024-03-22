/* eslint-disable no-prototype-builtins */
/* eslint-disable import/named */
/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
import itActsAsFavoriteRestaurantModel from './contracts/favoriteRestaurantContract';

let favoriteRestaurants = [];

const FavoriteRestaurantArray = {

    getRestaurant(id) {
        if (!id) {
            return;
        }

        return favoriteRestaurants.find((restaurant) => restaurant.id === id);
    },

    getAllRestaurants() {
        return favoriteRestaurants;
    },

    putRestaurant(restaurant) {
        if (!restaurant.hasOwnProperty('id')) {
            return;
        }

        if (this.getRestaurant(restaurant.id)) {
            return;
        }

        favoriteRestaurants.push(restaurant);
    },

    deleteRestaurant(id) {
        favoriteRestaurants = favoriteRestaurants.filter((restaurant) => restaurant.id !== id);
    },
};

describe('Favorite Restaurant Array Contract Test Implementation', () => {
    afterEach(() => favoriteRestaurants = []);
    itActsAsFavoriteRestaurantModel(FavoriteRestaurantArray);
});
