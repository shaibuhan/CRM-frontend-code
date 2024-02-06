import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css"
const Login = () => {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await fetch('https://shaibuhan-crm-capstone-guvi-in.onrender.com/loginn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }),
      });

      if (response.ok) {
        console.log('Login successful');
        navigate('/HomePage'); // Redirect to the dashboard or desired page
      } else {
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="flex items-center justify-center min-h-screen bg-gray-100" >
<div class="bg-white p-8 rounded shadow-md">

      <h1 class="text-2xl font-semibold mb-6">Login</h1>
      <div>
      {/* <div  className='form'> */}
        <label  for="email" class="text-sm font-medium"   >Email:</label>
        <input class="mt-1 p-2 border rounded"
          placeholder="Your email" type="email"  required ref={emailRef} />
      </div>
      <div>
        <label for="password" class="text-sm font-medium">Password:</label>
        <input  class="mt-1 p-2 border rounded"
          placeholder="Your password"
          required type="password" ref={passwordRef} />
      </div>
      <button style={{color:"red" ,margin:"10px"}} class="bg-blue-400 text-white p-2 rounded hover:bg-blue-600 transition duration-300" type="button" onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <p>
        Don't have an account? <Link to="/"  style={{textDecoration:"underline"}}>Register here</Link>
      </p>
      </div>
      </div>
//  </div>
  );
};

export default Login;
