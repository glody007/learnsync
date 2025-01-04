import { CheerioWebBaseLoader } from '@langchain/community/document_loaders/web/cheerio'


export async function getUrlContent(url: string) {
    const loader = new CheerioWebBaseLoader(url.trim())
    const scraper = await loader.scrape()
    const content = scraper.text()
    return {
        content
    }
}