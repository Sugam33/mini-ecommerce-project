import React, { useEffect, useState } from "react";
import axios from "axios";

const UserDashboard = () => {
  const [user, setUser] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://mini-ecommerce-project-backend.onrender.com/api/auth/me", {
        headers: { "auth-token": token },
      });
      localStorage.setItem("role", res.data.role || "guest");
      setUser(res.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (!user)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-success" role="status"></div>
        <p className="mt-3">Loading dashboard...</p>
      </div>
    );

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold">Welcome, {user.name}</h2>

      <div className="row g-4 justify-content-center">
        {/* Account Overview */}
        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h4 className="card-title mb-4">Account Overview</h4>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Name:</strong> {user.name}
                </li>
                <li className="list-group-item">
                  <strong>Email:</strong> {user.email}
                </li>
                <li className="list-group-item">
                  <strong>Role:</strong> {user.role}
                </li>
                {/* <li className="list-group-item"><strong>ID:</strong> {user._id}</li> */}
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-md-4">
          <div className="card shadow-sm border-0 text-center">
            <div className="card-body">
              <h4 className="card-title mb-4">Quick Actions</h4>
              <button
                className="btn btn-danger px-4"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
