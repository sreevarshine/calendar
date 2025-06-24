import React, { useState } from 'react';
import axios from 'axios';
import './LoginSignup.css';
import { FiMail, FiLock } from 'react-icons/fi';
import signupImage from './assets/signup-illustration.jpg';

function Signup({ setUser, switchToLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-form-container">
        <h1>📅 Calendar Dashboard</h1>
        <form onSubmit={signup}>
          <h2>Signup</h2>
          <div className="input-group">
            <FiMail className="input-icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <FiLock className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Signup</button>
        </form>
        <p className="switch-text">
          Already have an account? <button type="button" onClick={switchToLogin}>Log in</button>
        </p>
      </div>
    </div>
  );
}

export default Signup;
