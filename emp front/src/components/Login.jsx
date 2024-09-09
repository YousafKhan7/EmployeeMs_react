import React, { useState } from "react";
import "../components/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [values, setValues] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/auth/adminlogin", values)
        .then(res => {
            if(res.data.loginStatus){

            
            navigate("/dashboard/employee");
            }
            else{
                setError(res.data.Error);
            }
        })
        .catch(err => console.log(err))
    }
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="loginForm">
        <div className="text-warning">
            {error && <h5>{error}</h5>}

        </div>
        <h2>Login Page</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={(e) => setValues({...values, email: e.target.value})}
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="form-control rounded-0"
              onChange={(e) => setValues({...values, password: e.target.value})}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0 mb-3">
            Login
          </button>
        
        </form>
      </div>
    </div>
  );
};

export default Login;
