// // Här har vi tre integrationstest där jag gör ett GET, DELETE och POST anrop,
// // och kommunicerar bara med backend.

// describe("Integrationstest - GET, DELETE och POST-anrop till backend", () => {
//   it("borde göra ett GET-anrop och hämta data", () => {
//     cy.request("GET", "http://localhost:3001/api")
//       .its("status")
//       .should("eq", 200);
//   });

//   it("borde göra ett DELETE-anrop och ta bort data", () => {
//     cy.request(
//       "DELETE",
//       "http://localhost:3001/api/city/1/grossist/Centrala%20partihallen"
//     )
//       .its("status")
//       .should("eq", 200);
//   });

//   it("borde göra ett POST-anrop och återställa borttagen data", () => {
//     cy.request("POST", "http://localhost:3001/api/city/1/grossist", {
//       grossist_name: "Centrala partihallen",
//       product: "Äpplen",
//       price: "21.90",
//     }).then((response) => {
//       expect(response.status).to.equal(201);
//     });
//   });
// });
