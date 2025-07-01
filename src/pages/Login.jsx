import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebas";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();


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
            <button>Login</button>
            {err && <span>Something went wrong</span>}
          </form>
          <span className="forRegisterText">New User?   <Link to='/register'>Register</Link></span>
        </div>
      </div>
    </>
  );
};

export default Login;
