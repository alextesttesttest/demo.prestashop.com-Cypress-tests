export class Accountpage {
  accountPageElements = {
    getAddFirstAdddress: () => {
      return cy.findinIframe("section#main a#address-link").contains("Add first address").should("be.visible");
    },

    getAddressAlertSuccess: () => {
      return cy.findinIframe("article.alert").contains("Address successfully added.").should("be.visible");
    },

    getAddressSummary: (user) => {
      return cy
        .findinIframe("div.address-body address")
        .contains(`${user.firstName} ${user.lastName}${user.address}${user.city}, ${user.state} ${user.zip}`)
        .should("be.visible");
    },

    getInformation: () => {
      return cy.findinIframe("section#main a#identity-link").contains("Information").should("be.visible");
    },

    getNewPasswordField: () => {
      return cy.findinIframe("form#customer-form input#field-new_password").should("be.visible");
    },

    getUpdateAlertSuccess: () => {
      return cy.findinIframe("article.alert").contains("Information successfully updated.").should("be.visible");
    },
    getPasswordField: () => {
      return cy.findinIframe("form#customer-form input#field-password").should("be.visible");
    },

    getSaveButton: () => {
      return cy.findinIframe("section.content button.form-control-submit").contains("Save").should("be.visible");
    },
  };

  // SETTERS
  enterPassWord(user) {
    this.accountPageElements.getPasswordField().type(`${user.password}{enter}`);
  }

  enterNewPassWord(user) {
    this.accountPageElements.getNewPasswordField().type(`${user.newPassword}{enter}`);
  }
}
