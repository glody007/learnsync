import { DataSourceList } from "./_components/data-source-list";
import { Header } from "./_components/header";


export default function ProductHero() {


  return (
    <>
      <Header />
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  LearnSync
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl dark:text-gray-400">
                  Unlock the power of data integration. Our product seamlessly
                  combines information from various sources, providing you with
                  comprehensive insights at your fingertips.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <DataSourceList />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

