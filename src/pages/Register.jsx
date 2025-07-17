import React, { useState } from "react";
import Add from "../images/addImg1.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebas";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "chatUnsigned");
    formData.append("cloud_name", "dhr1pt52b");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dhr1pt52b/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    console.log("Cloudinary response:", data);

    if (data.secure_url) {
      return data.secure_url;
    } else {
      throw new Error("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(""); 
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    if (!file) {
    setErrorMsg("Please add a profile picture.");
    setLoading(false);
    return;
  }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);


      const imageUrl = await uploadToCloudinary(file);

  
      await updateProfile(res.user, {
        displayName,
        photoURL: imageUrl,
      });

    
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        displayNameLower: displayName.toLowerCase(),
        email,
        photoURL: imageUrl,
      });

      await setDoc(doc(db, "userChats", res.user.uid), {});

      navigate("/");
    } catch (err) {

      if (err.code === "auth/email-already-in-use") {
        setErrorMsg("Email is already registered.");
      } else if (err.code === "auth/weak-password") {
        setErrorMsg("Password should be at least 6 characters.");
      } else if (err.code === "auth/invalid-email") {
        setErrorMsg("Invalid email address.");
      } else {
        setErrorMsg("Something went wrong. Please try again.");
      }

      setLoading(false);
    }
  };

  return (
    <>
      <div className="register-container">
        <div className="register-box">
          <form onSubmit={handleSubmit} className="register-form">
            <h1 className="appName">SChat App</h1>

            <label htmlFor="name"></label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Enter Name"
            />
            <label htmlFor="email"></label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter Email"
            />
            <label htmlFor="password"></label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Enter Password"
            />

            <div className="imageInput">
              <input
                type="file"
                style={{ display: "none" }}
                name="imageInput"
                id="file"
              />
              <label htmlFor="file">
                <img className="image" src={Add} alt="inputImage" />
                <span>Add Display Picture</span>
              </label>
            </div>
            <button>Register</button>
            {loading && <span>Please wait<span className="dots">.</span></span>}
            {errorMsg && <span className="error">{errorMsg}</span>}
          </form>
          <span className="forLoginText">
            Already have an account?<Link to="/login">Login</Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Register;
