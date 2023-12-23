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

// import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Given(
//   "Jag är på log-sidan och ser formuläret till att posta ny anteckning",
//   () => {
//     cy.visit("http://localhost:5173/log");
//     cy.get("#form-for-anteckning").should("be.visible");
//   }
// );

// When("Jag klickar på kalender/ikon", () => {
//   cy.get("#kalender-ikon").click();
// });

// Then(
//   "Kalendern visas och datum med redan tillagda anteckningar visas med ”markering”",
//   () => {
//     cy.get("#kalender").should("be.visible");
//     cy.get(".markering").should("exist");
//   }
// );

// Given("Datum med redan tillagda anteckningar visas", () => {
//   // cy.get(".datum-med-anteckningar").should("exist");
// });

// When("Jag fyller i formuläret och klickar på knappen Save Entry", () => {
//   cy.get("#anteckning-input").type("En ny anteckning");
//   cy.get("#save-entry-btn").click();
// });

// Then("Dagens entry är tillagd", () => {
//   cy.get(".dagens-entry").should("have.text", "En ny anteckning");
// });

// Given(
//   "Kalendern visas med markerande datum där användaren gjort anteckningar",
//   () => {
//     // cy.get("#kalender").should("exist");
//   }
// );

// When("Klicka på valt datum", () => {
//   cy.get(".valt-datum").click();
// });

// Then("Lagrade anteckningar visas", () => {
//   cy.get(".lagrade-anteckningar").should("exist");
// });
