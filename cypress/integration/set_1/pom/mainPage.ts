const testEnv = require('../../../fixtures/testEnv.json');
const { name, url } = testEnv;

class LandingPageObj {
    acceptCookies = () => {
        cy.visit(url)
        const logEnv = Cypress.log({
            displayName: `💻 ${name}`,
            autoEnd: false
        })
        const log = Cypress.log({
            displayName: `🍪 Accepting cookies on: ${url}`,
            autoEnd: false
        })
        cy.intercept('POST', '**/request/v1/consentreceipts**').as('acceptCookies')
        cy.get('#onetrust-accept-btn-handler').click()
        cy.wait("@acceptCookies")
        logEnv.end();
        log.end();
    }

    switchLanguage:any =
        {
            'English': this.selectEnglishLanguage,
            'Bulgarian': this.selectBulgarianLanguage,
        }

    selectEnglishLanguage() {
        const logLanguage = Cypress.log({
            displayName: `🔁Language: English`,
            autoEnd: false
        })
        logLanguage.end()
        return cy.get('[href="entradaPaises.faces?pais=BG&idioma=IN&provincia="]').click();
    }

    selectBulgarianLanguage() {
        const logLanguage = Cypress.log({
            displayName: `🔁Language: Bulgarian`,
            autoEnd: false
        })
        logLanguage.end()
        return cy.get('[href="entradaPaises.faces?pais=BG&idioma=BG&provincia="]').click();
    }
}

export default LandingPageObj;
