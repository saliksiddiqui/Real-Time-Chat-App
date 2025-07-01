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
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
  const q = query(
    collection(db, "users"),
    where("displayNameLower", "==", username.toLowerCase())
  );

  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      setUsers([]);
      setErr(true);
    } else {
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push(doc.data());
      });
      setUsers(results);
      setErr(false);
    }
  } catch (err) {
    console.error("Search Error:", err);
    setErr(true);
  }
};


  const handleKey = (e) => {
    if (
      e.key.toLowerCase() === "enter" ||
      e.key.toLowerCase() === "go" ||
      e.key.toLowerCase() === "search"
    ) {
      handleSearch();
    }
  };

  const handleSelect = async (selectedUser) => {
  const combinedId =
    currentUser.uid > selectedUser.uid
      ? currentUser.uid + selectedUser.uid
      : selectedUser.uid + currentUser.uid;

  try {
    const res = await getDoc(doc(db, "chats", combinedId));

    if (!res.exists()) {
      await setDoc(doc(db, "chats", combinedId), { messages: [] });
    }

    const currentUserChatsRef = doc(db, "userChats", currentUser.uid);
    const otherUserChatsRef = doc(db, "userChats", selectedUser.uid);

    const currentUserChatsSnap = await getDoc(currentUserChatsRef);
    if (!currentUserChatsSnap.exists()) {
      await setDoc(currentUserChatsRef, {});
    }

    const otherUserChatsSnap = await getDoc(otherUserChatsRef);
    if (!otherUserChatsSnap.exists()) {
      await setDoc(otherUserChatsRef, {});
    }

    await updateDoc(currentUserChatsRef, {
      [combinedId + ".userInfo"]: {
        uid: selectedUser.uid,
        displayName: selectedUser.displayName,
        photoURL: selectedUser.photoURL,
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

  setUsers([]);
  setUsername("");
};


  return (
    <>
      <div className="search">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
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
        
{users.length > 0 &&
  users.map((user) => (
    <div
      className="chatUser"
      key={user.uid}
      onClick={() => handleSelect(user)}
    >
      <img className="cahtUserImg" src={user.photoURL} alt="image" />
      <div className="chatUserInfo">
        <span>{user.displayName}</span>
      </div>
    </div>
))}
      </div>
    </>
  );
};

export default Search;
