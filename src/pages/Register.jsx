import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.id = 'register-styles';
    styleElement.textContent = `
      .register-container {
        max-width: 500px;
        margin: 80px auto;
        padding: 40px;
        background: #FFFFFF;
        border-radius: 12px;
        border: 2px solid #E0E0E0;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        font-family: 'Segoe UI', Arial, sans-serif;
      }

      .register-container h2 {
        color: #333333;
        font-size: 2rem;
        font-weight: 600;
        margin-bottom: 24px;
        text-align: center;
      }

      .message {
        padding: 12px 16px;
        border-radius: 8px;
        margin-bottom: 20px;
        font-size: 1rem;
        text-align: center;
      }

      .message.success {
        background: #E8F5E9;
        color: #2E7D32;
        border: 2px solid #4CAF50;
      }

      .message.error {
        background: #FFF3E0;
        color: #8B5A00;
        border: 2px solid #F5A623;
      }

      .form-group {
        margin-bottom: 20px;
      }

      .form-group label {
        display: block;
        color: #333333;
        font-weight: 600;
        margin-bottom: 8px;
        font-size: 1rem;
      }

      .form-group input {
        width: 100%;
        padding: 12px 14px;
        border: 2px solid #E0E0E0;
        border-radius: 8px;
        font-size: 1rem;
        font-family: 'Segoe UI', Arial, sans-serif;
        color: #333333;
        transition: all 0.2s;
      }

      .form-group input:focus {
        outline: none;
        border-color: #4A90E2;
        box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
      }

      .register-button {
        width: 100%;
        padding: 14px;
        background: #4A90E2;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        font-family: 'Segoe UI', Arial, sans-serif;
        box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
      }

      .register-button:hover {
        background: #3A7BC8;
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(74, 144, 226, 0.4);
      }
    `;
    
    document.head.appendChild(styleElement);
    
    return () => {
      const existingStyle = document.getElementById('register-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!fullName || !email || !password) {
      setMessage("error:Please fill out all fields.");
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
      setMessage("error:Registration failed: " + error.message);
      return;
    }

    setMessage("success:Registration successful!");
    setFullName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {message && (
        <div className={`message ${message.startsWith('success') ? 'success' : 'error'}`}>
          {message.split(':')[1]}
        </div>
      )}
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
