// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import "cypress-iframe";
import { Homepage } from "../page-objects/homePage";
const homepage = new Homepage();
import { Loginpage } from "../page-objects/loginPage";
const loginpage = new Loginpage();
import { Registrationpage } from "../page-objects/registrationPage";
const registrationpage = new Registrationpage();
import { Shoppingcartpage } from "../page-objects/shoppingCartPage";
const shoppingcartpage = new Shoppingcartpage();

Cypress.Commands.add("clickSaveButton", () => {
  return cy.findinIframe("button.btn").contains("Save").should("be.visible").click();
});

Cypress.Commands.add("clickContinueButton", () => {
  cy.findinIframe("button.continue").contains("Continue").logElementHTML();
  return cy.findinIframe("button.continue").contains("Continue").should("be.visible").click();
});

Cypress.Commands.add("confirmBreadcrumb", (expectedText, visibility = false) => {
  expectedText = expectedText.replace(/\s*\/\s*/g, "/");
  const expecteds = expectedText.split("/").map((word) => word.trim()); // an array of all the breadcrumb elements, tbc!!
  const expectedTextReadable = expectedText.trim().replace("/", " / "); // text showing the tidied expected breadcrumb for logging
  const expectedRegexp = new RegExp("\\s*" + expecteds.join("\\s+") + "\\s*", "i"); // regexp for what we are expecting
  var concatenatedText = ""; // will hold the text rendered by the page without the > separator
  var liText = ""; // the contents of each list element within the breadcrumb
  cy.log(`**Checking breadcrumb ${expectedTextReadable}...**`);
  return cy
    .findinIframe("nav.breadcrumb li")
    .each(($li) => {
      liText = $li.text();
      concatenatedText += liText;
      cy.log(`Checking visiblity of breadcrumb section "${liText.trim()}"`);
      if (visibility === "visible") {
        cy.wrap($li).should("be.visible");
      }
    })
    .then(() => {
      cy.log(`Checking breadcrumb text is expected...`);
      return cy.wrap(concatenatedText).should("match", expectedRegexp);
    });
});

Cypress.Commands.add("confirmFirstHeadingInIFrame", (headingText) => {
  return cy.findinIframe("h1").first().should("include.text", headingText);
});

Cypress.Commands.add("createUserAccount", (user) => {
  cy.log("**Browse to home page...**");
  homepage.homePageElements.visitHomePage();

  cy.log("**Clicking the Sign In button on the Home Page menu header...**");
  homepage.homePageElements.getSignInButton().click();

  cy.log("**Confirm we are on the 'Log into your account' page...**");
  loginpage.logInPageElements.getLoginPageIframeTitle();
  cy.confirmBreadcrumb("Home / Log in to your account", "visible");

  cy.log("**Clicking the Create Account button on the Sign In Page...**");
  loginpage.logInPageElements.getCreateAccountLink().click();

  cy.wait(1000);

  cy.log("**Confirm we are on the 'Create an account' page...**");
  cy.confirmBreadcrumb("Home / Create an account", "visible");

  cy.log("**Select F gender (page default to M)...**");
  registrationpage.registrationPageElements.getSocialTitleButton().check();

  cy.log("**Fill in the form: First Name...**");
  registrationpage.registrationPageElements.getFirstNameField().type(`${user.firstName}{enter}`);

  cy.log("**Fill in the form: Last Name...**");
  registrationpage.registrationPageElements.getLastNameField().type(`${user.lastName}{enter}`);

  cy.log("**Fill in the form: email address...**");
  registrationpage.registrationPageElements.getEmailField().type(`${user.email}{enter}`);

  cy.log("**Fill in the form: enter password...**");
  registrationpage.registrationPageElements.getPasswordField().type(`${user.password}{enter}`);

  cy.log("**Confirm password strength indicator has expected class**");
  registrationpage.registrationPageElements.getPasswordProgressBar().should("have.class", "bg-success");

  cy.log("**Confirm password strength indicator has expected colour**");
  registrationpage.registrationPageElements.getPasswordProgressBar().should("have.css", "background-color", "rgb(76, 187, 108)");

  cy.log("**Fill in the form: confirm T&Cs...**");
  registrationpage.registrationPageElements.getTAndCCheckbox().check();

  cy.log("**Fill in the form: agree to data privacy...**");
  registrationpage.registrationPageElements.getDataPrivacyCheckbox().check();

  cy.log("**Fill in the form: click Save...**");
  registrationpage.registrationPageElements.getSaveButton().click();
});

