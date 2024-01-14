describe("Header Component", () => {
  it("renders the header image", () => {
    cy.visit("/");

    cy.get(".card-img-top.image.header-image.img-fluid")
      .should("exist")
      .and("be.visible");
  });
});
