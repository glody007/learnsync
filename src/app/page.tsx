import { Client } from "@notionhq/client";

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});


export default async function Home() {
  const db = await notion.databases.query({
    database_id: process.env.DB_ID || "",
  })
  
  const pages = await notion.pages.retrieve({
    page_id: process.env.PAGE_ID || "",
  })

  const blocks = await notion.blocks.children.list({
    block_id: process.env.PAGE_ID || "",
  })

  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold">Block</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {JSON.stringify(blocks)}
      </div>
    </div>
  );
}
