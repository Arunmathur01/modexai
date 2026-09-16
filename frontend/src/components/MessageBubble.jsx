import React, { useState } from "react";
import Markdown from "react-markdown";
import { X, ExternalLink, Copy, Check } from "lucide-react";
import remarkGfm from "remark-gfm";

const MessageBubble = ({ role, content, images }) => {
  const isUser = role === "user";
  const [previewImage, setPreviewImage] = useState(null);

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`w-fit max-w-[92vw] md:max-w-[72%] px-4 py-3 rounded-2xl wrap-break-word overflow-hidden leading-relaxed ${
          isUser
            ? "bg-linear-to-br from-indigo-500 to-violet-700 text-white rounded-tr-sm"
            : "bg-transparent  text-slate-200 rounded-tl-sm"
        }`}
      >
        {/* ================= IMAGES ================= */}
        {images?.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-4">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Generated ${i + 1}`}
                onClick={() => setPreviewImage(img)}
                className="w-40 h-28 rounded-xl object-cover border border-white/10 cursor-zoom-in hover:opacity-90 hover:scale-[1.02] transition"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ))}
          </div>
        )}

        {/* ================= MARKDOWN ================= */}
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            /* ---------- HEADINGS ---------- */

            h1: ({ children }) => (
              <h1 className="text-2xl md:text-3xl font-bold text-white mt-5 mb-4 tracking-tight">
                {children}
              </h1>
            ),

            h2: ({ children }) => (
              <h2 className="text-xl md:text-2xl font-bold text-white mt-5 mb-3">
                {children}
              </h2>
            ),

            h3: ({ children }) => (
              <h3 className="text-lg md:text-xl font-semibold text-white mt-4 mb-2">
                {children}
              </h3>
            ),

            h4: ({ children }) => (
              <h4 className="text-base font-semibold text-slate-100 mt-3 mb-2">
                {children}
              </h4>
            ),

            /* ---------- PARAGRAPH ---------- */

            p: ({ children }) => (
              <p className="text-[14px] md:text-[15px] text-white leading-7 mb-3 last:mb-0">
                {children}
              </p>
            ),

            /* ---------- LINKS ---------- */

            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 underline underline-offset-2 transition"
              >
                {children}
                <ExternalLink size={13} />
              </a>
            ),

            /* ---------- BOLD ---------- */

            strong: ({ children }) => (
              <strong className="font-semibold text-white">
                {children}
              </strong>
            ),

            /* ---------- ITALIC ---------- */

            em: ({ children }) => (
              <em className="italic text-slate-300">
                {children}
              </em>
            ),

            /* ---------- UNORDERED LIST ---------- */

            ul: ({ children }) => (
              <ul className="list-disc pl-6 my-3 space-y-1.5 text-slate-300">
                {children}
              </ul>
            ),

            /* ---------- ORDERED LIST ---------- */

            ol: ({ children }) => (
              <ol className="list-decimal pl-6 my-3 space-y-1.5 text-slate-300">
                {children}
              </ol>
            ),

            /* ---------- LIST ITEM ---------- */

            li: ({ children }) => (
              <li className="pl-1 text-[14px] md:text-[15px] leading-6">
                {children}
              </li>
            ),

            /* ---------- BLOCKQUOTE ---------- */

            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-blue-500 bg-blue-500/5 pl-4 pr-3 py-2 my-4 rounded-r-lg text-slate-400 italic">
                {children}
              </blockquote>
            ),

            /* ---------- HORIZONTAL LINE ---------- */

            hr: () => (
              <hr className="my-5 border-gray-700/60" />
            ),

            /* ---------- INLINE CODE + CODE BLOCK ---------- */

            code: ({ inline, className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || "");

              // Code block
              if (match) {
                const code = String(children).replace(/\n$/, "");

                return (
                  <CodeBlock
                    language={match[1]}
                    code={code}
                    className={className}
                    props={props}
                  />
                );
              }

              // Inline code
              return (
                <code
                  className="px-1.5 py-0.5 mx-0.5 rounded-md bg-black/30 border border-white/10 text-blue-300 text-[13px]"
                  {...props}
                >
                  {children}
                </code>
              );
            },

            /* ---------- PRE ---------- */

            pre: ({ children }) => (
              <div className="overflow-x-auto">
                {children}
              </div>
            ),

            /* ---------- TABLE ---------- */

            table: ({ children }) => (
              <div className="w-full overflow-x-auto my-4 rounded-xl border border-white/10">
                <table className="w-full min-w-125 border-collapse text-sm">
                  {children}
                </table>
              </div>
            ),

            thead: ({ children }) => (
              <thead className="bg-white/6 text-white">
                {children}
              </thead>
            ),

            tbody: ({ children }) => (
              <tbody className="divide-y divide-white/10">
                {children}
              </tbody>
            ),

            tr: ({ children }) => (
              <tr className="hover:bg-white/3 transition">
                {children}
              </tr>
            ),

            th: ({ children }) => (
              <th className="px-4 py-3 text-left font-semibold text-slate-200 border-r border-white/10 last:border-r-0">
                {children}
              </th>
            ),

            td: ({ children }) => (
              <td className="px-4 py-3 text-slate-300 border-r border-white/10 last:border-r-0">
                {children}
              </td>
            ),

            /* ---------- IMAGE FROM MARKDOWN ---------- */

            img: ({ src, alt }) => (
              <img
                src={src}
                alt={alt || "Image"}
                onClick={() => setPreviewImage(src)}
                loading="lazy"
                className="max-w-full max-h-125 my-4 rounded-xl border border-white/10 object-contain cursor-zoom-in hover:opacity-90 transition"
              />
            ),

            /* ---------- DEL ---------- */

            del: ({ children }) => (
              <del className="text-gray-500">
                {children}
              </del>
            ),
          }}
        >
          {typeof content === "string" ? content : ""}
        </Markdown>
      </div>

      {/* ================= IMAGE PREVIEW ================= */}

      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setPreviewImage(null)}
        >
          <button
            onClick={() => setPreviewImage(null)}
            className="absolute top-5 right-5 p-2 rounded-full bg-black/60 text-white hover:bg-white/20 transition"
          >
            <X size={24} />
          </button>

          <img
            src={previewImage}
            alt="Preview"
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};


/* =====================================================
   CODE BLOCK
   Only this component is added for Copy functionality
===================================================== */

const CodeBlock = ({ language, code, className, props }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <div className="my-4 overflow-hidden rounded-xl border border-white/10 bg-[#0d1117]">

      {/* Code Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/3">

        {/* Language */}
        <span className="text-xs font-medium text-gray-400 uppercase">
          {language}
        </span>

        {/* Copy */}
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs text-gray-400 hover:text-white hover:bg-white/10 transition"
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

      {/* Code */}
      <pre className="overflow-x-auto p-4 text-[13px] leading-6 text-gray-200">
        <code className={className} {...props}>
          {code}
        </code>
      </pre>

    </div>
  );
};

export default MessageBubble;