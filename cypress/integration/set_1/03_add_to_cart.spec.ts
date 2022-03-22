import landingPageObj from './pom/mainPage';
import ClothsCategoryPageObj from './pom/categoryPage';
import CartPageObj from './pom/cartPage';

const landingPage = new landingPageObj();
const clothesCategoryPage = new ClothsCategoryPageObj();
const cartPage = new CartPageObj();


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
        const productName = 'Long recycled wool coat';
        const productSize = 'XL';
        const productColor = 'Medium Brown';

        // Select English language
        landingPage.switchLanguage['English']()

        // Assert page location after language selection
        cy.location('pathname').should('eq', '/bg-en')
        
        // Choose "Man" category
        clothesCategoryPage.categoryMen().click()
        cy.location('pathname').should('eq', '/bg-en/men/featured/patillamss_d98562041')

        // Add to cart
        cartPage.addToCart(productName, productSize, productColor)

        // Assert correct product is added to the cart
        cartPage.cartBagInfo()
            .should('contain', productSize)
            .and('contain', productColor)
    })
});