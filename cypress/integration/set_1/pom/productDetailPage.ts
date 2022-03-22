class ProductDetailPageObj {
    productTitle() {
        return cy.get('.product-name');
    }

    chooseColor(color: string) {
        cy.get(`[aria-label*="${color}"]`).click()
    }

    productColor() {
        return cy.get('.colors-info-name');
    }

    chooseSize(size: string) {
        cy.get('#sizesContainer').click()
        cy.get(`[data-size="${size}"]`).click()
    }

    productSize() {
        return cy.get('#sizesContainer');
    }

    productPrize() {
        cy.get('div.product-prices > meta').eq(1).invoke('attr', 'content').as('prize')
        return cy.get('@prize')
    }

    addToCartBtn() {
        cy.get('#addCartContainer').click()
    }
}

export default ProductDetailPageObj;