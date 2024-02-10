/// <reference types="Cypress"/>


describe('E2E Test - Order 3 items and checkout', () => {
    
    it.only('Must choose 3 items', () => {
        //visit the URL
        cy.visit("https://www.saucedemo.com/")

        // login the user
        cy.get('[data-test="username"]').type("standard_user")
        cy.get('[data-test="password"]').type("secret_sauce")
        cy.get('[data-test="login-button"]').click()
        cy.get('.title').should('contain','Products')
       
        //buying 'Sauce Labs Backpak
        const valueItem1 = 29.99
        cy.get('#item_4_title_link > .inventory_item_name').click()
        cy.get('.inventory_details_desc_container').should('contain', 'Sauce Labs Backpack')
        cy.get('.inventory_details_price').should('contain', valueItem1)
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

        //go back to main menu
        cy.get('[data-test="back-to-products"]').click()

        // items sorted
        cy.get('[data-test="product_sort_container"]').select('Price (low to high)')

        //buying 'Sauce Labs Onesie'
        const valueItem4 = 7.99
        cy.get(':nth-child(1) > .inventory_item_description').should('contain', 'Sauce Labs Onesie', valueItem4)
        cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click()

        //checking cart
        cy.get('.shopping_cart_badge').contains('2')
        cy.get('.shopping_cart_link').click()
        cy.get('.cart_list').should('contain','Sauce Labs Backpack')

        //go back to main menu
        cy.get('[data-test="continue-shopping"]').click()

        // items sorted
        cy.get('[data-test="product_sort_container"]').select('Price (low to high)')

        //buying 'Sauce Labs Bike Light'
        const valueItem3 = 9.99
        cy.get(':nth-child(2) > .inventory_item_description').should('contain', 'Sauce Labs Bike Light', valueItem3)
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()

        //checking cart
        cy.get('.shopping_cart_badge').contains('3')
        cy.get('.shopping_cart_link').click()
        cy.get('.cart_list').should('contain','Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Onesie')

        //removing 1 item
        cy.get('[data-test="remove-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_badge').contains('2')

        //checkout the order
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type("Test")
        cy.get('[data-test="lastName"]').type("Tests")
        cy.get('[data-test="postalCode"]').type("54545454")

        //canceling
        cy.get('[data-test="cancel"]').click()

        //checkout the order
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type("Test")
        cy.get('[data-test="lastName"]').type("Tests")
        cy.get('[data-test="postalCode"]').type("54545454")
        cy.get('[data-test="continue"]').click()
        cy.get('.summary_total_label').should('contain', '19.42')
        cy.get('[data-test="finish"]').click()

        //checking the successfully ordered
        cy.get('.complete-header').should('contain', 'Thank you for your order!')
    
    });
});