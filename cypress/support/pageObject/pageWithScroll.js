class PageWithScroll {
    saveRequestForPage(pageNumber, fileName) {
        cy.request('GET', 'api/quotes?page='+pageNumber).then(
            (response) => {
                let dataJson = response.body
                cy.exec('rm ' +fileName, { log: true, failOnNonZeroExit: false }) // delete old file
                cy.writeFile(fileName, dataJson)
        })
        return this
    }
    openFile(fileName) {
        return cy.readFile(fileName)
    }
    scrollToNextPage() {
        cy.scrollTo(0, 800)
        return this
    }
    //--------Check----------
    checkQuoteElement(quoteNumber) {
        cy
            .get(':nth-child('+quoteNumber+')')
            .should('be.visible')
            .get(':nth-child('+quoteNumber+') > .text')
            .should('be.visible')
            .get(':nth-child('+quoteNumber+') > :nth-child(2) > .author')
            .should('be.visible')
            .get(':nth-child('+quoteNumber+') > .tags')
            .should('be.visible')
        return this
    }
    checkFirstTenElementsBeforeScroll(){
        this.checkQuoteElement(10)
        cy.get(':nth-child(11) > .tags').should('not.exist')
        return this
    }
    checkTenElementsSecondPageAfterScroll(){
        this.checkQuoteElement(20)
        cy.get(':nth-child(11) > .tags').should('be.visible')
        return this
    }
    checkQuoteData(quoteNumber, fileName) {
        this.openFile(fileName).then((quotes) => {
            cy.get(':nth-child('+quoteNumber+') > .text').should(($lis) => {
                expect($lis).to.contain(quotes.quotes[quoteNumber-1].text)
            }) // check text
            cy.get(':nth-child('+quoteNumber+') > :nth-child(2) > .author').should(($lis) => {
                expect($lis).to.contain(quotes.quotes[quoteNumber-1].author.name)
            }) // check author
            for(let i = 0; quotes.quotes[quoteNumber-1].tags.length > i; i++) {
                let tagNumber = i+1
                cy.get(':nth-child(' + quoteNumber + ') > .tags > :nth-child('+tagNumber+')').should(($lis) => {
                    expect($lis).to.contain(quotes.quotes[quoteNumber - 1].tags[i])
                }) // check tags
            }
        })
        return this
    }
    checkQuotesData(fromQuoteNumber, toQuoteNumber, fileName) {
        this.openFile(fileName).then((quotes) => {
                cy.log(quotes.quotes.length)
                for(let i = fromQuoteNumber; toQuoteNumber > i; i++) {
                    cy.get(':nth-child('+i+') > .text').should(($lis) => {
                        expect($lis).to.contain(quotes.quotes[i-1].text)
                    }) // check text
                    cy.get(':nth-child('+i+') > :nth-child(2) > .author').should(($lis) => {
                        expect($lis).to.contain(quotes.quotes[i-1].author.name)
                    }) // check author
                    for(let p = 0; quotes.quotes[i-1].tags.length > p; p++) {
                        let tagNumber = p+1
                        cy.get(':nth-child(' + i + ') > .tags > :nth-child('+tagNumber+')').should(($lis) => {
                            expect($lis).to.contain(quotes.quotes[i - 1].tags[p])
                        }) // check tags
                    }
                }
        })
        return this
    }
}

export const pageWithScroll = new PageWithScroll()
