import { find } from "../../../../node_modules/cypress/types/lodash/index";

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

    getRandomColor(randomColor: number) {
        return cy.get('.color-container').eq(randomColor)
    }

    getRandomSize(randomSize: number) {
        return cy.get('span.size-available').eq(randomSize)
    }

    getAllAvailableSizes() {
        return cy.get('.selector-list').find('span').its('length')
    }

    getAvailableColors() {
        return cy.get('.product-colors').find('img').its('length')
    }

    chooseRandomColor() {
        this.getAvailableColors().then(colorCount => {
            let randomColorNum = Math.floor(Math.random() * +colorCount);
            cy.log('randomColorNum', randomColorNum)
            this.getRandomColor(randomColorNum).invoke('attr', 'aria-label')
                .then(colorType => {
                    cy.log('colorType', colorType.replace('selected', '').trim())
                cy.wrap(colorType).as('colorType')
            })
        })
        return cy.get('@colorType')
    }

    chooseRandomSize() {
        this.getAllAvailableSizes().then(sizeCount => {
            let randomSizeNum = Math.floor(Math.random() * +sizeCount);
            this.getRandomSize(randomSizeNum).invoke('text').then(prodSize => {
                cy.wrap(prodSize).as('prodSize')
            })
        })
        return cy.get('@prodSize')
    }

    productPrice() {
        cy.get('div.product-prices > meta').eq(1).invoke('attr', 'content').as('price')
        return cy.get('@price')
    }

    addToCartBtn() {
        cy.get('#addCartContainer').click()
    }
}

export default ProductDetailPageObj;