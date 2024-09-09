import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    salary: "",
    address: "",
    category_id: "",
    position: "",
  });

  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch categories
    axios
      .get("http://localhost:3000/auth/category")
      .then((res) => {
        if (res.data.Status) {
          setCategory(res.data.data);
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch categories:", err);
        setError("Failed to load categories.");
      });

    // Fetch employee data by ID
    axios.get(`http://localhost:3000/auth/employee/${id}`)
      .then((res) => {
        if (res.data.Status) {
          const employeeData = res.data.data[0];
          setEmployee({
            name: employeeData.name,
            email: employeeData.email,
            salary: employeeData.salary,
            address: employeeData.address,
            category_id: employeeData.category_id,
            position: employeeData.position, 
          });
        } else {
          console.error("Failed to load employee data:", res.data.Error);
        }
      }).catch((err) => console.log(err));
  }, [id]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/auth/edit_employee/${id}`, employee)
        .then(res => {
            if (res.data.Status) {
                alert("Employee updated successfully");
                navigate("/dashboard/employee");
            } else {
                alert(res.data.Error);
            }
        })
        .catch(err => console.log(err));
};


  return (
    <div className="d-flex justify-content-center align-items-center h-100 ">
      <div className="p-3 rounded-3 w-25 border">
        <h2>Edit Employee</h2>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Employee Name"
              value={employee.name}
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
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
              value={employee.email}
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
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
              value={employee.salary}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || /^[0-9]+$/.test(value)) {
                  setEmployee({ ...employee, salary: value });
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
              value={employee.address}
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="category" className="form-label">
              Department
            </label>
            <select
              name="category"
              id="category"
              className="form-select"
              value={employee.category_id}
              onChange={(e) =>
                setEmployee({ ...employee, category_id: e.target.value })
              }
            >
              {category.map((c) => {
                return <option value={c.id}>{c.name}</option>;
              })}
            </select>
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
              value={employee.position}
              onChange={(e) =>
                setEmployee({ ...employee, position: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 rounded-0 mb-3"
          >
            Edit Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
