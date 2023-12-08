import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';
const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const apiUrl = process.env.REACT_APP_URL
      const response = await fetch(`${apiUrl}user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        const accessToken = data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        toast.success(`${data.message}`);
        navigate("/dashboard");
      } else {
        toast.error(`${data.message}`);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };
  return (
    <div className="container mt-5">
          <Toaster />
      <h2 className="text-success">Login</h2>
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
        <button type="button" className="btn btn-success" onClick={handleLogin}>
          Login
        </button>
        <p className="mt-3">
          Don't have an account? <Link className="text-success" to="/signup">Signup here</Link>
        </p>
      </form>
    </div>
  )
}

export default Login