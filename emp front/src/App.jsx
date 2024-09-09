import React from "react";
import "./App.css";
import Login from "./components/login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";

import Employee from "./components/Employee";
import Category from "./components/Category";

import AddCategory from "./components/AddCategory";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";
function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route path="/adminlogin" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
         
         
          <Route path="employee" element={<Employee />} />
          <Route path="category" element={<Category />} />
          <Route path="add_category" element={<AddCategory />} />
          <Route path="add_employee" element={<AddEmployee />} />
          <Route path="edit_employee/:id" element={<EditEmployee />} />
          </Route>
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
