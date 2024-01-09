describe("Saved Logs E2E Test", () => {
  let createdLogId: number;

  before(() => {
    // Skapar en ny anteckning så att
    // det får det id för att kunna göra test
    cy.request("POST", "http://localhost:3002/api/add-entry", {
      date: "2024-01-09",
      content: "Anteck. från test",
      symptoms: "Anteck. från test",
      meal: "Anteck. från test",
    }).then((response) => {
      createdLogId = response.body.entry_id;
    });
  });

  it("should display selected log details", () => {
    cy.visit(`http://localhost:5173/log/details/${createdLogId}`);

    cy.get("h2").should("have.text", "Saved Logs");
    cy.get('div:contains("Date:")').should("be.visible");
    cy.get('div:contains("Content:")').should("be.visible");
    cy.get('div:contains("Symptoms:")').should("be.visible");
    cy.get('div:contains("Meal:")').should("be.visible");
  });
});
