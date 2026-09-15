import React from "react";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import { X } from "lucide-react";

const MessageBubble = ({ role, content, images }) => {
  const isUser = role === "user";
const [previewImage,setpreviewImage]=useState(null)
  console.log("CONTENT:", content);
  console.log("IMAGES:", images);

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`w-fit max-w-[92vw] md:max-w-[72%] px-4 py-2.5 rounded-2xl wrap-break-word overflow-hidden leading-relaxed ${
          isUser
            ? "bg-linear-to-br from-indigo-500 to-violet-700 text-white rounded-tr-sm"
            : "bg-white/4 border border-white/[0.07] text-slate-200 rounded-tl-sm"
        }`}
      >
        {/* Images */}
        {images?.length > 0 && (
          <div className="flex flex-wrap mt-4 gap-3">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={()=>{setpreviewImage(img)}}
                className="w-40 h-28 rounded-xl object-cover border border-white/10 cursor-zoom-in hover:opacity-90 transition"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.remove();
                }}
              />
            ))}
          </div>
        )}

        {/* Message */}
        <ReactMarkdown>
          {content}
        </ReactMarkdown>
      </div>
{previewImage && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
    onClick={() => setpreviewImage(null)}
  >
    <button
      onClick={() => setpreviewImage(null)}
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

export default MessageBubble;