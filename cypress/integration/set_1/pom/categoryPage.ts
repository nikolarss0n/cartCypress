class ClothsCategoryPageObj {
    categoryMen() {
        return cy.get('[data-ga-cr*="Man"]');
    }

    chooseItem = (productName: String) => {
        return cy.get(`[alt*="${productName}"]`).click()
    }
}

export default ClothsCategoryPageObj;