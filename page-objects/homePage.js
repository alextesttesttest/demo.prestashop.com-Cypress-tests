export class Homepage {
  homePageElements = {
    confirmCollapsedPromoToggleButton: () => {
      return cy.get("a.btn-collapse.collapsed").contains("Show").should("exist");
    },

    confirmLoadingMessage: () => {
      cy.get("div#loadingMessage").contains("A shop is on its way and will take a few seconds to be available.").should("be.visible");
      cy.get("div.loadingMessage").should("not.exist");
    },

    confirmProductCountInModal: (message) => {
      return cy.findinIframe("div.cart-content").contains("p.cart-products-count", `${message}`).should("be.visible");
    },

    confirmProductInBasketMessage: (message) => {
      return cy.findinIframe("div.modal-header").contains("h4.modal-title", `${message}`).should("be.visible");
    },

    getAddToCartInModal: () => {
      return cy.findinIframe("button.add-to-cart").should("be.visible");
    },

    getDropdownInModal: () => {
      // defaults to the first (smallest) size
      return cy.findinIframe("div.product-variants").find("select.form-control").should("be.visible").find("option").last();
    },

    getPromoToggleButton: () => {
      return cy.get("a.btn-collapse").contains("Hide").should("be.visible").should("not.have.class", "collapsed");
    },

    getPageTitle: () => {
      return cy.title();
    },

    getProductBySectionAndName: (productTitle) => {
      return cy
        .findinIframe("section.featured-products")
        .find("h3.product-title")
        .contains(productTitle)
        .should("be.visible")
        .parents("article");
    },

    getProceedToCheckoutInModal: () => {
      return cy.findinIframe("div.cart-content").contains("a.btn", "Proceed to checkout").should("be.visible");
    },

    getQuickViewLink: () => {
      // this link is hidden and only visible on mouseover
      return cy.get("a.quick-view").should("exist");
    },

    getSignInButton: () => {
      return cy.findinIframe("div.user-info").contains("a", "Sign in").should("be.visible");
    },

    visitHomePage: () => {
      cy.visit("demo.prestashop.com");

      cy.log("**Confirm loading message behaviour...**");
      this.homePageElements.confirmLoadingMessage();

      cy.log("**Check the nav breadcrumb to confirm home page loads...**");
      cy.confirmBreadcrumb("Home");

      cy.log("**Dismiss promo banner...**");
      this.hidePromoMenu();

      cy.log("**Confirm promo banner is minimised...**");
      return this.homePageElements.confirmCollapsedPromoToggleButton();
    },
  };

  // SETTERS
  hidePromoMenu() {
    this.homePageElements.getPromoToggleButton().contains("Hide").click({ force: true });
  }

  selectLastOptionInDropdown() {
    return this.homePageElements.getDropdownInModal().then(() => {
      ($option) => {
        const lastOptionText = $option.text();
        cy.get("select.form-control").select(lastOptionText);
      };
    });
  }
}
