/* eslint-disable no-undef */
Feature('Searching Restaurants');

Before(({ I }) => {
    I.amOnPage('/');
});

Scenario.skip('searching one restaurant', ({ I }) => {
    I.wait(1);
    I.seeElement('.content .search-box');
    I.fillField('input#input-box', 'kafe');

    I.seeElement('.result-box ul li');
    I.click(locate('.result-box ul li').first());

    I.wait(1);
    I.seeElement('.resto');
});

Scenario.skip('should display an error message when searching for a restaurant with no results', ({ I }) => {
    I.wait(1);
    I.seeElement('.content .search-box');
    I.fillField('input#input-box', 'fafafa');

    I.wait(1);
    I.seeElement('#error-modal');
    I.seeElement('p#error-message');
    I.executeScript(() => {
        const closeButton = document.querySelector('#error-modal .modal-content .close');
        if (closeButton) {
            closeButton.click();
        }
    });
});
