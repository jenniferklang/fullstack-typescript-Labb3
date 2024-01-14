describe("Home Component", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the navbar", () => {
    cy.get(".navbar").should("be.visible");
  });

  it("should contain correct text in the first card", () => {
    cy.get(".custom-card")
      .first()
      .contains(
        "För loggbok över dina dagliga matintag för att lokalisera vad du mår bra av!"
      );
  });

  it("should contain correct text in the second card", () => {
    cy.get(".custom-card")
      .eq(1)
      .contains("Vet du vilka träningsformer som passar dig?");
  });

  it("should contain correct text in the third card", () => {
    cy.get(".custom-card")
      .eq(2)
      .contains(
        "Det är vanligt vid magbesvär att utesluta alltför mycket i sin kost. Får du i dig dina näringsämnen?"
      );
  });
});
