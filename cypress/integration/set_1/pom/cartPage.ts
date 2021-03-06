import landingPageObj from './mainPage';
import ClothsCategoryPageObj from './categoryPage';
import ProductDetailPageObj from './productDetailPage';

const landingPage = new landingPageObj();
const clothesCategoryPage = new ClothsCategoryPageObj();
const productDetailPage = new ProductDetailPageObj();

class CartPageObj {
    cartBagInfo() {
        return cy.get('[data-testid="bag.item.info"]')
    }

    addToCart(productName: string, productSize: string, productColor: string) {
        const logProductDetails = Cypress.log({
            displayName: `📦Product Details: ${productName} - ${productSize} - ${productColor}`,
            autoEnd: false
        })
       
        // Assert correct item is displayed
        productDetailPage.productTitle().should('contain', productName)

        // Product Prize
        productDetailPage.productPrice().then((amount: any) => {
            cy.log(`💵 Product price: ${amount}`)
        })

        // Select "Medium Brown" color
        productDetailPage.chooseColor(productColor)
        
        // Assert color change
        productDetailPage.productColor().should('contain', `${productColor}`)
        
        // Choose "XL" size
        productDetailPage.chooseSize(productSize)
        
        // Assert size change
        productDetailPage.productSize().should('contain', `${productSize}`)
        
        // Add to cart
        cy.intercept('POST', '**BG**').as('addToCart')
        productDetailPage.addToCartBtn()
        cy.wait("@addToCart")
        logProductDetails.end()
    }
}

export default CartPageObj;