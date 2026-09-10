import { MessageSquare } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'

const ChatNav = () => {

    const {selectedConversation }= useSelector(state=>state.conversation)
    const {message}=useSelector(state=>state.message)

  return (
   <>

   {selectedConversation&&
   <div className="h-14 px-4 border-b border-gray-800 flex items-center justify-center">

  {/* Selected Conversation */}
  <div className="flex items-center gap-1 min-w-0">

    {/* Message Icon */}
    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
      <MessageSquare
        size={15}
        className="text-gray-400"
      />
    </div>

    {/* Conversation Title */}
    <span className="text-sm font-medium text-gray-200 truncate">
      {selectedConversation?.title || "New Chat"}
    </span>

  </div>

  {/* Message Count */}
  <span className=" h-5 px-1.5 flex items-center justify-center rounded-full bg-gray-800 text-xs text-gray-400">
    {message?.length || 0}
  </span>

</div> }
   {/* Chat Navbar */}

   </>
   
  )
}

export default ChatNav;
