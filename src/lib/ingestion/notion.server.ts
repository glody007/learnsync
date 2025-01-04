import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

export async function getNotionPageContent(pageId: string, token: string) {
    const notion = new Client({ auth: token });
    
    const n2m = new NotionToMarkdown({ notionClient: notion });

    const mdblocks = await n2m.pageToMarkdown(pageId);
    return {
        content: n2m.toMarkdownString(mdblocks).parent
    }
}