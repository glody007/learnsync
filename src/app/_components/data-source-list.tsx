'use client'

import { ReactNode, useState } from "react";
import { FileText, Globe, Book, Plus } from "lucide-react";
import { DataSourceDialog, type DataSourceSpec } from "./data-source-dialog";
import { CustomSourceForm, NotionSourceForm, PDFSourceForm, URLSourceForm } from "./sources-forms";
import { SelectSource } from "@/db/schema";
import { useRouter } from "next/navigation";

const dataSources: DataSourceSpec[] = [
  {
    icon: <FileText className="h-10 w-10 text-primary" />,
    title: "PDF Documents",
    description: "Extract data from PDF files with ease.",
    modalDescription: "Upload your PDF document to extract its contents.",
    type: 'pdf',
  },
  {
    icon: <Globe className="h-10 w-10 text-primary" />,
    title: "Web URLs",
    description: "Fetch and analyze data from web pages.",
    modalDescription: "Enter a web URL to fetch and analyze its content.",
    type: 'url',
  },
  {
    icon: <Book className="h-10 w-10 text-primary" />,
    title: "Notion Pages",
    description: "Integrate seamlessly with your Notion workspace.",
    modalDescription: "Enter your Notion page URL to import its content.",
    type: 'notion',
  },
  {
    icon: <Plus className="h-10 w-10 text-primary" />,
    title: "More Sources",
    description: "Expand your data reach with additional integrations.",
    modalDescription: "Suggest a new integration you'd like to see.",
    type: 'custom',
  },
];

export function DataSourceList({ sources }: { sources: SelectSource[] }) {
  const [activeSource, setActiveSource] = useState<DataSourceSpec | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const router = useRouter()

  const handleSourceClick = (source: DataSourceSpec) => {
    setActiveSource(source);
    setIsDialogOpen(true);
  };

  const activeSourceUI = () => {  
    const source = sources.find(s => s.type === activeSource?.type)
    if(activeSource?.type === 'notion' && source) return <NotionSourceForm sourceId={source.id} handleSubmit={() => router.push(`/assessment/${source?.id}`)} />
    if(activeSource?.type === 'pdf') return <PDFSourceForm />
    if(activeSource?.type === 'url' && source) return <URLSourceForm sourceId={source?.id} handleSubmit={() => router.push(`/assessment/${source?.id}`)} />
    return <CustomSourceForm />
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
      {dataSources.map((source, index) => (
        <DataSourceCard
          key={index}
          icon={source.icon}
          title={source.title}
          description={source.description}
          isActive={sources.findIndex(s => s.type === source.type) !== -1}
          onClick={() => handleSourceClick(source)}
        />
      ))}
      <DataSourceDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        sourceSpec={activeSource}
        content={activeSourceUI()}
      />
    </div>
  );
}

function DataSourceCard({
  icon,
  title,
  description,
  onClick,
  isActive = false,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  isActive?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center space-y-2 border border-border p-4 rounded-lg cursor-pointer transition-colors hover:bg-accent ${isActive ? '' : 'opacity-50'}`}
      onClick={isActive ? onClick : undefined}
    >
      {icon}
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-sm text-muted-foreground text-center">{description}</p>
    </div>
  );
}
