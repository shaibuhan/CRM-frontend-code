import React, { useState } from "react";
import { logoutUser } from "../Reducers/loginReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

function TopBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("data"));
  const userName = userData.data.name;
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);

      // Simulate some asynchronous task (e.g., API call, timeout)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      dispatch(logoutUser());
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error("Logout failed. Error:", error);
      // Handle error if needed
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="navbar bg-gray-900  text-neutral-content rounded-lg p-2 md:p-4 lg:p-4 toolbar">
      <div className="flex-1">
        <a className="text-yellow-500 ml-4 font-bold uppercase text-md md:text-xl lg:text-xl">
          {userName}
        </a>
      </div>
      <div className="navbar-end">
        <button
          className="btn btn-warning p-2 md:p-4 lg:p-4"
          onClick={handleLogout}
          disabled={loading}
        >
          {loading ? (
            <BarLoader color={"#ffffff"} loading={loading} />
          ) : (
            "Logout"
          )}
        </button>
      </div>
    </div>
  );
}

export default TopBar;
