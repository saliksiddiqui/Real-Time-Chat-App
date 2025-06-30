import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Messages = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <>
      <div className="messages">
  <div
    className={`chatMessage ${message.senderId === currentUser.uid ? "owner" : "receiver"}`}
    ref={ref}
  >
    <div className="messageInfo">
      <img
        src={
          message.senderId === currentUser.uid
            ? currentUser.photoURL
            : data.user.photoURL
        }
        alt="img"
      />
      <span>just now</span>
    </div>
    <div className={`messageContent ${message.senderId === currentUser.uid ? "ownerMsg" : "receiverMsg"}`}>
      <p>{message.text}</p>
      {message.img && <img src={message.img} alt="img" />}
    </div>
  </div>
</div>

    </>
  );
};

export default Messages;
