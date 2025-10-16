import React, { useState } from "react";
import Button from "../Button";
import "./AuthPage.css";

interface AuthPageProps {
  onAuthSuccess: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isLogin) {
      // Mock login logic
      if (username && password) {
        console.log("Logging in with:", { username });
        onAuthSuccess(); // Simulate successful login
      } else {
        setError("Username and password are required.");
      }
    } else {
      // Mock register logic
      if (username && password && fullName) {
        console.log("Registering with:", { fullName, username });
        onAuthSuccess(); // Simulate successful registration
      } else {
        setError("Full Name, Username, and Password are required.");
      }
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>{isLogin ? "Log In" : "Register"}</h2>
        {error && <p className="auth-error">{error}</p>}

        {!isLogin && (
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Walter White"
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g. heisenberg"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <Button label={isLogin ? "Log In" : "Create Account"} onClick={() => {}} />
        <p className="toggle-auth" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Need an account? Register" : "Already have an account? Log In"}
        </p>
      </form>
    </div>
  );
};

export default AuthPage;