import React, { useEffect, useState } from "react";

const loadingWords = [
  "Thinking...",
  "Analyzing...",
  "Processing...",
  "Generating...",
  "Almost done...",
];

const AILoader = () => {
  const [currentWord, setCurrentWord] = useState(
    loadingWords[0]
  );

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % loadingWords.length;
      setCurrentWord(loadingWords[index]);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-start gap-3 px-4 py-3">

      {/* AI Avatar */}
      <div
        className="
          w-8
          h-8
          rounded-full
          bg-blue-600/10
          border
          border-blue-500/20
          flex
          items-center
          justify-center
          shrink-0
        "
      >
        <span className="text-blue-400 text-xs font-bold">
          AI
        </span>
      </div>

      {/* Loader */}
      <div
        className="
          flex
          items-center
          gap-3
          px-4
          py-3
          rounded-2xl
          rounded-tl-md
          bg-[#191b22]
          border
          border-gray-800
        "
      >
        {/* Animated dots */}
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
        </div>

        {/* Changing word */}
        <span className="text-sm text-gray-400 min-w-22.5">
          {currentWord}
        </span>
      </div>
    </div>
  );
};

export default AILoader;