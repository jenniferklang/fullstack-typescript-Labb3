import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("Hej", () => {
  cy.visit("http://localhost:5173/log");
  cy.get("#form-for-anteckning").should("be.visible");
});

When("Då", () => {
  cy.get("#kalender-ikon").click();
});

Then("Hejdå", () => {
  cy.get("#kalender").should("be.visible");
  cy.get(".markering").should("exist");
});
