import React, { useEffect, useRef, useState } from "react";
import {
  X,
  Play,
  RotateCcw,
  Maximize2,
  Code2,
  Monitor,
} from "lucide-react";

function PreviewBar({ code = "" }) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("preview");
  const [output, setOutput] = useState("");

  const iframeRef = useRef(null);

  const runCode = () => {
    if (!code.trim()) {
      setOutput(`
        <html>
          <body style="
            background:#111318;
            color:#777;
            display:flex;
            justify-content:center;
            align-items:center;
            height:100vh;
            font-family:Arial;
          ">
            <div>
              <h3>No code available</h3>
              <p>Generate some code to see the preview.</p>
            </div>
          </body>
        </html>
      `);

      return;
    }

    setOutput(code);
  };

  useEffect(() => {
    if (code) {
      setOutput(code);
    }
  }, [code]);

  const refreshPreview = () => {
    const iframe = iframeRef.current;

    if (!iframe) return;

    const current = iframe.srcdoc;

    iframe.srcdoc = "";

    setTimeout(() => {
      iframe.srcdoc = current;
    }, 50);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="h-screen w-12 bg-[#111318] border-l border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-900 transition"
      >
        <Monitor size={20} />
      </button>
    );
  }

  return (
    <aside className="w-[420px] h-screen bg-[#111318] border-l border-gray-800 text-white flex flex-col">

      {/* Header */}
      <div className="h-14 px-4 border-b border-gray-800 flex items-center justify-between">

        <div className="flex items-center gap-2">
          <Code2 size={19} className="text-blue-500" />

          <span className="font-semibold">
            Preview
          </span>
        </div>

        <div className="flex items-center gap-1">

          <button
            onClick={runCode}
            title="Run"
            className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white"
          >
            <Play size={17} />
          </button>

          <button
            onClick={refreshPreview}
            title="Refresh"
            className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white"
          >
            <RotateCcw size={17} />
          </button>

          <button
            title="Fullscreen"
            className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white"
          >
            <Maximize2 size={17} />
          </button>

          <button
            onClick={() => setIsOpen(false)}
            title="Close"
            className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white"
          >
            <X size={19} />
          </button>

        </div>
      </div>

      {/* Tabs */}
      <div className="h-11 border-b border-gray-800 flex items-center px-3 gap-1">

        <button
          onClick={() => setActiveTab("preview")}
          className={`px-3 py-1.5 rounded-md text-sm ${
            activeTab === "preview"
              ? "bg-gray-800 text-white"
              : "text-gray-500 hover:text-gray-300"
          }`}
        >
          Preview
        </button>

        <button
          onClick={() => setActiveTab("code")}
          className={`px-3 py-1.5 rounded-md text-sm ${
            activeTab === "code"
              ? "bg-gray-800 text-white"
              : "text-gray-500 hover:text-gray-300"
          }`}
        >
          Code
        </button>

      </div>

      {/* Content */}
      <div className="flex-1 min-h-0">

        {activeTab === "preview" ? (

          <iframe
            ref={iframeRef}
            title="Code Preview"
            srcDoc={output}
            sandbox="allow-scripts"
            className="w-full h-full bg-white border-0"
          />

        ) : (

          <pre className="w-full h-full overflow-auto p-4 bg-[#0d0f14] text-sm text-gray-300 font-mono whitespace-pre-wrap">
            {code || "// No code generated yet"}
          </pre>

        )}

      </div>

      {/* Footer */}
      <div className="h-14 border-t border-gray-800 px-4 flex items-center justify-between">

        <span className="text-xs text-gray-500">
          Live Preview
        </span>

        <button
          onClick={runCode}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition"
        >
          <Play size={15} />
          Run
        </button>

      </div>

    </aside>
  );
}

export default PreviewBar;