import React from 'react';
import './Home.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  useEffect(() => {
    adminCount();
    employeeCount();
    Salarytotal();
  }, []);

  const adminCount = () => {
    axios.get('http://localhost:3000/auth/admin/total_admins')
      .then(result =>{
        setAdminTotal(result.data.data[0].admin);
      })
  };

  const employeeCount = () => {
    axios.get('http://localhost:3000/auth/employee/total_employees')
      .then(result => {
        if(result.data.Status){
          setEmployeeTotal(result.data.data[0].employee);
        }
      })
      
  };
  
  const Salarytotal = () => {
    axios.get('http://localhost:3000/auth/employee/total_salary')
      .then(result => {
        if(result.data.Status){
          setSalaryTotal(result.data.data[0].salaryEmployee);
        }
      })
  };
  
  
  return (
    <div>
      <div className='p-3 d-flex flex-column justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 boarder shadow-sm w-100 '>
          <div className='text-center pb-2'>
            <h4>Admin</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total Admins</h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 boarder shadow-sm w-100 '>
          <div className='text-center pb-2'>
            <h4>Employee</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total Employees</h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 boarder shadow-sm w-100 '>
          <div className='text-center pb-2'>
            <h4>Salary</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Employees Total Salary</h5>
            <h5>{salaryTotal}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
