import React, { useContext, useEffect, useRef } from "react";
import Message from "./Message";
import MsgInput from "./MsgInput";
import { ChatContext } from "../context/ChatContext";
import Messages from "./Messages";

const Chat = ({ showSidebar, setShowSidebar }) => {
  const { data } = useContext(ChatContext);



  return (
    <div className="chat">
      {!showSidebar && (
        <div className="showChatButtonContainer">
          <button className="showSidebarBtn" onClick={() => setShowSidebar(true)}>
            Show Chats
          </button>
        </div>
      )}

      <div className="messageNav">
        {data.user?.displayName && <div className="chatUserName">{data.user?.displayName}</div>}
              <div className="tools">
          <button><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-camera-video-fill" viewBox="0 0 16 16" id="IconChangeColor"> <path fillRule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z" ></path> </svg></button>

          <button><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" fill="currentColor" className="bi bi-telephone-forward-fill" viewBox="0 0 16 16"> <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zm10.761.135a.5.5 0 0 1 .708 0l2.5 2.5a.5.5 0 0 1 0 .708l-2.5 2.5a.5.5 0 0 1-.708-.708L14.293 4H9.5a.5.5 0 0 1 0-1h4.793l-1.647-1.646a.5.5 0 0 1 0-.708z"></path> </svg></button>

          <button><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="20" width="20" fill="currentColor" ><path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"></path></svg></button>
        </div>
      </div>

      <div className="message-comp">
        {data.messages?.map((msg) => (
          <Messages key={msg.id} message={msg} />
        ))}
      </div>

      <MsgInput />
      <Message />
    </div>
  );
};

export default Chat;
