describe("Navbar", () => {
  it("should navigate to different pages", () => {
    cy.visit("/");

    cy.get(".navbar-nav").contains("Home").click();
    cy.url().should("include", "/");

    cy.get(".navbar-nav").contains("Log").click();
    cy.url().should("include", "/log");

    cy.get(".navbar-nav").contains("Login").click();
    cy.url().should("include", "/login");
  });
});
