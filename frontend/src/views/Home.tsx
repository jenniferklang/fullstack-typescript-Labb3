import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    mermaid: any;
  }
}

const Home: React.FC = () => {
  const [mermaidHtml, setMermaidHtml] = useState<string>("");

  useEffect(() => {
    const fetchMermaidHtml = async () => {
      try {
        const response = await fetch("/mermaid.html");
        const htmlContent = await response.text();
        setMermaidHtml(htmlContent);

        if (window.mermaid) {
          window.mermaid.initialize({ startOnLoad: true });
          window.mermaid.init();
        }
      } catch (error) {
        console.error("Error fetching Mermaid HTML:", error);
      }
    };

    fetchMermaidHtml();
  }, []);

  return (
    <div>
      <h1>Hälsologgen</h1>
      <div dangerouslySetInnerHTML={{ __html: mermaidHtml }} />
    </div>
  );
};

export default Home;
