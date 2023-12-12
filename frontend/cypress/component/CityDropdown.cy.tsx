// Ett komponenttest som använder it. Rullgardinsmenyn.

import CityDropdown from "../../src/CityDropdown";

describe("CityDropdown.tsx", () => {
  it("renderar CityDropdown och verifierar standardvärde och alternativ", () => {
    const selectedCity = "";
    cy.mount(
      <CityDropdown selectedCity={selectedCity} onCityChange={() => {}} />
    );

    cy.get(".dropdown-container").within(() => {
      cy.get(".dropdown").should("be.visible");

      cy.get(".dropdown option").should("have.length", 3);

      cy.contains("Välj en stad");
      cy.contains("Stockholm");
      cy.contains("Göteborg");
    });
  });
});
