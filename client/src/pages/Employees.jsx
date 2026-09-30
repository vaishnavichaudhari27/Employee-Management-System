import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    salary: "",
    joiningDate: "",
  });

  // ➔ अचूक ऑनलाईन Render API लिंक इथे सेट केली आहे
  const API_URL = "https://employee-management-system-1-pqc3.onrender.com/api/employees";

  // Get JWT token
  const getToken = () => {
    return localStorage.getItem("token");
  };

  // Handle unauthorized request
  const handleUnauthorized = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // GET Employees
  const fetchEmployees = async () => {
    try {
      const token = getToken();

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const employeeData = Array.isArray(response.data)
        ? response.data
        : response.data.employees || [];

      setEmployees(employeeData);
    } catch (error) {
      console.error("Error fetching employees:", error);

      if (error.response?.status === 401) {
        handleUnauthorized();
      }
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ADD / UPDATE Employee
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = getToken();

      if (!token) {
        navigate("/login");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (editId) {
        // UPDATE Employee
        await axios.put(`${API_URL}/${editId}`, formData, config);
        alert("Employee updated successfully!");
      } else {
        // ADD Employee
        await axios.post(API_URL, formData, config);
        alert("Employee added successfully!");
      }

      resetForm();
      fetchEmployees();
    } catch (error) {
      console.error("Error saving employee:", error);

      if (error.response?.status === 401) {
        handleUnauthorized();
        return;
      }

      alert(error.response?.data?.message || "Failed to save employee");
    }
  };

  // EDIT Employee
  const handleEdit = (employee) => {
    setEditId(employee._id);

    setFormData({
      name: employee.name || "",
      email: employee.email || "",
      phone: employee.phone || "",
      department: employee.department || "",
      position: employee.position || "",
      salary: employee.salary || "",
      joiningDate: employee.joiningDate ? employee.joiningDate.substring(0, 10) : "",
    });

    setShowForm(true);
  };

  // DELETE Employee
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (!confirmDelete) return;

    try {
      const token = getToken();

      if (!token) {
        navigate("/login");
        return;
      }

      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Employee deleted successfully!");
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);

      if (error.response?.status === 401) {
        handleUnauthorized();
        return;
      }

      alert(error.response?.data?.message || "Failed to delete employee");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      department: "",
      position: "",
      salary: "",
      joiningDate: "",
    });
    setEditId(null);
    setShowForm(false);
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-primary shadow-sm">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold fs-4">Employee Management System</span>
          <span className="text-white">Admin</span>
        </div>
      </nav>

      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-2 bg-white min-vh-100 p-0 shadow-sm">
            <div className="list-group list-group-flush">
              <Link to="/" className="list-group-item list-group-item-action">🏠 Dashboard</Link>
              <Link to="/employees" className="list-group-item list-group-item-action active">👨‍💼 Employees</Link>
              <Link to="/departments" className="list-group-item list-group-item-action">🏢 Departments</Link>
              <Link to="/reports" className="list-group-item list-group-item-action">📊 Reports</Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-10 p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="fw-bold mb-1">Employees</h2>
                <p className="text-muted mb-0">Manage all employees</p>
              </div>
              <button className="btn btn-primary" onClick={() => { resetForm(); setShowForm(true); }}>
                + Add Employee
              </button>
            </div>

            {/* Add / Edit Form */}
            {showForm && (
              <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                  <h5 className="fw-bold mb-4">{editId ? "Edit Employee" : "Add New Employee"}</h5>
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Phone</label>
                        <input type="text" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Department</label>
                        <input type="text" name="department" className="form-control" value={formData.department} onChange={handleChange} required />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Position</label>
                        <input type="text" name="position" className="form-control" value={formData.position} onChange={handleChange} required />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Salary</label>
                        <input type="number" name="salary" className="form-control" value={formData.salary} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-success">Save</button>
                      <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Data Table */}
            <div className="card shadow-sm border-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Department</th>
                      <th>Position</th>
                      <th>Salary</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center py-4 text-muted">No employees found.</td>
                      </tr>
                    ) : (
                      employees.map((emp) => (
                        <tr key={emp._id}>
                          <td>{emp.name}</td>
                          <td>{emp.email}</td>
                          <td>{emp.phone}</td>
                          <td>{emp.department}</td>
                          <td>{emp.position}</td>
                          <td>₹{emp.salary}</td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(emp)}>Edit</button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(emp._id)}>Delete</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
);
}
export default Employees;
