class PageWithJsDelayed {
    clickNavButton(buttonClass) {
            cy.get(buttonClass).click()
        return this
    }
    //--------Check----------
    checkNextPage(pageElementCount, pageNumber) {
            cy.url().should(($lis) => {
                expect($lis).to.contain('/page/'+pageNumber+'/')
            })
            cy.get('.previous > a').should('be.visible')
      for(let i = 1; pageElementCount > i; i++) {
            cy
                .get(':nth-child('+i+')')
                .should('be.visible')
                .get(':nth-child('+i+') > .text')
                .should('be.visible')
                .get(':nth-child('+i+') > :nth-child(2) > .author')
                .should('be.visible')
                .get(':nth-child('+i+') > .tags')
                .should('be.visible')
        }
        return this
    }
}

export const pageWithJsDelayed = new PageWithJsDelayed()
