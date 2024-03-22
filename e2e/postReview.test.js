/* eslint-disable no-undef */
Feature('Post Review');

Before(({ I }) => {
    I.amOnPage('/');
});

// eslint-disable-next-line max-len
Scenario.skip('should be able to post a review and display success message if form is filled completely', async ({ I }) => {
    I.seeElement('.restaurant-item');
    I.click(locate('.restaurant-item li a').first());

    I.wait(1);
    I.seeElement('#reviewForm');
    I.fillField('input#reviewName', 'John Doe');
    I.fillField('textarea#reviewText', 'Great food and service!');

    I.click('button#reviewSubmit');

    I.waitForVisible('#success-modal');

    I.seeElement('#success-modal');

    I.seeElement('p#success-message');
});

Scenario('should display error message if form is not filled completely', async ({ I }) => {
    I.seeElement('.restaurant-item');
    I.click(locate('.restaurant-item li a').first());

    I.wait(1);
    I.seeElement('#reviewForm');

    I.fillField('input#reviewName', '');

    I.fillField('textarea#reviewText', 'Great food and service!');

    I.click('button#reviewSubmit');

    I.wait(1);
    I.waitForVisible('#error-modal');

    I.seeElement('#error-modal');

    I.seeElement('p#error-message');
    I.executeScript(() => {
        const closeButton = document.querySelector('#error-modal .modal-content .close');
        if (closeButton) {
            closeButton.click();
        }
    });

    I.clearField('input#reviewName');
    I.clearField('textarea#reviewText');

    I.fillField('input#reviewName', 'John Doe');
    I.fillField('textarea#reviewText', '');

    I.click('button#reviewSubmit');

    I.wait(1);
    I.waitForVisible('#error-modal');

    I.seeElement('#error-modal');

    I.seeElement('p#error-message');
    I.executeScript(() => {
        const closeButton = document.querySelector('#error-modal .modal-content .close');
        if (closeButton) {
            closeButton.click();
        }
    });

    I.clearField('input#reviewName');
    I.clearField('textarea#reviewText');

    I.click('button#reviewSubmit');

    I.wait(1);
    I.waitForVisible('#error-modal');

    I.seeElement('#error-modal');

    I.seeElement('p#error-message');
    I.executeScript(() => {
        const closeButton = document.querySelector('#error-modal .modal-content .close');
        if (closeButton) {
            closeButton.click();
        }
    });
});
