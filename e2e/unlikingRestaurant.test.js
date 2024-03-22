/* eslint-disable no-undef */
Feature('Unliking Restaurants');

Before(({ I }) => {
    I.amOnPage('/#/favorite');
});

Scenario.skip('showing empty favorite restaurant', ({ I }) => {
    I.wait(1);
    I.dontSeeElement('.restaurant-item');
    I.seeElement('no-favorite');
    I.see('Yahh.. Kamu belum punya restoran favorit nih', '.no-favorite-tag');
});

Scenario.skip('unliking a restaurant', ({ I }) => {
    I.amOnPage('/');
    I.wait(1);
    I.seeElement('.restaurant-item');
    I.click(locate('.restaurant-item li a').first());

    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/favorite');
    I.wait(1);
    I.seeElement('.restaurant-item');
    I.click(locate('.restaurant-item li a').first());

    I.seeElement('#likeButton');
    I.click('#likeButton');
    I.amOnPage('/#/favorite');

    I.wait(1);
    I.seeElement('no-favorite');
    I.see('Yahh.. Kamu belum punya restoran favorit nih', '.no-favorite-tag');
});
