/// <reference types="cypress" />
import { Homepage } from "../page-objects/homePage";
const homepage = new Homepage();
import { Loginpage } from "../page-objects/loginPage";
const loginpage = new Loginpage();
import { Registrationpage } from "../page-objects/registrationPage";
const registrationpage = new Registrationpage();
import { Accountpage } from "../page-objects/accountPage";
const accountpage = new Accountpage();
const pageNavWait = 1500;

describe("test 'Your Account' page functionality", () => {
  before(() => {

    cy.log("**clear local storage and cookies...**").clearLocalStorage().clearAllCookies();
    cy.createUserLoginDetails().then((user) => {
      cy.createUserAccount(user);
    });
  });

  it("Enters new address info using cy.session", () => {
    cy.log("Click on user name in the header to navigate to Your Account page");
    registrationpage.registrationPageElements.getSignedInName().click();
    cy.wait(pageNavWait);
    cy.log("Confirm we are on the top section of the 'Your Account' page");
    cy.confirmBreadcrumb("Home / Your account", "visible");
    cy.log("**Click the 'Add First Adddress' link...**");
    accountpage.accountPageElements.getAddFirstAdddress().click();
    cy.wait(pageNavWait);
    cy.log("Confirm we are on the right subsection of the 'Your Account' page");
    cy.getUserLoginDetails().then((user) => {
      cy.log("**Enter adddress...**");
      loginpage.enterAddressInForm(`${user.address}{enter}`);
      cy.log("**Enter city...**");
      loginpage.enterCityInForm(`${user.city}{enter}`);
      cy.log("**Select state...**");
      loginpage.selectStateInForm(`${user.state}`);
      cy.log("**Enter zip...**");
      loginpage.enterZipInForm(`${user.zip}{enter}`);
      cy.wait(pageNavWait);
      cy.log("**Confirm 'address saved' message...**");
      accountpage.accountPageElements.getAddressAlertSuccess();
      cy.log("Confirm address details are shown");
      accountpage.accountPageElements.getAddressSummary(user);
    });
  }),
    it("Updates password", () => {
      cy.log("Click on user name in the header to navigate to Your Account page");
      registrationpage.registrationPageElements.getSignedInName().click();
      cy.wait(pageNavWait);
      cy.log("**Confirm we are on the top section of the 'Your Account' page**");
      cy.confirmBreadcrumb("Home / Your account", "visible");
      cy.log("**Click the 'Information' link...**");
      accountpage.accountPageElements.getInformation().click();
      cy.wait(pageNavWait);
      cy.log("**Confirm we are on the right subsection of the 'Your Account' page**");
      cy.confirmBreadcrumb("Home / Your account / Your personal information", "visible");
      cy.log("**Confirm old password and enter new password...**");
      cy.getUserLoginDetails().then((user) => {
        accountpage.enterPassWord(user);
        accountpage.enterNewPassWord(user);
      });
      registrationpage.registrationPageElements.getTAndCCheckbox().check();
      registrationpage.registrationPageElements.getDataPrivacyCheckbox().check();
      cy.clickSaveButton();
      cy.log("**Confirm password updated alert is visible**");
      cy.wait(pageNavWait);
      accountpage.accountPageElements.getUpdateAlertSuccess();
    });
});
