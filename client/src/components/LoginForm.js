import React, { useState } from "react";
import SignupForm from "./SignupForm";

const LoginForm = ({ toggleLoginForm }) => {
  const [isSignup, setIsSignup] = useState(false);

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  if (isSignup) {
    return (
      <div className="signup-form-wrapper">
        <SignupForm toggleForm={toggleForm} />
        <button onClick={toggleLoginForm}>Already have an account? Sign In</button>
      </div>
    );
  }

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          console.log('Logged in', user);
        });
      } else {
        res.json().then((errors) => {
          console.error(errors);
        });
      }
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          id="username-input"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password-input"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={toggleForm}>Don't have an account? Sign Up</button>
    </div>
  );
};

export default LoginForm;
