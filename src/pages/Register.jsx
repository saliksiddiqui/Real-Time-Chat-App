import React, {useState} from 'react';
import Add from '../images/addImg1.png';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebas";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Cloudinary upload function
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "chatUnsigned"); 
    formData.append("cloud_name", "dhr1pt52b"); 

    const response = await fetch("https://api.cloudinary.com/v1_1/dhr1pt52b/image/upload", {
      method: "POST",
      body: formData,
    });

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
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      // Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // ✅ Upload avatar to Cloudinary
      const imageUrl = await uploadToCloudinary(file);

      // ✅ Update Firebase Auth profile
      await updateProfile(res.user, {
        displayName,
        photoURL: imageUrl,
      });

      // ✅ Save user info to Firestore
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
      console.error("Upload error:", err);
      console.error(err);
      setErr(true);
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
            <input type="text" id='name' name='name' required placeholder="Enter Name" />
            <label htmlFor="email"></label>
            <input type="email" id='email' name='email' required placeholder="Enter Email" />
            <label htmlFor="password"></label>
            <input type="password" id='password' name='password' required placeholder="Enter Password" />

            <div className="imageInput">
              <input
                type="file"
                style={{ display: "none" }}
                name="imageInput"
                id="file"
              />
              <label htmlFor="file">
                <img className="image" src={Add} alt="inputImage"/>
                <span>Add Image</span>
              </label>
            </div>
            <button>Register</button>
            {loading && <span>Please wait...</span>}
          {err && <span>Something went wrong</span>}
          </form>
          <span className="forLoginText">Already have an account?<Link to='/login'>Login</Link></span>
        </div>
      </div>
    </>
  );
};

export default Register;
