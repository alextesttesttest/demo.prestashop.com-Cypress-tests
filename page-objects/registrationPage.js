export class Registrationpage {
  registrationPageElements = {
    getContinueButtonForLogin: () => {
      return cy.findinIframe("div.tab-pane.active button.continue").contains("Continue").should("be.visible");
    },

    getDataPrivacyCheckbox: () => {
      return (
        cy
          // .findinIframe("section.register-form")
          .findinIframe("span.custom-checkbox")
          .contains(
            // "span.custom-checkbox",
            'The personal data you provide is used to answer queries, process orders or allow access to specific information. You have the right to modify and delete all the personal information found in the "My Account" page.'
          )
          .should("be.visible")
          .find('input[name="customer_privacy"][type="checkbox"]')
      );
    },

    getEmailField: () => {
      return cy.findinIframe("input#field-email").should("be.visible");
    },

    getFirstNameField: () => {
      return cy.findinIframe("input#field-firstname").should("be.visible");
    },

    getLastNameField: () => {
      return cy.findinIframe("input#field-lastname").should("be.visible");
    },

    getPasswordField: () => {
      return cy.findinIframe("section.register-form input#field-password").should("be.visible");
    },

    getPasswordFieldForLogin: () => {
      return cy.findinIframe("div.tab-pane.active input#field-password").should("be.visible");
    },

    getPasswordProgressBar: () => {
      return cy.findinIframe("div.progress-bar").should("be.visible");
    },

    getSaveButton: () => {
      return cy.findinIframe("button.form-control-submit").contains("Save").should("be.visible");
    },

    getSignInEmailField: () => {
      return cy.findinIframe("form#login-form input#field-email").should("be.visible");
    },

    getSignInMenuToggle: () => {
      cy.wait(1000); // Have to wait for page to render new tab view - need a better solution
      return cy.findinIframe("a.nav-link").contains("Sign in").should("be.visible");
    },

    getSignedInName: () => {
      cy.wait(2000); // Have to wait for page to render
      return cy.findinIframe("div.user-info a.account").should("be.visible");
    },

    getSignOutButton: () => {
      cy.wait(3000);
      return cy.findinIframe("a.logout").contains("Sign out").should("exist");
    },

    getSocialTitleButton: () => {
      return cy.findinIframe('input[name="id_gender"][id="field-id_gender-2"]').should("exist");
    },

    getTAndCCheckbox: () => {
      cy.wait(2000);
      //  return cy.findinIframe("section.register-form")
      return cy
        .findinIframe("span.custom-checkbox")
        .contains("I agree to the terms and conditions and the privacy policy")
        .should("be.visible")
        .find('input[name="psgdpr"][type="checkbox"]');
    },
  };

  // SETTERS

  confirmRegistrationPagePersonalInformationTabViewLoads() {
    cy.wait(2000);
    return cy.confirmFirstHeadingInIFrame("Personal Information");
  }
}