Cypress.Commands.add("createUserLoginDetails", () => {
  return cy.readFile("cypress/fixtures/userAccount.json").then((userData) => {
    const randomUser = (Math.random() + 1).toString(36).substring(7);
    var user = JSON.parse(JSON.stringify(userData));
    user.email = `test-${randomUser}@example.com`;
    return cy.writeFile("cypress/fixtures/userAccount.json", user).then(() => {
      return user; // Returning a value to make it chainable
    });
  });
});

Cypress.Commands.add("findinIframe", (selector, frameName = "#framelive") => {
  cy.frameLoaded(frameName);
  return cy.iframe(frameName).find(selector);
});

Cypress.Commands.add("getUserLoginDetails", () => {
  return cy.fixture("userAccount.json").then((userData) => {
    return userData;
  });
});

Cypress.Commands.add("logElementHTML", { prevSubject: true }, (subject) => {
  // Log the HTML content of the element
  cy.log(subject.html());
  // Return the subject to allow chaining
  return cy.wrap(subject);
});

Cypress.Commands.add("signIn", (user) => {
  cy.log("**Navigate back to the Home Page...**");
  homepage.homePageElements.visitHomePage();

  cy.log("**Clicking the Sign In button on the Home Page menu header...**");
  cy.wait(1000);
  homepage.homePageElements.getSignInButton().click();
  cy.wait(1000);

  cy.log("**Enter email address...**");
  loginpage.logInPageElements.getEmailField().type(`${user.email}{enter}`);

  cy.log("**Enter password...**");
  loginpage.logInPageElements
    .getPasswordField()
    .type(`${user.password}{enter}`)
    .then(() => {
      cy.log("**Confirm user name is displayed...**");
      registrationpage.registrationPageElements.getSignedInName().contains(`${user.firstName} ${user.lastName}`);
    });
});

Cypress.Commands.add("signInWithSession", () => {
  cy.session(
    "userSession1",
    () => {
      cy.log("**Navigate to the home page...**");
      homepage.homePageElements.visitHomePage();
      cy.log("**Clicking the Sign In button on the Home Page menu header...**");
      cy.wait(1000);
      homepage.homePageElements.getSignInButton().click();
      cy.wait(1000);
      cy.getUserLoginDetails().then((user) => {
        cy.log("**Enter email address...**");
        loginpage.logInPageElements.getEmailField().type(`${user.email}{enter}`);
        cy.log("**Enter password...**");
        loginpage.logInPageElements.getPasswordField().type(`${user.password}{enter}`);
      });
      cy.wait(500);
    },
    {
      validate() {
        homepage.homePageElements.visitHomePage();
        registrationpage.registrationPageElements.getSignedInName();
      },
      cacheAcrossSpecs: true,
    }
  );
});

Cypress.Commands.add("createAccountWithSession", () => {
  cy.session("userSession1", () => {
    cy.createUserLoginDetails().then((user) => {
      cy.createUserAccount(user);
    }),
      {
        validate() {
          homepage.homePageElements.visitHomePage();
          cy.findinIframe("div.user-info").contains("a", "Sign in").should("not.exist");
        },
        cacheAcrossSpecs: true,
      };
  });
});

Cypress.Commands.add("signOut", () => {
  cy.log("**Click Sign out...**");
  registrationpage.registrationPageElements.getSignOutButton().click();

  cy.log("**Check the nav breadcrumb to confirm home page loads...**");
  cy.confirmBreadcrumb("Home");

  cy.log("**Confirm we have the Sign In button agains...**");
  cy.wait(1000);
  homepage.homePageElements.getSignInButton();
});
