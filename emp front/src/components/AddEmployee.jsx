import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    salary: "",
    address: "",
    category_id: "",
    position: ""
  }); 
  const [category, setCategory] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [departmentError, setDepartmentError] = useState("");
  useEffect(() => {
    axios.get("http://localhost:3000/auth/category")
      .then(res => {
        if(res.data.Status){
          setCategory(res.data.data)
        }else{
          alert(res.data.Error)
        }
      })
      .catch(err => {
        console.error("Failed to fetch categories:", err);
        setError("Failed to load categories.");
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!employee.category_id) {
      setDepartmentError("Please select a department");
      return;
    }
    setDepartmentError("");
    axios.post("http://localhost:3000/auth/add_employee", employee)
      .then(res => {
        if(res.data.Status){
          navigate("/dashboard/employee")
        }else{
          alert(res.data.Error)
        }
      })
      .catch(err => {
        console.error("Error adding employee:", err);
        alert("An error occurred while adding the employee");
      });
  }

  return (
    <div className="d-flex justify-content-center align-items-center h-100 ">
      <div className="p-3 rounded-3 w-25 border">
        <h2>Add Employee</h2>
        <form className="row g-1" onSubmit={handleSubmit} >
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Employee Name"
              onChange={(e) => setEmployee({...employee, name: e.target.value})}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="new-email"
              onChange={(e) => setEmployee({...employee, email: e.target.value})}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword4"
              placeholder="Enter Password"
              autoComplete="new-password"
              onChange={(e) => setEmployee({...employee, password: e.target.value})}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="number"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || /^[0-9]+$/.test(value)) {
                  setEmployee({...employee, salary: value});
                }
              }}
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="1234 Main St"
              autoComplete="off"
              onChange={(e) => setEmployee({...employee, address: e.target.value})}
            />
          </div>
          <div className="col-12">
            <label htmlFor="category" className="form-label">
              Department
            </label>
            <select 
              name="category" 
              id="category" 
              className={`form-select ${departmentError ? 'is-invalid' : ''}`}
              value={employee.category_id}
              onChange={(e) => {
                setEmployee({...employee, category_id: e.target.value});
                setDepartmentError("");
              }}
            >
              <option value="">Select Department</option>
              {category.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            {departmentError && <div className="invalid-feedback">{departmentError}</div>}
          </div>
          
          <div className="col-12">
            <label htmlFor="position" className="form-label">
              Position
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="position"
              placeholder="Enter Position"
              onChange={(e) => setEmployee({...employee, position: e.target.value})}
            />
          </div>
          
          <button
            type="submit"
            className="btn btn-success w-100 rounded-0 mb-3"
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
