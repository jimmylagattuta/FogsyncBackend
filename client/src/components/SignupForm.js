import React, { useState } from "react";
import './SignupForm.css';

const SignupForm = ({ toggleForm }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password_confirmation: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (formData.password !== formData.password_confirmation) {
      console.error("Passwords do not match");
      return;
    }

    const userCreds = { ...formData };

    fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCreds),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          console.log('Signed up', user);
        });
      } else {
        res.json().then((errors) => {
          console.error(errors);
        });
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        id="username-signup-input"
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <label htmlFor="email">Email:</label>
      <input
        id="email-signup-input"
        type="text"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <label htmlFor="password">Password:</label>
      <input
        id="password-signup-input"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <label htmlFor="password_confirmation">Confirm Password:</label>
      <input
        id="password-confirmation-signup-input"
        type="password"
        name="password_confirmation"
        value={formData.password_confirmation}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
      <button type="button" onClick={toggleForm}>
        Already have an account? Sign In
      </button>
    </form>
  );
};

export default SignupForm;
