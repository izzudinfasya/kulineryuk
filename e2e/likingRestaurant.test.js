/* eslint-disable no-undef */
Feature('Liking Restaurants');

Before(({ I }) => {
    I.amOnPage('/#/favorite');
});

Scenario.skip('liking one restaurant', ({ I }) => {
    I.wait(1);
    I.seeElement('no-favorite');
    I.see('Yahh.. Kamu belum punya restoran favorit nih', '.no-favorite-tag');

    I.amOnPage('/');

    I.seeElement('.restaurant-item');
    I.click(locate('.restaurant-item li a').first());
    I.wait(1);
    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/favorite');
    I.wait(1);
    I.seeElement('.restaurant-item');
});
