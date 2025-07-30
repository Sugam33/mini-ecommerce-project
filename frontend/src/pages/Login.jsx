import React, { useState } from "react";
import InputForm from "../components/InputForm";
import { saveAuth } from "../utils/authUtils";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Save auth-token and role
      saveAuth(res.data.token, res.data.user.role);

      // Save userId for cart operations
      localStorage.setItem("userId", res.data.user._id);

      // Trigger CartContext update
      window.dispatchEvent(new Event("storage"));

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container login-page d-flex align-items-center justify-content-center">
      <div className="card shadow-lg p-4 col-md-6">
        <h2 className="text-center mb-4">Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <InputForm
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
          />
          <InputForm
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
          />
          <button type="submit" className="btn btn-success w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
