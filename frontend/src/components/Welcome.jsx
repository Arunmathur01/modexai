import {
  Sparkles,
  MessageSquare,
  Search,
  FileText,
  Presentation,
  Image,
  Code2,
  ArrowRight,
} from "lucide-react";

const Welcome=({ onStartConversation })=> {

   
  const features = [
    {
      icon: MessageSquare,
      title: "AI Chat",
      description: "Ask questions, brainstorm ideas and get intelligent answers.",
    },
    {
      icon: Search,
      title: "Web Search",
      description: "Find the latest information from across the web.",
    },
    {
      icon: FileText,
      title: "PDF Assistant",
      description: "Upload PDFs and ask questions about your documents.",
    },
    {
      icon: Presentation,
      title: "Create PPT",
      description: "Generate professional presentations with AI.",
    },
    {
      icon: Image,
      title: "Image Generation",
      description: "Turn your ideas into beautiful AI-generated images.",
    },
    {
      icon: Code2,
      title: "Coding",
      description: "Write, debug and understand code with your AI assistant.",
    },
  ];

  return (
    <div className="flex-1 min-h-0 overflow-y-auto [scrollbar-none] [&::-webkit-scrollbar]:hidden text-white">
      
      <div className="min-h-full flex flex-col items-center px-6 py-12 ">

        {/* Hero */}
        <div className="max-w-3xl text-center mt-8">

          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-6">
            <Sparkles
              size={28}
              className="text-blue-400"
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Welcome to{" "}Mode
            <span className="text-blue-500">
              X
            </span>AI
          </h1>

          <p className="mt-5 text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Your all-in-one AI workspace. Chat, search the web,
            analyze documents, create presentations, generate images,
            and write code — all in one place.
          </p>

          {/* Start Chat */}
          <button
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition font-medium"
        onClick={ onStartConversation }
         >
            Start a conversation
            <ArrowRight size={18} />
            
          </button>
        </div>

        {/* Features */}
        <div className="w-full max-w-5xl mt-16">

          <h2 className="text-center text-lg font-semibold text-gray-200">
            Everything you need
          </h2>

          <p className="text-center text-sm text-gray-500 mt-2">
            One AI platform for all your everyday tasks.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">

            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group p-5 rounded-2xl border border-gray-800 bg-gray-900/40 hover:bg-gray-900 hover:border-gray-700 transition"
                >
                  <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center mb-4 group-hover:bg-blue-500/10 transition">
                    <Icon
                      size={20}
                      className="text-gray-400 group-hover:text-blue-400 transition"
                    />
                  </div>

                  <h3 className="font-medium text-gray-200">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}

          </div>
        </div>

        {/* Example prompts */}
        <div className="w-full max-w-4xl mt-16">

          <h2 className="text-center text-lg font-semibold text-gray-200">
            Try asking ModeXAI
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">

            {[
              "Explain quantum computing in simple words",
              "Search the latest AI news",
              "Create a presentation about renewable energy",
              "Build a responsive React landing page",
            ].map((prompt) => (
              <button
                key={prompt}
                className="text-left px-4 py-3 rounded-xl border border-gray-800 bg-gray-900/30 text-sm text-gray-400 hover:text-white hover:bg-gray-900 hover:border-gray-700 transition"
              >
                <span className="text-gray-600 mr-2">→</span>
                {prompt}
              </button>
            ))}

          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pb-4 text-center">
          <p className="text-xs text-gray-600">
            ModeXAI • Your intelligent AI workspace
          </p>
        </div>

      </div>
    </div>
  );
}

export default Welcome;