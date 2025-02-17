// authRoutes.js

import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Employee from '../models/Employee.js'; 
const router = express.Router();

router.post('/login', async (req, res) => {
    console.log('reached login routes')
  const { employeeName, password } = req.body;
  
  // Check if both fields are present
  if (!employeeName || !password) {
    return res.status(400).json({ message: 'Employee name and password are required' });
  }

  try {
    // Find the employee by employeeName
    const employee = await Employee.findOne({ employeeName });
    if (!employee) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the entered password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, employee.password);
    console.log('passwordmatch',passwordMatch)
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }


    // Generate a JWT token if login is successful
    const token = jwt.sign({ employeeId: employee._id }, 'your_secret_key', { expiresIn: '10s' });

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
