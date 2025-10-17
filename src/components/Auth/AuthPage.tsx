import React, { useState, type FormEvent } from "react"
import Button from "../Button.tsx"
import "./AuthPage.css"

interface AuthPageProps {
  onAuthSuccess: () => void
  onGuestLogin: () => void
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess, onGuestLogin }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const url = isLogin
      ? "http://localhost:3000/api/users/signin"
      : "http://localhost:3000/api/users/signup"
    const body = isLogin
      ? JSON.stringify({ username, password })
      : JSON.stringify({ username, full_name: fullName, password })

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      })

      if (!response.ok) {
        // Try to get a specific error message from the server's JSON response
        let errorData
        try {
          errorData = await response.json()
        } catch (jsonError) {
          // If the body isn't JSON or is empty, fall back to the status text
          throw new Error(
            response.statusText || "An unknown network error occurred."
          )
        }
        throw new Error(errorData.error || "An unknown error occurred.")
      }

      const data = await response.json()
      // Assuming the token should be stored for session management
      localStorage.setItem("user", JSON.stringify(data))

      console.log(
        isLogin ? "Login successful" : "Registration successful",
        data
      )
      onAuthSuccess()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleForm = () => {
    setIsLogin(!isLogin)
    setError("")
    // Clear form fields when switching
    setUsername("")
    setPassword("")
    setFullName("")
  }

  const getButtonLabel = () => {
    if (isLoading) {
      if (isLogin) {
        return "Logging In..."
      } else {
        return "Creating Account..."
      }
    }
    return isLogin ? "Log In" : "Create Account"
  }

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
              required
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
            required
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
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        <Button
          label={getButtonLabel()}
          disabled={isLoading}
          onClick={handleSubmit}
        />
        <p className="toggle-auth" onClick={toggleForm}>
          {isLogin
            ? "Need an account? Register"
            : "Already have an account? Log In"}
        </p>
        <p
          className="guest-login"
          onClick={onGuestLogin}
          style={{ cursor: "pointer" }}
        >
          or Continue as a Guest
        </p>
      </form>
    </div>
  )
}

export default AuthPage
