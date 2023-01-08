import {basePage} from "../support/pageObject/basePage";
import {pageWithScroll} from "../support/pageObject/pageWithScroll";
import {pageWithJsDelayed} from "../support/pageObject/pageWithJsDelayed";

describe('example to-do app', () => {
    beforeEach(() => {
        basePage.openPage('js-delayed')
    })

    it('Scroll page UI test (this is the same code, it shows its versatility and lazy loading does not interfere with work)', () => {
        basePage
            .checkHeader()
            .checkLoginLinkIsDisplayed()
        pageWithScroll
            .checkQuoteElement(1) // Check that quote block has text, author and tags
        basePage
            .checkFooter()
    })

    it('Scroll page API test,', () => {
        pageWithJsDelayed
            .clickNavButton('.next > a')
            .checkNextPage(10, 2) // Check that page 2 has 10 quotes ant all quotes have tex, author and tags
        pageWithScroll
            .saveRequestForPage(2, 'dataJson_page2.json')
            .checkQuoteData(5, 'dataJson_page2.json') // Check quote number 5
            .checkQuotesData(1, 9, 'dataJson_page2.json') // Check first 10 quotes
    })
})
