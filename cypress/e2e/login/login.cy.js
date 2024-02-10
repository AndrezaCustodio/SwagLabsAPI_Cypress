/// <reference types="Cypress"/>


describe('Login functional test', () => {
    it('Must be logged successfully', () => {
        cy.visit("https://www.saucedemo.com/")
        cy.get('[data-test="username"]').type("problem_user")
        cy.get('[data-test="password"]').type("secret_sauce")
        cy.get('[data-test="login-button"]').click()
        cy.get('.title').should('contain','Products')
    });

    it('Validate incorrect login', () => {
        cy.visit("https://www.saucedemo.com/")
        cy.get('[data-test="username"]').type("problem_user123")
        cy.get('[data-test="password"]').type("secret_sauce")
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('contain','Username and password do not match')
    });

    it('Validate incorrect password', () => {
        cy.visit("https://www.saucedemo.com/")
        cy.get('[data-test="username"]').type("problem_user")
        cy.get('[data-test="password"]').type("secret_sauce1")
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('contain','Username and password do not match')
    });
});