import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Registration.css';

const Registration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onRegister = async () => {
    try {
      const response = await fetch('https://shaibuhan-crm-capstone-guvi-in.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Registration successful
        console.log('Registration successful');
        // Navigate to the login page after successful registration
        navigate('/Logins');
      } else {
        // Registration failed
        console.error('Error during registration:', response.statusText);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className='back'>
    <div   className="flex items-center justify-center min-h-screen bg-gray-100">
      <div style={{width:"370px"}}  className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Registration</h1>
        <form className="space-y-4">
          <div>
            <label className="block mb-1">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
          style={{color:"red"}}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
            type="button"
            onClick={onRegister}
          >
            Register
          </button>
          <p>
        already have an account? <Link to="/Logins" style={{textDecoration:"underline"}}>Login here</Link>
      </p>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Registration;
