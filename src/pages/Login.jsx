import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebas";

const Login = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    setErrorMsg(""); 
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
  console.error("Firebase Error Code:", err.code);

  if (err.code === "auth/user-not-found") {
    setErrorMsg("No user found with this email.");
  } else if (err.code === "auth/wrong-password") {
    setErrorMsg("Incorrect password. Please try again.");
  } else if (err.code === "auth/invalid-email") {
    setErrorMsg("Invalid email format.");
  } else if (err.code === "auth/too-many-requests") {
    setErrorMsg("Too many failed attempts. Try again later.");
  } else if (err.code === "auth/invalid-credential") {
    setErrorMsg("Invalid email or password.");
  } else {
    setErrorMsg("Something went wrong. Please try again.");
  }
}

  };

  return (
    <div className="login-container">
      <div className="login-box">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="appName">SChat App</h1>
          <input type="email" required placeholder="Enter Email" />
          <input type="password" required placeholder="Enter Password" />
          <button>Login</button>

          {errorMsg && <span className="error">{errorMsg}</span>}
        </form>
        <span className="forRegisterText">
          New User? <Link to='/register'>Register</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
