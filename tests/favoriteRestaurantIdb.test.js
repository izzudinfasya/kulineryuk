/* eslint-disable import/named */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
import itActsAsFavoriteRestaurantModel from './contracts/favoriteRestaurantContract';
import FavoriteRestaurantDB from '../src/scripts/data/favorite-restaurants-idb';

describe('Favorite Restaurant Idb Contract Test Implementation', () => {
    afterEach(async () => {
        (await FavoriteRestaurantDB.getAllRestaurants()).forEach(async (Restaurant) => {
            await FavoriteRestaurantDB.deleteRestaurant(Restaurant.id);
        });
    });
    itActsAsFavoriteRestaurantModel(FavoriteRestaurantDB);
});
