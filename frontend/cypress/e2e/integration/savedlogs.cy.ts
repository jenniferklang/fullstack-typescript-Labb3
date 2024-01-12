describe("SavedLogs Test", () => {
  it("borde visa loggdetaljer och interagera med symtom", () => {
    const loggData = {
      entry_id: 244,
      date: "2024-01-10",
      content: "Testinnehåll",
      symptoms: "Testsymptom",
      meal: "Testmåltid",
    };

    cy.visit("http://localhost:5173/log/details/244");
    cy.intercept("GET", "http://localhost:3002/api", [loggData]);

    cy.get(".container").should("be.visible");
    cy.get("h2").should("have.text", "Anteckningar");
    cy.get("p strong:contains('Datum:')").should("be.visible");
    cy.get("p strong:contains('Innehåll:')").should("be.visible");
    cy.get("p strong:contains('Symtom:')").should("be.visible");
    cy.get("p strong:contains('Måltid:')").should("be.visible");
    cy.get(".symptom-buttons-container").should("be.visible");

    cy.get(".symptom-button:contains('Halsbränna')").click();

    cy.get(".symptom-dropdown").should("be.visible");

    cy.get(".symptom-dropdown").select("2");

    cy.get(".symptom-dropdown").should("have.value", "2");
  });
});
