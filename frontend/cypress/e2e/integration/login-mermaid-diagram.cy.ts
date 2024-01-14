describe("Login Komponent", () => {
  it("renderar Mermaid HTML och initierar Mermaid", () => {
    cy.intercept("/mermaid.html", { fixture: "mermaid.html" }).as(
      "getMermaidHtml"
    );

    cy.visit("/login");

    cy.wait("@getMermaidHtml", { timeout: 10000 }).then((interception) => {
      cy.log("Response from /mermaid.html:", interception.response.body);
    });

    cy.get(".diagram-container")
      .should("exist")
      .find('svg[aria-roledescription="sequence"]')
      .should("exist");
  });
});

// Ibland visas inte diagrammet på sidan och då fungerar inte testet, men när diagrammet visas så fungerar testet.
