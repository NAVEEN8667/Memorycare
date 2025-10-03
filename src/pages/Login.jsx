import React, { useState } from "react";
import { supabase } from "../supabaseClient";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email || !password) {
      setMessage("Please enter email and password.");
      return;
    }

    // Check if user exists in 'users' table
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("password", password) // plain text password check (testing only!)
      .single();

    if (error || !data) {
      setMessage("Login failed: Invalid email or password.");
      return;
    }

    setMessage(`Welcome, ${data.full_name}!`);
    setEmail("");
    setPassword("");
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        fontFamily: "sans-serif",
      }}
    >
      <h2>Login</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>
        <button type="submit" style={{ width: "100%", padding: "10px" }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
