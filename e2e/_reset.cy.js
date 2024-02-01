describe("Reset all sessions and browser state", () => {
  it("Resets browser state and clears all saved sessions", () => {
    cy.log("reset browser state...").then(Cypress.session.clearCurrentSessionData);
    cy.log("clear all saved sessions...").then(Cypress.session.clearAllSavedSessions);
    cy.log("clear local storage...").clearLocalStorage();
  });

  /*  Creates a user session for a new user", () => {
    cy.createUserLoginDetails().then((user) => {
      cy.createUserAccount(user);
    });

  it("Creates a user account on the website then signs out.", () => {
    cy.getUserLoginDetails().then((user) => {
      cy.createUserAccount(user);
      cy.signOut();
      cy.log(`\n\nemail is ${user.email}\npassword is ${user.password}`);
    }); 
  });*/
});
