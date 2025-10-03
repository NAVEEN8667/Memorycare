import React, { useState } from "react";
import { supabase } from "../supabaseClient";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!fullName || !email || !password) {
      setMessage("Please fill out all fields.");
      return;
    }

    // Insert data into simple users table
    const { data, error } = await supabase.from("users").insert([
      {
        full_name: fullName,
        email: email,
        password: password, // In production, hash passwords!
      },
    ]);

    if (error) {
      setMessage("Registration failed: " + error.message);
      return;
    }

    setMessage("Registration successful!");
    setFullName("");
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
      <h2>Register</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleRegister}>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
