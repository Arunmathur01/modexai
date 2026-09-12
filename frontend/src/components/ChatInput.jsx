import React from 'react'
import { useState } from 'react';
import { Zap,MessageCircle,Search,Image,FileText,Presentation,Code,Paperclip,Mic,Send } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import sendMessage from '../features/sendMessage';
import { addmessage } from '../redux/messageSlice';
const ChatInput = () => {
  const [value,setValue]=useState("")
const { selectedConversation } = useSelector(state => state.conversation)
const {message}=useSelector(state=>state.message)
const dispatch=useDispatch()
const handlesendMessage = async (e) => {
  e.preventDefault();

  if (!value.trim()) return;

  const payload = {
    prompt: value.trim(),
    conversationId: selectedConversation?._id
  };
  dispatch(addmessage({role:"user",content:value.trim()}))
  setValue("")

  const data = await sendMessage(payload);
 dispatch(addmessage({role:"assistant",content:data}))
  console.log(data);
};
  return (
    <div>
         <div className="w-full border-t border-gray-800 bg-[#111318] px-4 py-4">
           
            <div className="max-w-4xl mx-auto">
      
              {/* Quick Agent Options */}
              <div className="flex items-center gap-2 mb-3 overflow-x-auto">
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-sm text-gray-300 whitespace-nowrap">
                  <Zap size={16} />
                 Auto
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-800 text-sm text-gray-400 hover:text-white whitespace-nowrap">
                  <MessageCircle size={16} />
                  Chat
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-800 text-sm text-gray-400 hover:text-white whitespace-nowrap">
                   <Search size={16} />
                  Search
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
                onSubmit={handlesendMessage}
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
                 
                 onChange={(e)=>{setValue(e.target.value)}}
                 value={value}
                  placeholder="Ask anything..."
                  rows={1}
                  className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none resize-none px-2 py-2.5 max-h-32 overflow-y-auto  [scrollbar-none] [&::-webkit-scrollbar]:hidden"
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
                disabled={!value.trim()}
                  type="submit"
                 
                  className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500 text-white transition"

                >
                  <Send size={20} />
                </button>
              </form>
      
      
            </div>
          </div>
    </div>
   
  )
}

export default ChatInput
