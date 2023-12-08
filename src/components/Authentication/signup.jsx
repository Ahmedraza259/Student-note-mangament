import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassowrd, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const apiUrl = process.env.REACT_APP_URL;
      const response = await fetch(`${apiUrl}user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, agreeTerms }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(`${data.message}`);
        navigate("/");
      } else {
        toast.error(`${data.message}`);
        if (password !== confirmPassowrd) {
          toast.error("Both Passwords do not match.");
          return;
        }
        if (!agreeTerms) {
          toast.error("Please agree to the terms and conditions.");
          return;
        }
      }
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };
  return (
    <div className="container mt-5">
      <Toaster />
      <h2 className="text-success">Signup</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassowrd}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="mb-3 form-check text-success">
          <input
            type="checkbox"
            className="form-check-input "
            id="agreeTerms"
            checked={agreeTerms}
            onChange={() => setAgreeTerms(!agreeTerms)}
          />
          <label className="form-check-label " htmlFor="agreeTerms">
            I agree to the terms and conditions
          </label>
        </div>
        <button
          type="button"
          className="btn btn-success"
          onClick={handleSignup}
        >
          Signup
        </button>
        <p className="mt-3 ">
          Already have an account?{" "}
          <Link className="text-success" to="/">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
