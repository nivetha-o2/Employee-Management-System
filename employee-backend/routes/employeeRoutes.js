import express from "express";
import mongoose from "mongoose";

import Employee from "../models/Employee.js";
import User from "../models/User.js"

const router = express.Router();




router.post('/', async (req, res) => {
  try {
    const { context, ...data } = req.body; // Extract context and other fields from the request body
    

    if (!context) {
      return res.status(400).json({ message: 'Context is required to process the request.' });
    }

    
    const employee = new Employee(data); 

    await employee.save(); 
    
    return res.status(201).json({
      message: 'Signup successful or employee created successfully',
      employee: employee, 
    });
    
  } catch (err) {
    console.error('Error saving data:', err);
    res.status(400).json({ message: 'Error processing request', error: err });
  }
});



// Get all Employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).send("Error retrieving employees");
  }
});

// Get Employee by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID format");
  }
  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).send("Employee not found");
    }
    res.json(employee);
  } catch (error) {
    res.status(500).send("Error retrieving employee");
  }
});

// Update an Employee
router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID format");
  }

  try {
    const updatedEmployee = await Employee.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedEmployee) {
      return res.status(404).send("Employee not found");
    }

    res.json(updatedEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating employee");
  }
});

// Delete an Employee
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID format");
  }

  try {
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting employee", error: err });
  }
});

export default router;
