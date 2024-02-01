export class Loginpage {
  logInPageElements = {
    getAddressField: () => {
      return cy.findinIframe("section.form-fields input#field-address1").should("be.visible");
    },

    getCityField: () => {
      return cy.findinIframe("section.form-fields input#field-city").should("be.visible");
    },

    /*     getContinueButton: () => {
      return cy.findinIframe("footer.form-footer button.continue").contains("Continue").should("be.visible");
    }, */

    getContinueButtonStage3: () => {
      return cy.findinIframe("form#js-delivery").contains("button.continue", "Continue", { matchCase: false }).should("be.visible");
    },

    getCreateAccountIframeTitle: () => {
      cy.wait(500);
      return cy.confirmFirstHeadingInIFrame("Create an account");
    },

    getCreateAccountLink: () => {
      return cy.findinIframe("div.no-account").contains("Create one here").should("be.visible");
    },

    getDataPrivacyCheckbox: () => {
      return cy.findinIframe('input[name="customer_privacy"][type="checkbox"]').should("exist");
    },

    getEmailField: () => {
      return cy.findinIframe("input#field-email").should("be.visible");
    },

    getLastNameField: () => {
      return cy.findinIframe("input#field-lastname").should("be.visible");
    },

    getLoginPageIframeTitle: () => {
      cy.wait(500);
      return cy.confirmFirstHeadingInIFrame("Log in to your account");
    },

    getPasswordField: () => {
      return cy.findinIframe("input#field-password").should("be.visible");
    },

    getPasswordProgressBar: () => {
      return cy.findinIframe("div.progress-bar").should("be.visible");
    },

    getSaveButton: () => {
      return cy.findinIframe("button.form-control-submit").contains("Save").should("exist");
    },

    getSignedInName: () => {
      return cy.findinIframe("a.account").should("be.visible");
    },

    getSignInButton: () => {
      return cy.findinIframe("button#submit-login").should("be.visible");
    },

    getSignOutButton: () => {
      return cy.findinIframe("a.logout").contains("Sign out").should("exist");
    },

    getStateDropdown: () => {
      return cy.findinIframe("section.form-fields select#field-id_state").should("be.visible");
    },

    getTAndCCheckbox: () => {
      return cy.findinIframe('input[name="psgdpr"][type="checkbox"]').should("exist");
    },

    getTAndCBoxStage4: () => {
      return cy.findinIframe("form#conditions-to-approve input#conditions_to_approve" + Cypress.$.escapeSelector("[terms-and-conditions]"));
      //  .should("exist");
    },

    getZipField: () => {
      return cy.findinIframe("section.form-fields input#field-postcode").should("be.visible");
    },
  };

  // SETTERS
  /*   clickContinue() {
    this.logInPageElements.getContinueButton().click();
  }
 */
  clickContinueStage3() {
    this.logInPageElements.getContinueButtonStage3().click();
  }

  enterAddressInForm(address) {
    cy.wait(1000);
    this.logInPageElements.getAddressField().type(`${address}{enter}`);
  }

  enterCityInForm(city) {
    this.logInPageElements.getCityField().type(`${city}{enter}`);
  }

  selectStateInForm(state) {
    this.logInPageElements.getStateDropdown().select(state);
  }

  enterZipInForm(zip) {
    this.logInPageElements.getZipField().type(`${zip}{enter}`);
  }

  tickTandCBoxStage4() {
    this.logInPageElements.getTAndCBoxStage4().click();
  }
}
