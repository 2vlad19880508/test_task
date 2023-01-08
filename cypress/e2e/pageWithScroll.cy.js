import {basePage} from "../support/pageObject/basePage";
import {pageWithScroll} from "../support/pageObject/pageWithScroll";

describe('example to-do app', () => {
    beforeEach(() => {
        basePage.openPage('scroll')
    })

    it('Scroll page UI test', () => {
        basePage
            .checkHeader()
            .checkLoginLinkIsDisplayed()
        pageWithScroll
            .checkQuoteElement(1) // Check that quote block has text, author and tags
            .checkFirstTenElementsBeforeScroll()
            .scrollToNextPage()
            .checkTenElementsSecondPageAfterScroll()
        basePage
            .scrollToFooter()
            .checkFooter()
    })

    it('Scroll page API test', () => {
        pageWithScroll
            .saveRequestForPage(1, 'dataJson.json')
            // This can be done without saving to a file, and probably better without.
            // But first I started working on this link http://quotes.toscrape.com/api/quotes and not finding a specific API,
            // I decided just to save the content to a file. After that,
            // I decided to take the API data from http://quotes.toscrape.com/scroll
            // Saving to a file, I decided to save it to demonstrate how to work with files
            .checkQuoteData(5, 'dataJson.json') // Check quote number 5
            .checkQuotesData(1, 9, 'dataJson.json') // Check first 10 quotes
    })
})
