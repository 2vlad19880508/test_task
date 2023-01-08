class BasePage {
    openPage(page) {
        cy
            .visit('/'+page)
        return this
    }
    scrollToFooter() {
        cy
            .get('footer').scrollIntoView()
        return this
    }

    //--------Check---------
    checkHeader() {
        cy
            .get('h1').should(($lis) => {
            expect($lis).to.contain('Quotes to Scrape')
        })
        return this
    }
    checkFooter() {
        cy
            .get('.footer').should('have.css', 'background-color', 'rgb(245, 245, 245)')
            .get('.text-muted').should('be.visible')
            .get('.copyright').should('be.visible')
        return this
    }
    checkLoginLinkIsDisplayed() {
        cy
            .get('.col-md-4 > p > a')
            .should(($lis) => {
                expect($lis).to.contain('Login')
            })
        return this
    }
}

export const basePage = new BasePage()
