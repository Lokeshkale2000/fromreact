import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <h1 className="navbar-title">My App</h1>
        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/data">View Data</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const MyForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let valid = true;
    let errors = {};

    if (!formData.name) {
      errors.name = "Name is required";
      valid = false;
    } else {
      const nameParts = formData.name.trim().split(/\s+/);
      if (nameParts.length < 2) {
        errors.name = "Full name is required";
        valid = false;
      }
    }

    if (!formData.email) {
      errors.email = "Email is required";
      valid = false;
    } else {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(formData.email)) {
        errors.email = "Email address is invalid";
        valid = false;
      }
    }

    if (!formData.number) {
      errors.number = "Number is required";
      valid = false;
    } else if (!/^\d+$/.test(formData.number)) {
      errors.number = "Number must be digits only";
      valid = false;
    }

    if (!formData.password) {
      errors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const processedData = {
        ...formData,
        email: formData.email.toLowerCase(),
      };

      localStorage.setItem("formData", JSON.stringify(processedData));
      alert("Form submitted successfully!");
      setFormData({
        name: "",
        email: "",
        number: "",
        password: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p>{errors.name}</p>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <div>
        <label>Number:</label>
        <input
          type="text"
          name="number"
          value={formData.number}
          onChange={handleChange}
        />
        {errors.number && <p>{errors.number}</p>}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p>{errors.password}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

const DataTable = () => {
  const data = JSON.parse(localStorage.getItem("formData")) || {};

  return (
    <div className="data-table">
      <h2>Form Data</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Number</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {data.name ? (
            <tr>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.number}</td>
              <td>{data.password}</td>
            </tr>
          ) : (
            <tr>
              <td colSpan="4">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const Home = () => {
  return (
    <div className="home">
      <h2>Welcome to the Home Page</h2>
      <MyForm />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/data" element={<DataTable />} />
      </Routes>
    </Router>
  );
};

export default App;
