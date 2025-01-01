import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/is-mobile";
import { useState } from "react";
import { generateQuestionsFromSource } from "../server/actions";

export const NotionSourceForm = ({ handleSubmit, sourceId }: { sourceId: number, handleSubmit: (id: number) => void }) => {
  const [url, setUrl] = useState("");
  const [isLoading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const url = e.currentTarget.url.value;
    await generateQuestionsFromSource(sourceId)
    handleSubmit(parseInt(url));
  };

  const isMobile = useIsMobile();

  return (
    <form onSubmit={submit} className="space-y-8">
      <div className="space-y-4">
        <p>Enter your Notion page URL to import its content.</p>
        <Input
          name="url"
          placeholder="https://www.notion.so/your-page"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <Button
        className={isMobile ? "w-full" : ""}
        disabled={isLoading}
      >
        {isLoading && <Loader />}
        Fetch Content
      </Button>
    </form>
  );
};


export const PDFSourceForm = () => {
  const [file, setFile] = useState<File>();

  const handleSubmit = () => {
    console.log(file);
  };

  const isMobile = useIsMobile();

  return (
    <form className="space-y-8">
      <div className="space-y-4">
        <p>Upload your PDF document to extract its contents.</p>
        <Input
          placeholder="Choose a PDF file"
          type="file"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
      </div>
      <Button
        onClick={handleSubmit}
        className={isMobile ? "w-full" : ""}
      >
        Extract Content
      </Button>
    </form>
  );
};

export const URLSourceForm = () => {
  const [url, setUrl] = useState("");
  const handleSubmit = (url: string) => {
    console.log(url);
  };

  const isMobile = useIsMobile();

  return (
    <form className="space-y-8">
      <div className="space-y-4">
        <p>Enter a web URL to fetch and analyze its content.</p>
        <Input
          placeholder="https://example.com"
          value={url}
          type="url"
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <Button
        onClick={() => handleSubmit(url)}
        className={isMobile ? "w-full" : ""}
      >
        Fetch Content
      </Button>
    </form>
  );
};

export const CustomSourceForm = () => {
  const [url, setUrl] = useState("");
  const handleSubmit = (url: string) => {
    console.log(url);
  };

  const isMobile = useIsMobile();

  return (
    <form className="space-y-8">
      <div className="space-y-4">
        <p>Enter a web URL to fetch and analyze its content.</p>
        <Input
          placeholder="https://example.com"
          value={url}
          type="url"
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <Button
        onClick={() => handleSubmit(url)}
        className={isMobile ? "w-full" : ""}
      >
        Fetch Content
      </Button>
    </form>
  );
};
