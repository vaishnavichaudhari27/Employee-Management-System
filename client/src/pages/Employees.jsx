import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    salary: "",
    joiningDate: "",
  });

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/employees"
      );

      const employeeData = Array.isArray(response.data)
        ? response.data
        : response.data.employees || [];

      setEmployees(employeeData);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/employees/${editId}`,
          formData
        );

        alert("Employee updated successfully!");
      } else {
        await axios.post(
          "http://localhost:5000/api/employees",
          formData
        );

        alert("Employee added successfully!");
      }

      resetForm();
      fetchEmployees();
    } catch (error) {
      console.error("Error saving employee:", error);
      alert("Failed to save employee");
    }
  };

  const handleEdit = (employee) => {
    setEditId(employee._id);

    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      department: employee.department,
      position: employee.position,
      salary: employee.salary,
      joiningDate: employee.joiningDate
        ? employee.joiningDate.substring(0, 10)
        : "",
    });

    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/employees/${id}`
      );

      alert("Employee deleted successfully!");

      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Failed to delete employee");
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
          <span className="navbar-brand fw-bold fs-4">
            Employee Management System
          </span>

          <span className="text-white">
            Admin
          </span>
        </div>
      </nav>

      <div className="container-fluid">
        <div className="row">

          {/* Sidebar */}
          <div className="col-md-2 bg-white min-vh-100 p-0 shadow-sm">

            <div className="list-group list-group-flush">

              <Link
                to="/"
                className="list-group-item list-group-item-action"
              >
                🏠 Dashboard
              </Link>

              <Link
                to="/employees"
                className="list-group-item list-group-item-action active"
              >
                👨‍💼 Employees
              </Link>

            </div>

          </div>

          {/* Main Content */}
          <div className="col-md-10 p-4">

            {/* Page Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">

              <div>
                <h2 className="fw-bold mb-1">
                  Employees
                </h2>

                <p className="text-muted mb-0">
                  Manage all employees
                </p>
              </div>

              <button
                className="btn btn-primary"
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
              >
                + Add Employee
              </button>

            </div>

            {/* Add / Edit Form */}
            {showForm && (
              <div className="card shadow-sm border-0 mb-4">

                <div className="card-body">

                  <h5 className="fw-bold mb-4">
                    {editId
                      ? "Edit Employee"
                      : "Add New Employee"}
                  </h5>

                  <form onSubmit={handleSubmit}>

                    <div className="row">

                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          Name
                        </label>

                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          Email
                        </label>

                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          Phone
                        </label>

                        <input
                          type="text"
                          name="phone"
                          className="form-control"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          Department
                        </label>

                        <input
                          type="text"
                          name="department"
                          className="form-control"
                          value={formData.department}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          Position
                        </label>

                        <input
                          type="text"
                          name="position"
                          className="form-control"
                          value={formData.position}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          Salary
                        </label>

                        <input
                          type="number"
                          name="salary"
                          className="form-control"
                          value={formData.salary}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          Joining Date
                        </label>

                        <input
                          type="date"
                          name="joiningDate"
                          className="form-control"
                          value={formData.joiningDate}
                          onChange={handleChange}
                          required
                        />
                      </div>

                    </div>

                    <button
                      type="submit"
                      className="btn btn-success me-2"
                    >
                      {editId
                        ? "Update Employee"
                        : "Save Employee"}
                    </button>

                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={resetForm}
                    >
                      Cancel
                    </button>

                  </form>

                </div>
              </div>
            )}

            {/* Employee Table */}
            <div className="card border-0 shadow-sm">

              <div className="card-body">

                {employees.length === 0 ? (

                  <div className="text-center py-5">

                    <h5>
                      No employees found
                    </h5>

                    <p className="text-muted">
                      Add your first employee.
                    </p>

                  </div>

                ) : (

                  <div className="table-responsive">

                    <table className="table table-hover align-middle">

                      <thead className="table-light">

                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Department</th>
                          <th>Position</th>
                          <th>Salary</th>
                          <th>Joining Date</th>
                          <th>Actions</th>
                        </tr>

                      </thead>

                      <tbody>

                        {employees.map((employee) => (

                          <tr key={employee._id}>

                            <td className="fw-semibold">
                              {employee.name}
                            </td>

                            <td>
                              {employee.email}
                            </td>

                            <td>
                              {employee.phone}
                            </td>

                            <td>
                              {employee.department}
                            </td>

                            <td>
                              {employee.position}
                            </td>

                            <td>
                              ₹{employee.salary}
                            </td>

                            <td>
                              {new Date(
                                employee.joiningDate
                              ).toLocaleDateString()}
                            </td>

                            <td>

                              <button
                                className="btn btn-sm btn-warning me-2"
                                onClick={() =>
                                  handleEdit(employee)
                                }
                              >
                                Edit
                              </button>

                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() =>
                                  handleDelete(employee._id)
                                }
                              >
                                Delete
                              </button>

                            </td>

                          </tr>

                        ))}

                      </tbody>

                    </table>

                  </div>

                )}

              </div>

            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

export default Employees;