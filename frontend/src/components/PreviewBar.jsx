import React, { useEffect, useRef, useState } from "react";
import {
  X,
  Play,
  RotateCcw,
  Maximize2,
  Code2,
  Monitor,
} from "lucide-react";
import { useSelector } from "react-redux";

function PreviewBar() {
  const { codePreview = [] } = useSelector((state) => state.message);

  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("preview");
  const [activeFile, setActiveFile] = useState("index.html");
  const [output, setOutput] = useState("");

  const iframeRef = useRef(null);

  // Latest generated code
  const latestCode =
    codePreview.length > 0
      ? codePreview[codePreview.length - 1]
      : null;

  const files = latestCode?.files || [];

  const htmlFile = files.find(
    (file) => file.name === "index.html"
  );

  const cssFile = files.find(
    (file) => file.name === "style.css"
  );

  const jsFile = files.find(
    (file) => file.name === "script.js"
  );

  // Generate complete HTML for preview
  const generatePreview = () => {
    if (!htmlFile?.content) {
      return `
        <!DOCTYPE html>
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
      `;
    }

    let html = htmlFile.content;

    // Add CSS
    if (cssFile?.content) {
      html = html.replace(
        "</head>",
        `
<style>
${cssFile.content}
</style>
</head>
`
      );
    }

    // Add JavaScript
    if (jsFile?.content) {
      html = html.replace(
        "</body>",
        `
<script>
${jsFile.content}
</script>
</body>
`
      );
    }

    return html;
  };

  // Run code
  const runCode = () => {
    const preview = generatePreview();
    setOutput(preview);
  };

  // Automatically update preview
  useEffect(() => {
    if (files.length > 0) {
      setOutput(generatePreview());
    }
  }, [codePreview]);

  // Refresh preview
  const refreshPreview = () => {
    const iframe = iframeRef.current;

    if (!iframe) return;

    const current = iframe.srcdoc;

    iframe.srcdoc = "";

    setTimeout(() => {
      iframe.srcdoc = current;
    }, 50);
  };

  // Get currently selected file
  const selectedFile = files.find(
    (file) => file.name === activeFile
  );

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

  if (!codePreview.length) {
    return null;
  }

  return (
    <aside className="w-105 h-screen bg-[#111318] border-l border-gray-800 text-white flex flex-col ">

      {/* Header */}
      <div className="h-14 px-4 border-b border-gray-800 flex items-center justify-between ">

        <div className="flex items-center gap-2">
          <Code2
            size={19}
            className="text-blue-500"
          />

          <span className="font-semibold">
            Preview
          </span>
        </div>

        <div className="flex items-center gap-1">

          <button
            onClick={runCode}
            title="Run"
            className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition"
          >
            <Play size={17} />
          </button>

          <button
            onClick={refreshPreview}
            title="Refresh"
            className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition"
          >
            <RotateCcw size={17} />
          </button>

          <button
            title="Fullscreen"
            className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition"
          >
            <Maximize2 size={17} />
          </button>

          <button
            onClick={() => setIsOpen(false)}
            title="Close"
            className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition"
          >
            <X size={19} />
          </button>

        </div>
      </div>

      {/* Main Tabs */}
      <div className="h-11 border-b border-gray-800 flex items-center px-3 gap-1">

        <button
          onClick={() => setActiveTab("preview")}
          className={`px-3 py-1.5 rounded-md text-sm ${
            activeTab === "preview"
              ? "bg-blue-600 text-white"
              : "text-gray-500 hover:text-gray-300"
          }`}
        >
          Preview
        </button>

        <button
          onClick={() => setActiveTab("code")}
          className={`px-3 py-1.5 rounded-md text-sm ${
            activeTab === "code"
              ? "bg-blue-600 text-white"
              : "text-gray-500 hover:text-gray-300"
          }`}
        >
          Code
        </button>

      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 ">

        {/* ================= PREVIEW ================= */}

        {activeTab === "preview" && (
          <iframe
            ref={iframeRef}
            title="Code Preview"
            srcDoc={output}
            sandbox="allow-scripts"
            className="w-full h-full bg-white border-0"
          />
        )}

        {/* ================= CODE ================= */}

        {activeTab === "code" && (
          <div className="h-full flex flex-col">

            {/* File Tabs */}
            <div className="h-10 flex items-center border-b border-gray-800 bg-[#0d0f14] overflow-x-auto">

              {files.map((file) => (
                <button
                  key={file.name}
                  onClick={() => setActiveFile(file.name)}
                  className={`px-4 h-full text-xs font-mono whitespace-nowrap border-r border-gray-800 transition ${
                    activeFile === file.name
                      ? "bg-blue-600 text-white"
                      : "text-gray-500 hover:text-gray-300 hover:bg-gray-900"
                  }`}
                >
                  {file.name}
                </button>
              ))}

            </div>

            {/* Selected File */}
            <div className="flex-1 min-h-0 overflow-auto overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-800 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-gray-700">

              <pre className="min-h-full p-4 bg-[#0d0f14] text-sm text-gray-300 font-mono whitespace-pre-wrap">
                {selectedFile?.content ||
                  "// No code available"}
              </pre>

            </div>

          </div>
        )}

      </div>

      {/* Footer */}
      <div className="h-14 border-t border-gray-800 px-4 flex items-center justify-between">

        <span className="text-xs text-gray-500">
          {files.length > 0
            ? `${files.length} files`
            : "Live Preview"}
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