import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Testing() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleBackToLogin = async () => {
    setLoading(true);

    // Simulate some asynchronous task (e.g., API call, timeout)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Navigate back to the login page
    navigate('/login'); // Replace '/login' with the actual route of your login page

    setLoading(false);
  };

  return (
    <div className="login-page bg-black">
      <div className="main">
        <div className="header">
          <h1 className="text" style={{ color: 'green' }}>
            ADMIN
          </h1>
          <div className="text">
            Email: admin@gmail.com <br />
            password: amanager@gmail.com
          </div>
          <h1 className="text" style={{ color: 'yellow' }}>
            Manager
          </h1>
          <div className="text">
            Email: manager@gmail.com password: manager@gmail.com
          </div>
          <h1 className="text" style={{ color: 'whitesmoke' }}>
            Employee
          </h1>
          <div className="text">
            Email:  employee@gmail.com password: employee@gmail.com
          </div>
          <button className="btn btn-primary" onClick={handleBackToLogin} disabled={loading}>
            {loading ? 'Loading...' : 'Back to Login'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Testing;
