import React, { useEffect, useRef, useState } from "react";
import {
  X,
  Play,
  Maximize2,
  Code2,
  Monitor,
  Copy,
  Check,
} from "lucide-react";
import { useSelector } from "react-redux";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function PreviewBar() {
  const { codePreview = [] } = useSelector((state) => state.message);

  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("preview");
  const [activeFile, setActiveFile] = useState("index.html");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const iframeRef = useRef(null);

  // ==========================================
  // Latest generated code
  // ==========================================

  const latestCode =
    codePreview.length > 0
      ? codePreview[codePreview.length - 1]
      : null;

  const files = latestCode?.files || [];

  // ==========================================
  // Find important files
  // ==========================================

  const htmlFile = files.find(
    (file) => file.name?.toLowerCase() === "index.html"
  );

  const cssFile = files.find(
    (file) => file.name?.toLowerCase() === "style.css"
  );

  const jsFile = files.find(
    (file) => file.name?.toLowerCase() === "script.js"
  );

  // ==========================================
  // Get language from file extension
  // ==========================================

  const getLanguage = (fileName = "") => {
    const extension = fileName
      .split(".")
      .pop()
      ?.toLowerCase();

    const languages = {
      // Web
      html: "html",
      htm: "html",
      css: "css",
      scss: "scss",
      sass: "scss",
      less: "less",

      // JavaScript
      js: "javascript",
      mjs: "javascript",
      cjs: "javascript",
      jsx: "jsx",

      // TypeScript
      ts: "typescript",
      tsx: "tsx",

      // Python
      py: "python",
      pyw: "python",

      // C
      c: "c",
      h: "c",

      // C++
      cpp: "cpp",
      cc: "cpp",
      cxx: "cpp",
      hpp: "cpp",
      hh: "cpp",

      // Java
      java: "java",

      // Kotlin
      kt: "kotlin",
      kts: "kotlin",

      // C#
      cs: "csharp",

      // Go
      go: "go",

      // Rust
      rs: "rust",

      // PHP
      php: "php",

      // Ruby
      rb: "ruby",

      // Swift
      swift: "swift",

      // Dart
      dart: "dart",

      // Shell
      sh: "bash",
      bash: "bash",
      zsh: "bash",

      // SQL
      sql: "sql",

      // Data
      json: "json",
      yaml: "yaml",
      yml: "yaml",
      xml: "markup",

      // Markdown
      md: "markdown",
      markdown: "markdown",

      // Other languages
      r: "r",
      lua: "lua",
      perl: "perl",
      pl: "perl",
      groovy: "groovy",
      scala: "scala",
      clojure: "clojure",
      haskell: "haskell",
      hs: "haskell",
      objectivec: "objectivec",
      m: "objectivec",

      // GraphQL
      graphql: "graphql",
      gql: "graphql",
    };

    return languages[extension] || "text";
  };

  // ==========================================
  // Generate preview HTML
  // ==========================================

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
            margin:0;
            font-family:Arial;
          ">
            <div style="text-align:center">
              <h3>No code available</h3>
              <p>Generate some code to see the preview.</p>
            </div>
          </body>
        </html>
      `;
    }

    let html = htmlFile.content;

    // ==========================================
    // Remove external CSS reference
    // ==========================================

    html = html.replace(
      /<link[^>]+href=["']style\.css["'][^>]*>/gi,
      ""
    );

    // ==========================================
    // Remove external JS reference
    // ==========================================

    html = html.replace(
      /<script[^>]+src=["']script\.js["'][^>]*><\/script>/gi,
      ""
    );

    // ==========================================
    // Inject CSS
    // ==========================================

    if (cssFile?.content) {
      if (html.includes("</head>")) {
        html = html.replace(
          "</head>",
          `
<style>
${cssFile.content}
</style>
</head>
`
        );
      } else {
        html = `
<style>
${cssFile.content}
</style>
${html}
`;
      }
    }

    // ==========================================
    // Inject JavaScript
    // ==========================================

    if (jsFile?.content) {
      if (html.includes("</body>")) {
        html = html.replace(
          "</body>",
          `
<script>
${jsFile.content}
</script>
</body>
`
        );
      } else {
        html += `
<script>
${jsFile.content}
</script>
`;
      }
    }

    return html;
  };

  // ==========================================
  // Run code
  // ==========================================

  const runCode = () => {
    const preview = generatePreview();

    setOutput(preview);

    if (iframeRef.current) {
      iframeRef.current.srcdoc = preview;
    }
  };

  // ==========================================
  // Automatically update preview
  // ==========================================

  useEffect(() => {
    if (files.length > 0) {
      const preview = generatePreview();

      setOutput(preview);
    }
  }, [codePreview]);

  // ==========================================
  // Refresh preview
  // ==========================================

  const refreshPreview = () => {
    const iframe = iframeRef.current;

    if (!iframe) return;

    const current = iframe.srcdoc;

    iframe.srcdoc = "";

    setTimeout(() => {
      iframe.srcdoc = current;
    }, 50);
  };

  // ==========================================
  // Copy selected file
  // ==========================================

  const copyCode = async () => {
    if (!selectedFile?.content) return;

    try {
      await navigator.clipboard.writeText(
        selectedFile.content
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  // ==========================================
  // Currently selected file
  // ==========================================

  const selectedFile =
    files.find((file) => file.name === activeFile) ||
    files[0];

  // ==========================================
  // Closed preview bar
  // ==========================================

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

  // ==========================================
  // No generated code
  // ==========================================

  if (!codePreview.length) {
    return null;
  }

  return (
    <aside className="w-112.5 h-screen bg-[#111318] border-l border-gray-800 text-white flex flex-col">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="h-14 px-4 border-b border-gray-800 flex items-center justify-between shrink-0">

        <div className="flex items-center gap-2 min-w-0">

          <Code2
            size={19}
            className="text-blue-500 shrink-0"
          />

          <span className="font-semibold truncate">
            {latestCode?.title || "Code Preview"}
          </span>

        </div>

        <div className="flex items-center gap-1">

          {/* Preview button */}

          <button
            onClick={() => setActiveTab("preview")}
            className={`px-3 py-1.5 rounded-md text-sm transition ${
              activeTab === "preview"
                ? "bg-blue-600 text-white"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            Preview
          </button>

          {/* Code button */}

          <button
            onClick={() => setActiveTab("code")}
            className={`px-3 py-1.5 rounded-md text-sm transition ${
              activeTab === "code"
                ? "bg-blue-600 text-white"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            Code
          </button>

          {/* Close */}

          <button
            onClick={() => setIsOpen(false)}
            title="Close"
            className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition"
          >
            <X size={19} />
          </button>

        </div>
      </div>


      {/* ==========================================
          CONTENT
      ========================================== */}

      <div className="flex-1 min-h-0 overflow-hidden">

        {/* ==========================================
            PREVIEW
        ========================================== */}

        {activeTab === "preview" && (
          <div className="relative w-full h-full bg-white">

            <iframe
              ref={iframeRef}
              title="Code Preview"
              srcDoc={output}
              sandbox="allow-scripts allow-forms"
              className="w-full h-full border-0"
            />

          </div>
        )}


        {/* ==========================================
            CODE
        ========================================== */}

        {activeTab === "code" && (
          <div className="h-full flex flex-col">

            {/* ==========================================
                FILE TABS
            ========================================== */}

            <div className="h-11 flex items-center border-b border-gray-800 bg-[#0d0f14] overflow-x-auto shrink-0">

              {files.map((file) => (
                <button
                  key={file.name}
                  onClick={() =>
                    setActiveFile(file.name)
                  }
                  className={`px-4 h-full text-xs font-mono whitespace-nowrap border-r border-gray-800 transition ${
                    activeFile === file.name
                      ? "bg-[#1e293b] text-white border-t-2 border-t-blue-500"
                      : "text-gray-500 hover:text-gray-300 hover:bg-gray-900"
                  }`}
                >
                  {file.name}
                </button>
              ))}

            </div>


            {/* ==========================================
                CODE HEADER
            ========================================== */}

            <div className="h-10 px-4 flex items-center justify-between bg-[#0d0f14] border-b border-gray-800 shrink-0">

              <div className="flex items-center gap-2">

                <span className="text-xs text-gray-500 font-mono">
                  {selectedFile?.name || "code"}
                </span>

                <span className="text-[10px] px-2 py-0.5 rounded bg-gray-800 text-gray-400 uppercase">
                  {getLanguage(selectedFile?.name)}
                </span>

              </div>


              {/* Copy button */}

              <button
                onClick={copyCode}
                className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs text-gray-400 hover:text-white hover:bg-gray-800 transition"
                title="Copy code"
              >

                {copied ? (
                  <>
                    <Check size={14} />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    Copy
                  </>
                )}

              </button>

            </div>


            {/* ==========================================
                SYNTAX HIGHLIGHTED CODE
            ========================================== */}

            <div className="flex-1 min-h-0 overflow-auto bg-[#0d1117] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-700 [&::-webkit-scrollbar-thumb]:rounded-full">

              {selectedFile?.content ? (

                <SyntaxHighlighter
                  language={getLanguage(
                    selectedFile.name
                  )}
                  style={oneDark}
                  showLineNumbers={true}
                  wrapLongLines={false}
                  customStyle={{
                    margin: 0,
                    minHeight: "100%",
                    background: "#0d1117",
                    fontSize: "13px",
                    lineHeight: "1.6",
                    padding: "16px 0",
                  }}
                  codeTagProps={{
                    style: {
                      fontFamily:
                        "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    },
                  }}
                  lineNumberStyle={{
                    minWidth: "45px",
                    paddingRight: "16px",
                    paddingLeft: "12px",
                    color: "#4b5563",
                    userSelect: "none",
                    textAlign: "right",
                  }}
                >
                  {selectedFile.content}
                </SyntaxHighlighter>

              ) : (

                <div className="p-5 text-gray-500 font-mono text-sm">
                  // No code available
                </div>

              )}

            </div>

          </div>
        )}

      </div>


      {/* ==========================================
          FOOTER
      ========================================== */}

      <div className="h-14 border-t border-gray-800 px-4 flex items-center justify-between shrink-0">

        <span className="text-xs text-gray-500">
          {files.length > 0
            ? `${files.length} files`
            : "Live Preview"}
        </span>

        <div className="flex items-center gap-2">

          {/* Refresh */}

          {activeTab === "preview" && (
            <button
              onClick={refreshPreview}
              title="Refresh Preview"
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
            >
              <Maximize2 size={16} />
            </button>
          )}

          {/* Run */}

          <button
            onClick={runCode}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition"
          >
            <Play size={15} />
            Run
          </button>

        </div>

      </div>

    </aside>
  );
}

export default PreviewBar;