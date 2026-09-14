import { useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import ChatNav from "./ChatNav";
import MessageList from "./MessageList";
import { useDispatch, useSelector } from "react-redux";
import { Setmessage } from "../redux/messageSlice";
import getMessages from "../features/getMessages";
import Welcome from "./Welcome";

function ChatBar({ showChat, setShowChat }) {
  const { selectedConversation } = useSelector(
    (state) => state.conversation
  );

  const dispatch = useDispatch();

  

  useEffect(() => {
    const getmes = async () => {
      if (selectedConversation) {
if(selectedConversation.title=="New Chat"){
  return;
}
        const data = await getMessages(selectedConversation._id);
        dispatch(Setmessage(data));
      }
    };

    getmes();
  }, [selectedConversation?._id, dispatch]);

  return (
    <div className="flex-1 min-h-0 flex flex-col">

      {selectedConversation || showChat ? (
        <>
          <ChatNav />

          <div className="flex-1 min-h-0 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-800 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-gray-700">
            <MessageList />
          </div>

          <ChatInput />
        </>
      ) : (
        <Welcome
          onStartConversation={() => setShowChat(true)}
        />
      )}

    </div>
  );
}

export default ChatBar;