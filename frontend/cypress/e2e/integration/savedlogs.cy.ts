describe("Saved Logs E2E Test", () => {
  let createdLogId: number;
  let symptoms: string[];

  before(() => {
    cy.request("POST", "http://localhost:3002/api/add-entry", {
      date: "2024-01-09",
      content: "Anteck. från test",
      symptoms: "Anteck. från test",
      meal: "Anteck. från test",
    }).then((response) => {
      createdLogId = response.body.entry_id;
    });

    cy.request("GET", "http://localhost:3002/api/symptoms").then((response) => {
      symptoms = response.body.map((symptom) => symptom.name);
    });
  });

  it("should display selected log details", () => {
    cy.visit(`http://localhost:5173/log/details/${createdLogId}`);

    cy.get("#symptoms-container").should("be.visible");

    cy.get("h2").should("have.text", "Saved Logs");
    cy.get('div:contains("Date:")').should("be.visible");
    cy.get('div:contains("Content:")').should("be.visible");
    cy.get('div:contains("Symptoms:")').should("be.visible");
    cy.get('div:contains("Meal:")').should("be.visible");

    symptoms.forEach((symptom: string) => {
      cy.get(`button.symptom-button[data-symptom='${symptom}']`).click();

      cy.get(`button.symptom-button[data-symptom='${symptom}']`)
        .next()
        .find("select.symptom-dropdown")
        .should("be.visible")
        .select("3");
    });
  });
});
