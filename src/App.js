import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'; // Import your main CSS file

// Navbar Component
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <h1 className="navbar-title">My App</h1>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/data">View Data</Link></li>
        </ul>
      </div>
    </nav>
  );
};

// Form Component with Enhanced Validation
const MyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    number: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate the input
    validate(name, value);
  };

  const validate = (name, value) => {
    let errors = {};

    switch (name) {
      case 'name':
        if (!value) {
          errors.name = 'Name is required';
        } else {
          const nameParts = value.trim().split(/\s+/);
          if (nameParts.length < 2) {
            errors.name = 'Full name is required';
          }
        }
        break;

      case 'email':
        if (!value) {
          errors.email = 'Email is required';
        } else {
          const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!emailPattern.test(value)) {
            errors.email = 'Email address is invalid';
          }
        }
        break;

      case 'number':
        if (!value) {
          errors.number = 'Number is required';
        } else if (!/^[789]\d{9}$/.test(value)) {
          errors.number = 'Number must be exactly 10 digits, starting with 7, 8, or 9';
        }
        break;

      case 'password':
        if (!value) {
          errors.password = 'Password is required';
        } else if (value.length < 8) {
          errors.password = 'Password must be at least 8 characters long';
        }
        break;

      default:
        break;
    }

    setErrors(errors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Final validation on submit
    if (Object.keys(errors).length === 0 && Object.values(formData).every(field => field)) {
      // Convert email to lowercase
      const processedData = {
        ...formData,
        email: formData.email.toLowerCase(),
      };

      // Get existing data from local storage
      let existingData = JSON.parse(localStorage.getItem('formData'));
      
      // Ensure existingData is an array
      if (!Array.isArray(existingData)) {
        existingData = [];
      }

      existingData.push(processedData);

      // Save updated data back to local storage
      localStorage.setItem('formData', JSON.stringify(existingData));
      alert('Form submitted successfully!');
      setFormData({
        name: '',
        email: '',
        number: '',
        password: '',
      });
    } else {
      alert('Please correct the errors before submitting.');
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
        {errors.name && <p className="error">{errors.name}</p>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div>
        <label>Number:</label>
        <input
          type="text"
          name="number"
          value={formData.number}
          onChange={handleChange}
        />
        {errors.number && <p className="error">{errors.number}</p>}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

// Data Table Component
const DataTable = () => {
  const data = JSON.parse(localStorage.getItem('formData')) || [];

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
          {data.length > 0 ? (
            data.map((entry, index) => (
              <tr key={index}>
                <td>{entry.name}</td>
                <td>{entry.email}</td>
                <td>{entry.number}</td>
                <td>{entry.password}</td>
              </tr>
            ))
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

// Home Page Component
const Home = () => {
  return (
    <div className="home">
      <h2>Welcome to the Home Page</h2>
      <MyForm />
    </div>
  );
};

// Main App Component
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
