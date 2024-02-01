# demo.prestashop.com-Cypress-tests

This demo site has some challenges for Cypress testing, in particular:

- almost all functionality is within an iframe. I have used the iframe plugin for Cypress extensively to test withing the main iframe
- because it is a demo account, user account have a short lifetime and are not persisted
- cy.session() does not play well with the site. Accounts created with .session() do not appear to be portable across .spec files
- nested iframes are present which contain scripting and the iframe plugin is only usable on one iframe instance at any one time. As a result (too many) cy.wait() calls have to be made.
