import React from 'react'
import { useState } from 'react';
import { Zap,MessageCircle,Search,Image,FileText,Presentation,Code,Paperclip,Mic,Send } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import sendMessage from '../features/sendMessage';
import { addmessage } from '../redux/messageSlice';
import { createConversation } from '../features/createConversation';
import { addconversation, SetselectedConversation, setupdateConversation } from '../redux/conversationSlice';
import { updateConversation } from '../features/updateConversation';
const ChatInput = () => {

  const [selectedAgent,setselectedAgent]=useState("Auto")
  
  const [value,setValue]=useState("")
const { selectedConversation } = useSelector(state => state.conversation)
const {message}=useSelector(state=>state.message)
const dispatch=useDispatch()
const handlesendMessage = async (e) => {
  e.preventDefault();
let conversation=selectedConversation
 if(!conversation){ 
      const conv=await createConversation()
    dispatch(SetselectedConversation(conv))
dispatch(addconversation(conv))
    conversation=conv
    }

    if(conversation.title=="New Chat"){
      await updateConversation({id:conversation?._id,title:value.trim()})
      dispatch(setupdateConversation({conversationId:conversation?._id,title:value.trim()}))
    }
 

  const payload = {
    prompt: value.trim(),
    conversationId: conversation?._id,agent:selectedAgent.toLowerCase()
  };
  dispatch(addmessage({role:"user",content:value.trim()}))
  setValue("")

  const data = await sendMessage(payload);
 dispatch(addmessage({role:"assistant",content:data.answer,images:data.images}))
  console.log(data);
};

const agents = [
  { name: "Auto", icon: Zap },
  { name: "Chat", icon: MessageCircle },
  { name: "Search", icon: Search },
  { name: "Image", icon: Image },// in backend there is image not image 
  { name: "PDF", icon: FileText },
  { name: "PPT", icon: Presentation },
  { name: "Coding", icon: Code },
];
  return (
    <div>
         <div className="w-full border-t border-gray-800 bg-[#111318] px-4 py-4">
           
            <div className="max-w-4xl mx-auto">
      
              {/* Quick Agent Options */}
            <div className="flex items-center gap-2 mb-3 overflow-x-auto scrollbar-hide">
  {agents.map((agent) => {
    const Icon = agent.icon;
    const isSelected = selectedAgent === agent.name;

    return (
      <button
        key={agent.name}
        onClick={() => setselectedAgent(agent.name)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition ${
          isSelected
            ? "bg-blue-600 text-white"
            : "text-gray-400 hover:bg-gray-800 hover:text-white"
        }`}
      >
        <Icon size={16} />
        {agent.name}
      </button>
    );
  })}
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
