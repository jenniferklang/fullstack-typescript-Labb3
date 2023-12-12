// Ett E2E test som använder it.

describe("E2E Test", () => {
  it("borde välja en stad från rullgardinsmenyn och hantera hämtning av data", () => {
    cy.visit("http://localhost:5174/");

    cy.get("h1").should("have.text", "Livsmedelsgrossister");
  });
});
