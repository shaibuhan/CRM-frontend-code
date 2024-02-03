import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { BarLoader } from "react-spinners";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import "../Styles/login.css";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginSuccess } from "../Reducers/loginReducer";
import { useNavigate } from "react-router-dom";
import { API } from "../API/api";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.error);

  useEffect(() => {
    if (error) {
      console.error("Login failed. Error:", error);
      setErrorMessage("Login failed. Error: " + error);
    }
  }, [error]);

  const handleLogin = async () => {
    const userData = {
      email,
      password,
    };

    try {
      setLoading(true);

      const response = await fetch(`${API}login`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Login Response:", response);
      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("data", JSON.stringify(data));
        dispatch(loginSuccess());
        navigate(`/request/all`);
      } else {
        const errorData = await response.json();
        dispatch(loginFailure(errorData.message));
        setErrorMessage("Login failed. Error: " + errorData.message);
      }
    } catch (error) {
      dispatch(loginFailure("An error occurred while logging in"));
      setErrorMessage("An error occurred while logging in");
    } finally {
      setLoading(false);
    }
    
  };
  const handleNavigateToAuthor = async () => {
    setLoading(true);

    // Simulate some asynchronous task (e.g., API call, timeout)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Navigate to the author page or perform any other action
    // Replace '/author' with the actual route or action you want to perform
    navigate('/author');

    setLoading(false);
  };
  
  return (
    <div className="login-page bg-black">
      <div className="main">
        
        <div className="header">
          <div className="text">Login</div>
          <div className="underline"></div>
          <div
            // className="text"
            style={{
              color: 'WHITE',
              fontFamily: 'sans-serif',
              textDecoration: 'underline',
              cursor: 'pointer',
              position:"relative",
              bottom:"150px",
              left:"0px"

            
            }}
            onClick={handleNavigateToAuthor}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'TESTING preeS Me...!'}
          </div>       </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="outputs">
          <div className="output">
            <img src={email_icon} alt="" />
            <input
              type="email"
              placeholder="Email Id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="output">
            <img src={password_icon} alt="" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        {/* <div className="forgot-password">
          Forgot Password ?<span>Click here</span>
        </div> */}
        <div className="submitcontainer">
          <div className="submit" onClick={handleLogin}>
            {loading ? (
              <BarLoader css={override} color={"#ffffff"} loading={loading} />
            ) : (
              "Login"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
