import React, { useEffect, useState } from "react";
import "../App.css";

declare global {
  interface Window {
    mermaid: any;
  }
}

const Login: React.FC = () => {
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
      <div
        className="diagram-container"
        dangerouslySetInnerHTML={{ __html: mermaidHtml }}
      />
    </div>
  );
};

export default Login;
