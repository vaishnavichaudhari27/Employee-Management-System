import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/employees"
      );

      const data = Array.isArray(response.data)
        ? response.data
        : response.data.employees || [];

      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const totalEmployees = employees.length;

  const departments = [
    ...new Set(
      employees.map((employee) => employee.department)
    ),
  ].length;

  const averageSalary =
    employees.length > 0
      ? employees.reduce(
          (total, employee) =>
            total + Number(employee.salary || 0),
          0
        ) / employees.length
      : 0;

  return (
    <div className="container-fluid bg-light min-vh-100 p-0">

      {/* Navbar */}
      <nav className="navbar navbar-dark bg-primary shadow-sm px-4">

        <span className="navbar-brand fw-bold">
          Employee Management System
        </span>

        <div className="d-flex align-items-center text-white">

          <div
            className="rounded-circle bg-white text-primary d-flex align-items-center justify-content-center fw-bold me-2"
            style={{ width: "40px", height: "40px" }}
          >
            A
          </div>

          <div>
            <div className="fw-semibold">
              Admin
            </div>

            <small>
              Administrator
            </small>
          </div>

        </div>

      </nav>

      <div className="row g-0">

        {/* Sidebar */}
        <div className="col-md-2 bg-white shadow-sm min-vh-100 p-3">

          <div className="list-group">

            <Link
              to="/"
              className="list-group-item list-group-item-action active"
            >
              🏠 Dashboard
            </Link>

            <Link
              to="/employees"
              className="list-group-item list-group-item-action"
            >
              👨‍💼 Employees
            </Link>

            <button className="list-group-item list-group-item-action">
              🏢 Departments
            </button>

            <button className="list-group-item list-group-item-action">
              📊 Reports
            </button>

            <button className="list-group-item list-group-item-action">
              ⚙️ Settings
            </button>

          </div>

          <button className="btn btn-outline-danger w-100 mt-5">
            Logout
          </button>

        </div>

        {/* Main Content */}
        <div className="col-md-10 p-4">

          {/* Heading */}
          <div className="mb-4">

            <h2 className="fw-bold">
              Dashboard
            </h2>

            <p className="text-muted">
              Welcome back! Here's your employee overview.
            </p>

          </div>

          {/* Statistics Cards */}
          <div className="row g-4 mb-4">

            {/* Total Employees */}
            <div className="col-md-4">

              <div className="card border-0 shadow-sm h-100">

                <div className="card-body">

                  <div className="d-flex justify-content-between">

                    <div>

                      <p className="text-muted mb-1">
                        Total Employees
                      </p>

                      <h2 className="fw-bold mb-2">
                        {totalEmployees}
                      </h2>

                      <small className="text-success">
                        Current employees
                      </small>

                    </div>

                    <div className="fs-1">
                      👨‍💼
                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* Departments */}
            <div className="col-md-4">

              <div className="card border-0 shadow-sm h-100">

                <div className="card-body">

                  <div className="d-flex justify-content-between">

                    <div>

                      <p className="text-muted mb-1">
                        Departments
                      </p>

                      <h2 className="fw-bold mb-2">
                        {departments}
                      </h2>

                      <small className="text-primary">
                        Active departments
                      </small>

                    </div>

                    <div className="fs-1">
                      🏢
                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* Average Salary */}
            <div className="col-md-4">

              <div className="card border-0 shadow-sm h-100">

                <div className="card-body">

                  <div className="d-flex justify-content-between">

                    <div>

                      <p className="text-muted mb-1">
                        Average Salary
                      </p>

                      <h2 className="fw-bold mb-2">
                        ₹{Math.round(averageSalary)}
                      </h2>

                      <small className="text-info">
                        Average employee salary
                      </small>

                    </div>

                    <div className="fs-1">
                      💰
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Recent Employees */}
          <div className="card border-0 shadow-sm">

            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                  <h5 className="fw-bold mb-1">
                    Recent Employees
                  </h5>

                  <small className="text-muted">
                    Recently added employees
                  </small>

                </div>

                <Link
                  to="/employees"
                  className="btn btn-primary"
                >
                  View Employees
                </Link>

              </div>

              {/* No Employees */}
              {employees.length === 0 ? (

                <div className="text-center py-5">

                  <div className="fs-1 mb-3">
                    👨‍💼
                  </div>

                  <h5>
                    No employees found
                  </h5>

                  <p className="text-muted">
                    Add employees to see them here.
                  </p>

                  <Link
                    to="/employees"
                    className="btn btn-primary"
                  >
                    + Add Employee
                  </Link>

                </div>

              ) : (

                /* Employee Table */
                <div className="table-responsive">

                  <table className="table table-hover align-middle">

                    <thead className="table-light">

                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Position</th>
                        <th>Salary</th>
                      </tr>

                    </thead>

                    <tbody>

                      {employees
                        .slice(-5)
                        .reverse()
                        .map((employee) => (

                          <tr key={employee._id}>

                            <td className="fw-semibold">
                              {employee.name}
                            </td>

                            <td>
                              {employee.email}
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
  );
}

export default Dashboard;