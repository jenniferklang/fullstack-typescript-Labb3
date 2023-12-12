// VG krav - Mocking för ett GET anrop. Se json fil som ligger i fixtures.

describe("E2E Test - Visa Livsmedelsgrossister med Mocking", () => {
  it("borde visa livsmedelsgrossister för vald stad", () => {
    cy.intercept("GET", "http://localhost:5174/api", {
      fixture: "mockedData.json",
    }).as("getGrossister");

    cy.visit("http://localhost:5174/");

    cy.wait("@getGrossister");

    cy.get("h1").should("have.text", "Livsmedelsgrossister");

    cy.get(".dropdown").select("Göteborg");

    cy.get(".dropdown").should("contain", "Göteborg");

    cy.get(".card ul").should("have.length.gte", 1);

    cy.get(".card ul:first p:first").should("be.visible");

    cy.get(".card ul:first button").click();

    cy.get(".card ul").should("have.length", 1);

    cy.get("button:contains('Lägg till')").should("be.visible").click();

    cy.get(".card ul").should("have.length", 1);
  });
});
