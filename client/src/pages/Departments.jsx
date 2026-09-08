import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Departments() {
  const [employees, setEmployees] = useState([]);

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

  // Get unique departments
  const departments = [
    ...new Set(employees.map((employee) => employee.department)),
  ];

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
                className="list-group-item list-group-item-action"
              >
                👨‍💼 Employees
              </Link>

              <Link
                to="/departments"
                className="list-group-item list-group-item-action active"
              >
                🏢 Departments
              </Link>

            </div>

          </div>

          {/* Main Content */}
          <div className="col-md-10 p-4">

            <div className="mb-4">
              <h2 className="fw-bold mb-1">
                Departments
              </h2>

              <p className="text-muted">
                Manage and view employee departments
              </p>
            </div>

            {/* Department Cards */}
            <div className="row">

              {departments.length === 0 ? (

                <div className="col-12">
                  <div className="card border-0 shadow-sm">
                    <div className="card-body text-center py-5">

                      <h5>No departments found</h5>

                      <p className="text-muted">
                        Add employees with departments to see them here.
                      </p>

                      <Link
                        to="/employees"
                        className="btn btn-primary"
                      >
                        Add Employee
                      </Link>

                    </div>
                  </div>
                </div>

              ) : (

                departments.map((department, index) => {

                  const departmentEmployees = employees.filter(
                    (employee) =>
                      employee.department === department
                  );

                  return (
                    <div
                      className="col-md-4 mb-4"
                      key={department}
                    >
                      <div className="card border-0 shadow-sm h-100">

                        <div className="card-body">

                          <div className="d-flex justify-content-between align-items-center mb-3">

                            <div
                              className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                              style={{
                                width: "50px",
                                height: "50px",
                                fontSize: "22px",
                              }}
                            >
                              🏢
                            </div>

                            <span className="badge bg-primary">
                              Department {index + 1}
                            </span>

                          </div>

                          <h4 className="fw-bold">
                            {department}
                          </h4>

                          <p className="text-muted mb-0">
                            {departmentEmployees.length} employee
                            {departmentEmployees.length !== 1
                              ? "s"
                              : ""}
                          </p>

                        </div>

                      </div>
                    </div>
                  );
                })

              )}

            </div>

          </div>

        </div>
      </div>

    </div>
  );
}

export default Departments;