export class Shoppingcartpage {
  shoppingCartPageElements = {
    confirmCartDetailsItemPrice: (text) => {
      return this.shoppingCartPageElements
        .getCartSummaryPanel()
        .contains("span.label", "Subtotal")
        .parent()
        .contains("span.value", text)
        .should("be.visible");
    },

    confirmCartDetailsItemTitle: (text) => {
      return this.shoppingCartPageElements.getCartSummaryPanel().contains("a", text).should("be.visible");
    },

    getCartSummaryPanel: () => {
      return cy.findinIframe("section#js-checkout-summary");
    },

    getItemCountSummary: (text) => {
      return cy.findinIframe("div.cart-summary-products").contains("p", text).should("be.visible");
    },

    getProceedToCheckout: () => {
      return cy.findinIframe("div.checkout").contains("a.btn", "Proceed to checkout").should("be.visible");
    },

    getShoppingCartIframeTitle: () => {
      cy.wait(4000);
      return cy.confirmFirstHeadingInIFrame("Shopping Cart");
    },

    getShowDetails: () => {
      return this.shoppingCartPageElements.getCartSummaryPanel().contains("a", "show details");
    },

    confirmShowDetailsToggleIsCollapsed: () => {
      return this.shoppingCartPageElements.getShowDetails().should("not.have.attr", "aria-expanded") // .should("be.visible");
    },
    
    confirmShowDetailsToggleIsNotCollapsed: () => {
      return this.shoppingCartPageElements.getShowDetails().should("have.attr", "aria-expanded", "true").should("be.visible");
    },
  };

  // SETTERS
  toggleBasketDetailsAccordian() {
    return this.shoppingCartPageElements.getShowDetails().click();
  }
}
