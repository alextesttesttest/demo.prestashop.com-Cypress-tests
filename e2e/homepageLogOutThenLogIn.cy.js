/// <reference types="cypress" />
import { Homepage } from "../page-objects/homePage";
const homepage = new Homepage();
import { Loginpage } from "../page-objects/loginPage";
const loginpage = new Loginpage();
import { Registrationpage } from "../page-objects/registrationPage";
const registrationpage = new Registrationpage();
import { Shoppingcartpage } from "../page-objects/shoppingCartPage";
const shoppingcartpage = new Shoppingcartpage();
const pageNavWait = 1000;

describe("Create an account from the home page then sign out", () => {
  before(() => {
    cy.log("**clear local storage and cookies...**").clearLocalStorage().clearAllCookies();
    cy.createUserLoginDetails().then((user) => {
      cy.createUserAccount(user);
    });
  });

  it("signs out", () => {
    cy.signOut();
  });

  it("signs in", () => {
    cy.getUserLoginDetails().then((user) => {
      cy.signIn(user);
    });
  });

  /*   it("signs in with the new account, via cy.session", () => {
    cy.signInWithSession();
    registrationpage.registrationPageElements.getSignedInName().click();
  }); */
});
