import React, { useContext, useEffect } from 'react';
import { ChatContext } from '../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebas';

const Message = () => {
  const { data, dispatch } = useContext(ChatContext);

  useEffect(() => {
    if (!data.chatId || data.chatId === "null") return;

    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && dispatch({ type: "SET_MESSAGES", payload: doc.data().messages });
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return null;
};

export default Message;
