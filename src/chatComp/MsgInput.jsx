import React, { useContext, useState } from "react";
import Add from "../images/addImg1.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebas";
import { v4 as uuid } from "uuid";

const MsgInput = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const formData = new FormData();
      formData.append("file", img);
      formData.append("upload_preset", "chatUnsigned");
      formData.append("cloud_name", "dhr1pt52b");

      try {
        const res = await fetch("https://api.cloudinary.com/v1_1/dhr1pt52b/image/upload", {
          method: "POST",
          body: formData,
        });

        const cloudData = await res.json();

        const messageObj = {
          id: uuid(),
          senderId: currentUser.uid,
          date: Timestamp.now(),
          img: cloudData.secure_url || cloudData.url,
        };

        if (text.trim() !== "") {
          messageObj.text = text;
        }

        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion(messageObj),
        });
      } catch (err) {
        console.error("Image upload failed:", err);
      }
    } else if (text.trim() !== "") {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    if (text.trim() !== "" || img) {
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text: text || "Image",
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text: text || "Image",
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
    }

    setText("");
    setImg(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      <div className="msgInputContainer">
        
        {img && (
          <div className="imageSelectedNotice">
            <p>📷 Image Selected</p>
          </div>
        )}

        <div className="sendMsgInput">
          <input
            type="text"
            placeholder="type something . . ."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="send">
          <button className="clip-svg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-paperclip" viewBox="0 0 16 16">
              <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z"></path>
            </svg>
          </button>

          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            onChange={(e) => setImg(e.target.files[0])}
          />
          
          <label htmlFor="file">
            <img className="sendImg" src={Add} alt="img" />
          </label>

          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </>
  );
};

export default MsgInput;
