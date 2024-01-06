import {
  Given,
  When,
  Then,
  Before,
} from "@badeball/cypress-cucumber-preprocessor";

const baseUrl = "http://localhost:5173";

Before(() => {
  cy.visit(`${baseUrl}/log`);
});

Given("Datum med redan tillagda anteckningar visas", () => {});

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
  () => {}
);

When("Jag klickar på en befintlig anteckning för valt datum", () => {
  cy.get(".log-entry").first().click();
});

Then("Anteckningen får en färgad ram runt sig, den är markerad", () => {
  cy.get(".log-entry.selected").should("exist");
});

Given("Tillagda anteckningar visas för valt datum", () => {});

// Ett försök till att göra koden mer DRY genom att skapa en gemensam funktion
const selectPushButton = (buttonText: "Ta bort" | "Ändra") => {
  cy.get(".log-entry").first().as("selectedEntry");
  cy.get("@selectedEntry").invoke("attr", "data-id").as("selectedEntryId");
  cy.get("@selectedEntry").click();
  cy.contains(buttonText).should("be.visible").click();
};

When(
  "Jag markerar en befintlig anteckning och klickar på ta bort-knapp som visas",
  (buttonText: "Ta bort" | "Ändra") => {
    selectPushButton(buttonText);
  }
);

Then("Vald anteckning är borttagen", () => {
  cy.get("@selectedEntryId").then((selectedId) => {
    cy.get(`.log-entry[data-id="${selectedId}"]`).should("not.exist");
  });
});

When(
  "Jag markerar en befintlig anteckning och klickar på ändra-knapp som visas",
  (buttonText: "Ta bort" | "Ändra") => {
    selectPushButton(buttonText);
  }
);

Then("All information vid vald anteckning visas och kan ändras", () => {
  cy.get("#content").should("exist");
  cy.get("#symptoms").should("exist");
  cy.get("#meal").should("exist");

  cy.get("@selectedEntry").then(($selectedEntry) => {
    const content = $selectedEntry.find(".content").text();
    const symptoms = $selectedEntry.find(".symptoms").text();
    const meal = $selectedEntry.find(".meal").text();

    cy.get("#content").clear().type(content);
    cy.get("#symptoms").clear().type(symptoms);
    cy.get("#meal").clear().type(meal);
  });

  cy.contains("Spara ändringar").should("be.visible").click();
});

// When(
//   "Jag markerar en befintlig anteckning och klickar på ta bort-knapp som visas",
//   () => {
//     cy.get(".log-entry").first().as("selectedEntry");
//     cy.get("@selectedEntry").invoke("attr", "data-id").as("selectedEntryId");
//     cy.get("@selectedEntry").click();
//     cy.contains("Ta bort").should("be.visible").click();
//   }
// );

// Then("Vald anteckning är borttagen", () => {
//   cy.get("@selectedEntryId").then((selectedId) => {
//     cy.get(`.log-entry[data-id="${selectedId}"]`).should("not.exist");
//   });
// });
