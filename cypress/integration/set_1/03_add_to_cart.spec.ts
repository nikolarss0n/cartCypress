import landingPageObj from './pom/mainPage';
import ClothsCategoryPageObj from './pom/categoryPage';
import CartPageObj from './pom/cartPage';
import ProductDetailPageObj from './pom/productDetailPage';

const landingPage = new landingPageObj();
const clothesCategoryPage = new ClothsCategoryPageObj();
const cartPage = new CartPageObj();
const productDetailsPage = new ProductDetailPageObj();


describe('Cart', () => {
    beforeEach(() => {
        landingPage.acceptCookies()
    });

    /*
      Description: Add item to cart
      Test Steps:
          1. Select English language
          2. Choose "Man" category
          3. Check if item has color, size, price and add it to the cart 
          4. Assert item is added to cart with same size and color

    */
    it('Add cart product - English', () => {
        
        console.log();
        const productName = 'Long recycled wool coat';
        
        // Select English language
        landingPage.switchLanguage['English']()
        
        // Assert page location after language selection
        cy.location('pathname').should('eq', '/bg-en')
        
        // Choose "Man" category
        clothesCategoryPage.categoryMen().click()
        
        // Choose item
        clothesCategoryPage.chooseItem(productName)
        
        //Choose random color & size
        productDetailsPage.chooseRandomSize()
        productDetailsPage.chooseRandomColor()
        
        cy.then(function () {
            cy.log(`📦 Product size: ${this.prodSize}`)
            cy.log(`📦 Product color: ${this.colorType}`)

            // Add to cart
            cartPage.addToCart(productName, this.prodSize, this.colorType)

            // Assert correct product is added to the cart
            cartPage.cartBagInfo()
                .should('contain', this.prodSize)
                .and('contain', this.colorType)
        })
    })
});