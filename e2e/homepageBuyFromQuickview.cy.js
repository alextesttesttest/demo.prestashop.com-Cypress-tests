/// <reference types="cypress" />
import { Homepage } from "../page-objects/homePage";
const homepage = new Homepage();
import { Loginpage } from "../page-objects/loginPage";
const loginpage = new Loginpage();
import { Shoppingcartpage } from "../page-objects/shoppingCartPage";
const shoppingcartpage = new Shoppingcartpage();

const pageNavWait = 1500;

describe("Buy an item from the home page Quick View modal, as a logged-in user", () => {
  before(() => {
    cy.log("**clear local storage and cookies...**").clearLocalStorage().clearAllCookies();
    cy.createUserLoginDetails().then((user) => {
      cy.createUserAccount(user);
    });
  });

  it("adds an item to the basket from the Popular Products section via Quick View modal", () => {
    cy.wait(pageNavWait);
    cy.log("**Find the quickview link for the first product to test and click it...**");
    homepage.homePageElements.getProductBySectionAndName("The best is yet to come'...").within(() => {
      homepage.homePageElements.getQuickViewLink().click();
    });

    cy.log("**Select the last option in the product dropdown selector**");
    homepage.selectLastOptionInDropdown();
    cy.log("**Add the selected product to the basket**");
    homepage.homePageElements.getAddToCartInModal().click();
    cy.log("**Confirm messaging for successful add to basket**");
    homepage.homePageElements.confirmProductInBasketMessage("Product successfully added to your shopping cart");
    cy.log("**Confirm basket count messaging**");
    homepage.homePageElements.confirmProductCountInModal("There is 1 item in your cart.");
  });

  it("navigates to Checkout", () => {
    cy.log("**Click Proceed to Checkout in modal**");
    homepage.homePageElements.getProceedToCheckoutInModal().click();

    cy.log("**Confirm we are on the shopping cart page**");
    shoppingcartpage.shoppingCartPageElements.getShoppingCartIframeTitle();

    cy.log("**Click Proceed to Checkout in main part of Shopping Cart page");
    shoppingcartpage.shoppingCartPageElements.getProceedToCheckout().click();
  });

  it("confirms basket details", () => {
    cy.log("**basic check on basket details accordian**");
    cy.wait(pageNavWait);
    shoppingcartpage.shoppingCartPageElements
      .confirmShowDetailsToggleIsCollapsed()
      .then(() => {
        cy.log("**Click accordian and confirm details**");
        shoppingcartpage.toggleBasketDetailsAccordian();
      })
      .then(() => {
        shoppingcartpage.shoppingCartPageElements.confirmShowDetailsToggleIsNotCollapsed();
        shoppingcartpage.shoppingCartPageElements.confirmCartDetailsItemTitle("The best is yet to come' Framed poster");
        shoppingcartpage.shoppingCartPageElements.confirmCartDetailsItemPrice("€34.80");
      });
  });

  it("fills in delivery address form fields", () => {
    cy.getUserLoginDetails().then((user) => {
      cy.log("**Fill in the form: Stage 2 enter address...**");
      loginpage.enterAddressInForm(`${user.address}{enter}`);

      cy.log("**Fill in the form: Stage 2 enter city...**");
      loginpage.enterCityInForm(`${user.city}{enter}`);

      cy.log("**Fill in the form: Stage 2 seleect state ...**");
      loginpage.selectStateInForm(`${user.state}`);

      cy.log("**Fill in the form: Stage 2 enter zip...**");
      loginpage.enterZipInForm(`${user.zip}{enter}`);
    });
  });

  it("confirms final steps", () => {
    cy.log("**Fill in the form: click Stage 3 Continue...**");
    cy.wait(pageNavWait);
    loginpage.clickContinueStage3();

    cy.log("**Fill in the form: click Stage 4 T&Cs box...**");
    cy.wait(pageNavWait);
    loginpage.tickTandCBoxStage4();
  });
});
