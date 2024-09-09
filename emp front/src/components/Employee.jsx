import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Employee = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((res) => {
        if (res.data.Status) {
          setEmployee(res.data.data);
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch employee:", err);
        setError("Failed to load employee.");
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/auth/delete_employee/${id}`)
      .then(res => {
        if (res.data.Status) {
          alert("Employee deleted successfully");
          window.location.reload();
        } else {
          alert(res.data.Error);
        }
      })
      .catch(err => {
        console.error("Failed to delete employee:", err);
        setError("Failed to delete employee.");
      });
  };  

  const handleDepartmentFilter = (e) => {
    setDepartmentFilter(e.target.value);
  };

  const handlePositionFilter = (e) => {
    setPositionFilter(e.target.value);
  };

  const clearFilters = () => {
    setDepartmentFilter("");
    setPositionFilter("");
  };

  return (
    <div className="px-5 mt-5">
      <div className="d-flex justify-content-center ">
        <h3>Employee List</h3>
      </div>

      <Link to="/dashboard/add_employee" className="btn btn-success ">
        Add Employee
      </Link>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="mb-3">
        <h5>Filter by Department:</h5>
        {Array.from(new Set(employee.map(e => e.category_name))).map(dept => (
          <div key={dept} className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="departmentFilter"
              id={`dept-${dept}`}
              value={dept}
              checked={departmentFilter === dept}
              onChange={handleDepartmentFilter}
            />
            <label className="form-check-label" htmlFor={`dept-${dept}`}>
              {dept}
            </label>
          </div>
        ))}
      </div>

      <div className="mb-3">
        <h5>Filter by Position:</h5>
        {Array.from(new Set(employee.map(e => e.position))).map(pos => (
          <div key={pos} className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionFilter"
              id={`pos-${pos}`}
              value={pos}
              checked={positionFilter === pos}
              onChange={handlePositionFilter}
            />
            <label className="form-check-label" htmlFor={`pos-${pos}`}>
              {pos}
            </label>
          </div>
        ))}
      </div>

      <button className="btn btn-secondary mb-3" onClick={clearFilters}>
        Clear Filters
      </button>

      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Department</th>
              <th>Position</th>
              <th>Action </th>
            </tr>
          </thead>
          <tbody>
            {employee
              .filter((e) =>
                e.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (departmentFilter === "" || e.category_name === departmentFilter) &&
                (positionFilter === "" || e.position === positionFilter)
              )
              .map((e) => (
                <tr key={e.id}>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>{e.address}</td>
                  <td>{e.salary}</td>
                  <td>{e.category_name || "N/A"}</td>
                  <td>{e.position || "N/A"}</td>
                  <td>
                    <Link
                      to={`/dashboard/edit_employee/${e.id}`}
                      className="btn btn-primary mx-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(e.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
