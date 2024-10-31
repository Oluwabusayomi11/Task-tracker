// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate()
  axios.defaults.withCredentials = true
  const handleLogout = () => {
    axios.get('http://localhost:5000/auth/logout')
    .then(result => {
      if(result.data.Status){
        navigate('/')
      }else {
        console.error("Logout failed response:", result.data);
        alert('Logout failed. Please try again.');
      }
    })
    .catch(error => {
      console.error("Logout error:", error);
      navigate('/');
    })
  }

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-item-sm-start px-3 pt-2 text-white min-vh-100">
            <Link to="/dashboard"
            className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
              <span className="fs-5 fw-bolder d-none d-sm-inline">TaskNest</span></Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-dm-start"
              id="menu"
            >
              <li className="w-100">
                <Link
                  to="/dashboard"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/task"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Add Tasks</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/project"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-columns ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Projects</span>
                </Link>
              </li>
              <li className="w-100" >
                <button onClick={handleLogout}  className="nav-link text-white px-0 align-middle"style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'inherit' }}>
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0">
            <div className="p-2 d-flex justify-content-center shadow">
                <h4>Task Tracker</h4>
            </div>
            <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
