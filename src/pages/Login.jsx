import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebas";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  // ✅ Cloudinary upload function
  // const uploadToCloudinary = async (file) => {
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("upload_preset", "chatUnsigned");
  //   formData.append("cloud_name", "dhr1pt52b");

  //   const response = await fetch(
  //     "https://api.cloudinary.com/v1_1/dhr1pt52b/image/upload",
  //     {
  //       method: "POST",
  //       body: formData,
  //     }
  //   );

  //   const data = await response.json();
  //   console.log("Cloudinary response:", data);

  //   if (data.secure_url) {
  //     return data.secure_url;
  //   } else {
  //     throw new Error("Image upload failed");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      console.error("Upload error:", err);
      console.error(err);
      setErr(true);
      // setLoading(false);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-box">
          <form className="login-form" onSubmit={handleSubmit}>
            <h1 className="appName">SChat App</h1>
            <label htmlFor="email"></label>
            <input type="email" required placeholder="Enter Email" />
            <label htmlFor="password"></label>
            <input type="password" required placeholder="Enter Password" />
            <button>Register</button>
            {err && <span>Something went wrong</span>}
          </form>
          <span className="forRegisterText">New User?   <Link to='/register'>Register</Link></span>
        </div>
      </div>
    </>
  );
};

export default Login;
