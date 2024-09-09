import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AddCategory = () => {
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("Submitting Department:", category); // Log the category being submitted
    axios.post("http://localhost:3000/auth/add_category", { category })
    .then(res => {
      console.log("Server response:", res.data); // Log the full server response
      if(res.data.Status){
        navigate("/dashboard/category")
      } else {
        setError(res.data.Error)
      }
    })
    .catch(err => {
      console.error("Axios error:", err); // Log any axios errors
      setError("An error occurred while adding the Department");
    })
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100 ">
      <div className="">
        {error && <h5 className="text-warning">{error}</h5>}
        <h2>Add Department</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="category">
              <strong>Department</strong>
            </label>
            <input
              type="text"
              name="category"
              placeholder="Enter Department"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-control rounded-0"
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0 mb-3">
            Add Department
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
