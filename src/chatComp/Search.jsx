import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebas";
import { AuthContext } from "../context/AuthContext";
const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    if (e.key.toLowerCase() === "enter" || e.key.toLowerCase() === "go" || e.key.toLowerCase() === "search") {
    handleSearch();
  }
  };

  const handleSelect = async () => {
  const combinedId =
    currentUser.uid > user.uid
      ? currentUser.uid + user.uid
      : user.uid + currentUser.uid;

  try {
    const res = await getDoc(doc(db, "chats", combinedId));

    if (!res.exists()) {
      await setDoc(doc(db, "chats", combinedId), { messages: [] });
    }

    const currentUserChatsRef = doc(db, "userChats", currentUser.uid);
    const otherUserChatsRef = doc(db, "userChats", user.uid);

    // Check & create userChats for current user if missing
    const currentUserChatsSnap = await getDoc(currentUserChatsRef);
    if (!currentUserChatsSnap.exists()) {
      await setDoc(currentUserChatsRef, {});
    }

    // Check & create userChats for searched user if missing
    const otherUserChatsSnap = await getDoc(otherUserChatsRef);
    if (!otherUserChatsSnap.exists()) {
      await setDoc(otherUserChatsRef, {});
    }

    // Now update safely
    await updateDoc(currentUserChatsRef, {
      [combinedId + ".userInfo"]: {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
      [combinedId + ".date"]: serverTimestamp(),
    });

    await updateDoc(otherUserChatsRef, {
      [combinedId + ".userInfo"]: {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
      },
      [combinedId + ".date"]: serverTimestamp(),
    });

  } catch (err) {
    console.error("Error adding chat:", err);
  }

  setUser(null);
  setUsername("");
};

  return (
    <>
      <div className="search">
         <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
        <div className="searchInput">
          <input
            type="text"
            placeholder="Search Contact"
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKey}
            value={username}
          />
        </div>
        </form>
        {err && <p>user not found</p>}
        {user && (
          <div className="chatUser" onClick={handleSelect}>
            <img className="cahtUserImg" src={user.photoURL} alt="image" />
            <div className="chatUserInfo">
              <span>{user.displayName}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
