import { db } from "@/db/drizzle";
import { DataSourceList } from "./_components/data-source-list";
import { sources as sourceTable } from "@/db/schema";


export default async function ProductHero() {
  const sources = await db.select().from(sourceTable)
  

  return (
    <>
      <section className="w-full py-12 md:py-24  bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  LearnSync
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl dark:text-gray-400">
                  Transform your <strong className="text-black">custom content</strong>—blog posts, books, Notion pages, or videos—into a <strong className="text-black">Duolingo-like</strong> learning experience for <strong className="text-black">any topic</strong>, with assessments, knowledge graphs, and personalized recommendations.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <DataSourceList sources={sources} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

