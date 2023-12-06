import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import ThemeContext from "../../context/themeContext"
const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const theme = useContext(ThemeContext);

  const navigate = useNavigate()

  const handleLogin = () => {
    navigate("/dashboard")
  }
  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <p>THEME VALUE IN LOGIN COMP. is {theme}</p>
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
        <p className="mt-3">
          Don't have an account? <Link to="/signup">Signup here</Link>
        </p>
      </form>
    </div>
  )
}

export default Login