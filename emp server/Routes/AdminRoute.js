import express from "express";
import db from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

// Admin login route
router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * FROM admin WHERE email = ?";
  db.query(sql, [req.body.email], (err, result) => {
    if (err) {
      return res.json({ loginStatus: false, Error: "Error in the SQL Query" });
    }

    if (result.length > 0) {
      const admin = result[0];

      if (req.body.password === admin.password) {
        const email = admin.email;
        const token = jwt.sign(
          { role: "admin", email: email },
          "jwt_secret_key",
          { expiresIn: "1d" }
        );

        // Set the token as a cookie
        res.cookie("token", token, { httpOnly: true });

        return res.json({ loginStatus: true });
      } else {
        return res.json({
          loginStatus: false,
          Error: "Invalid Email or Password",
        });
      }
    } else {
      return res.json({
        loginStatus: false,
        Error: "Invalid Email or Password",
      });
    }
  });
});

// Fetch categories route
router.get("/category", (req, res) => {
  const sql = "SELECT * FROM category";
  db.query(sql, (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Error in the SQL Query" });
    }
    return res.json({ Status: true, data: result });
  });
});

// Add category route
router.post("/add_category", (req, res) => {
  const sql = "INSERT INTO category (`name`) VALUES (?)";
  console.log("Received category:", req.body.category); // Log the received category
  db.query(sql, [req.body.category], (err, result) => {
    if (err) {
      console.error("SQL Error:", err); // Log the full error
      return res.json({
        Status: false,
        Error: "Error in the SQL Query: " + err.message,
      });
    }
    console.log("Category added successfully:", result); // Log the result
    return res.json({ Status: true });
  });
});

// Add employee route
router.post("/add_employee", (req, res) => {
  const sql = "INSERT INTO employee (`name`, `email`, `password`, `salary`, `address`, `category_id`, `position`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.password,
    req.body.salary,
    req.body.address,
    req.body.category_id,
    req.body.position
  ];
  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.json({ Status: false, Error: "Error in SQL query" });
    }
    return res.json({ Status: true });
  });
});

router.get("/employee", (req, res) => {
  const sql = `
    SELECT e.*, c.name as category_name 
    FROM employee e 
    LEFT JOIN category c ON e.category_id = c.id
  `;
  db.query(sql, (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Error in the SQL Query" });
    }
    return res.json({ Status: true, data: result });
  });
});

router.get("/employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Error in the SQL Query" });
    }
    return res.json({ Status: true, data: result });
  })
});

router.put("/edit_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE employee SET ? WHERE id = ?";
  db.query(sql, [req.body, id], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Error in the SQL Query" });
    }
    return res.json({ Status: true, Message: "Employee updated successfully" });
  });
});

router.delete("/delete_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM employee WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Error in the SQL Query" });
    }
    return res.json({ Status: true, Message: "Employee deleted successfully" });
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});

router.delete("/delete_category/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM category WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Error in the SQL Query" });
    }
    return res.json({ Status: true, Message: "Category deleted successfully" });
  });
});

export { router as adminRouter };
