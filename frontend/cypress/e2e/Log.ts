import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("Datum med redan tillagda anteckningar visas", () => {
  cy.visit("http://localhost:5173/log");
});

When("Jag fyller i formuläret och klickar på knappen Save Entry", () => {
  cy.get("#content").type("Anteckning-test");
  cy.get("#symptoms").type("Anteckning-test");
  cy.get("#meal").type("Anteckning-test");

  cy.get("form").submit();
});

Then("Dagens entry är tillagd och formuläret blir rensat", () => {
  cy.get(".log-list-container").should("contain.text", "Anteckning-test");
});

Given(
  "Kalender med eventuella tillagda anteckningar visas, representerade som små prickar",
  () => {
    cy.visit("http://localhost:5173/log");
  }
);

When("Jag klickar på en befintlig anteckning för valt datum", () => {
  cy.get(".log-entry").first().click();
});

Then("Anteckningen får en färgad ram runt sig, den är markerad", () => {
  cy.get(".log-entry.selected").should("exist");
});

Given("Tillagda anteckningar visas för valt datum", () => {
  cy.visit("http://localhost:5173/log");
});

When(
  "Jag markerar en befintlig anteckning och klickar på ta bort-knapp som visas",
  () => {
    cy.get(".log-entry").first().as("selectedEntry");
    cy.get("@selectedEntry").invoke("attr", "data-id").as("selectedEntryId");
    cy.get("@selectedEntry").click();
    cy.contains("Ta bort").should("be.visible").click();
  }
);

Then("Vald anteckning är borttagen", () => {
  cy.get("@selectedEntryId").then((selectedId) => {
    cy.get(`.log-entry[data-id="${selectedId}"]`).should("not.exist");
  });
});
