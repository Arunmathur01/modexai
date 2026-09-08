import React, { useState } from "react";
import {
  Send,
  Paperclip,
  Mic,
  Plus,
  Image,
  FileText,
  Presentation,
  Code,
} from "lucide-react";

function ChatBar() {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    console.log("User message:", message);

    // Send message to your backend here
    setMessage("");
  };

  return (
    <div className="w-full border-t border-gray-800 bg-[#111318] px-4 py-4">
      <div className="max-w-4xl mx-auto">

        {/* Quick Agent Options */}
        <div className="flex items-center gap-2 mb-3 overflow-x-auto">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-sm text-gray-300 whitespace-nowrap">
            <Plus size={16} />
            New
          </button>

          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-800 text-sm text-gray-400 hover:text-white whitespace-nowrap">
            <Image size={16} />
            Image
          </button>

          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-800 text-sm text-gray-400 hover:text-white whitespace-nowrap">
            <FileText size={16} />
            PDF
          </button>

          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-800 text-sm text-gray-400 hover:text-white whitespace-nowrap">
            <Presentation size={16} />
            PPT
          </button>

          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-800 text-sm text-gray-400 hover:text-white whitespace-nowrap">
            <Code size={16} />
            Code
          </button>
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex items-end gap-2 bg-[#191b22] border border-gray-700 rounded-2xl p-2 focus-within:border-gray-500 transition"
        >
          {/* Attachment */}
          <button
            type="button"
            className="p-2.5 rounded-xl hover:bg-gray-800 text-gray-400 hover:text-white transition"
          >
            <Paperclip size={20} />
          </button>

          {/* Textarea */}
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Ask anything..."
            rows={1}
            className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none resize-none px-2 py-2.5 max-h-32"
          />

          {/* Mic */}
          <button
            type="button"
            className="p-2.5 rounded-xl hover:bg-gray-800 text-gray-400 hover:text-white transition"
          >
            <Mic size={20} />
          </button>

          {/* Send */}
          <button
            type="submit"
            disabled={!message.trim()}
            className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500 text-white transition"
          >
            <Send size={20} />
          </button>
        </form>


      </div>
    </div>
  );
}

export default ChatBar;