import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
import axios from 'axios';


const Dashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    axios.get("http://localhost:3000/auth/logout").then((res) => {
      if (res.data.Status) {
        navigate("/adminlogin");
      }
    });
  };
  return (
    <div className='container-fluid'>
      <div className='row flex-nowrap'>
        <div className='col-auto col-md-3 col-xl-2 px-0 '>
          <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>
           
            <ul className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start' id='menu'>
             
              <li className='nav-item'>
                <Link to="/dashboard/employee" className='nav-link'>
                  <i className='fs-4 bi bi-people'></i> <span className='ms-1 d-none d-sm-inline'>Manage Employee</span>
                </Link>
              </li>
              <li className='nav-item'>
                <Link to="/dashboard/category" className='nav-link'>
                  <i className='fs-4 bi bi-list'></i> <span className='ms-1 d-none d-sm-inline'>Department</span>
                </Link>
              </li>
              
              <li className='nav-item' onClick={handleLogout}>
                <Link to="/dashboard" className='nav-link'>
                  <i className='fs-4 bi bi-box-arrow-right'></i> <span className='ms-1 d-none d-sm-inline'>Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className='col p-0 m-0'>
            <div className='p-2 d-flex justify-content-center align-items-center shadow-lg'>
               <h4>Employee Management System</h4>
            </div>
            <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
