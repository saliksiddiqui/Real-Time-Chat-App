import React, { useContext, useEffect, useState } from "react";
import { db } from "../firebas";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Contacts = ({ setShowSidebar }) => {
  const [chats, setChats] = useState({}); 

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
    if (window.innerWidth <= 768) {
      setShowSidebar(false);
    }
  };

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (docSnap) => {
        setChats(docSnap.data() || {}); 
      });

      return () => {
        unsub();
      };
    };

    currentUser?.uid && getChats();
  }, [currentUser?.uid]);

  return (
    <div className="contacts">
      {chats && Object.entries(chats)
        ?.sort((a, b) => b[1]?.date - a[1]?.date)
        .map(([key, chatData]) => (
          chatData?.userInfo && (
            <div
              className="userChat-comp"
              key={key}
              onClick={() => handleSelect(chatData.userInfo)}
            >
              <img
                className="cahtUserImg"
                src={chatData.userInfo.photoURL}
                alt="img"
              />
              <div className="contactInfo">
                <span>{chatData.userInfo.displayName}</span>
                <div className="latestMsg">{chatData.lastMessage?.text}</div>
              </div>
            </div>
          )
        ))}
    </div>
  );
};

export default Contacts;
