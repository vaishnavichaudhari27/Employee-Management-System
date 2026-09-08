const mongoose = require("mongoose");
const Employee = require("../models/Employee");

// CREATE Employee
const createEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      department,
      position,
      salary,
      joiningDate,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !department ||
      !position ||
      salary === undefined ||
      !joiningDate
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingEmployee = await Employee.findOne({ email });

    if (existingEmployee) {
      return res.status(409).json({
        success: false,
        message: "Employee with this email already exists",
      });
    }

    const employee = await Employee.create({
      name,
      email,
      phone,
      department,
      position,
      salary,
      joiningDate,
    });

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET All Employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: employees.length,
      employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET Single Employee
const getEmployeeById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid employee ID",
      });
    }

    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE Employee
const updateEmployee = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid employee ID",
      });
    }

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE Employee
const deleteEmployee = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid employee ID",
      });
    }

    const employee = await Employee.findByIdAndDelete(
      req.params.id
    );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};