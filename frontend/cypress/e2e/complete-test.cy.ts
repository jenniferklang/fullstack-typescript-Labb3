// // Ett E2E test som involverar frontend backend och databas.

// describe("E2E Test", () => {
//   it("borde välja en stad från rullgardinsmenyn och hantera hämtning av data", () => {
//     cy.visit("http://localhost:5174/");

//     cy.get("h1").should("have.text", "Livsmedelsgrossister");

//     cy.get(".dropdown").select("Göteborg");

//     cy.get(".dropdown").should("contain", "Göteborg");

//     cy.get(".card ul").should("have.length.gte", 1);

//     cy.get(".card ul:first p:first").should("be.visible");

//     cy.get(".card ul:first button").click();

//     cy.get(".card ul").should("have.length", 1);

//     cy.get("button:contains('Lägg till')").should("be.visible").click();

//     cy.get(".card ul").should("have.length", 1);
//   });
// });
