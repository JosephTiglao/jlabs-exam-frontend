import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container-login">
      <div className="hero-section">
        <div className="decorative-circle circle-1"></div>
        <div className="decorative-circle circle-2"></div>

        <div className="logo">
          <i className="fas fa-earth-americas"></i>
        </div>

        <div className="hero-content">
          <h1>Turn IP Data into Location Intelligence</h1>
          <p>
            Transform IP addresses into meaningful geographic insights by
            identifying a user's approximate location, enabling better
            monitoring, analysis, and data-driven decision-making.
          </p>
        </div>
      </div>

      <div className="login-section">
        <div className="login-container">
          <div className="login-header">
            <div className="login-logo">
              <i className="fas fa-earth-americas"></i>
            </div>
            <h2>IP GeoTracker</h2>
          </div>

          <p className="welcome-text">
            Welcome back, please login to your account.
          </p>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="jlabs@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper password-wrapper">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter your password (eg. password123)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-login">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
