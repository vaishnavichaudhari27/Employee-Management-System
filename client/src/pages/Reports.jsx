import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Reports() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/api/employees",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const employeeData = Array.isArray(response.data)
        ? response.data
        : response.data.employees || [];

      setEmployees(employeeData);
    } catch (error) {
      console.error("Error fetching employees:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    }
  };

  // Total employees
  const totalEmployees = employees.length;

  // Total departments
  const departments = [
    ...new Set(
      employees.map((employee) => employee.department)
    ),
  ];

  const totalDepartments = departments.length;

  // Total salary
  const totalSalary = employees.reduce(
    (total, employee) =>
      total + Number(employee.salary || 0),
    0
  );

  // Average salary
  const averageSalary =
    totalEmployees > 0
      ? Math.round(totalSalary / totalEmployees)
      : 0;

  // Department-wise employee count
  const departmentReport = departments.map((department) => {
    const departmentEmployees = employees.filter(
      (employee) => employee.department === department
    );

    const departmentSalary = departmentEmployees.reduce(
      (total, employee) =>
        total + Number(employee.salary || 0),
      0
    );

    return {
      department,
      employees: departmentEmployees.length,
      salary: departmentSalary,
    };
  });

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
                className="list-group-item list-group-item-action"
              >
                🏢 Departments
              </Link>

              <Link
                to="/reports"
                className="list-group-item list-group-item-action active"
              >
                📊 Reports
              </Link>

            </div>

          </div>

          {/* Main Content */}
          <div className="col-md-10 p-4">

            {/* Header */}
            <div className="mb-4">
              <h2 className="fw-bold mb-1">
                Reports
              </h2>

              <p className="text-muted">
                Employee and salary reports
              </p>
            </div>

            {/* Summary Cards */}
            <div className="row mb-4">

              <div className="col-md-3 mb-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <h6 className="text-muted">
                      Total Employees
                    </h6>

                    <h2 className="fw-bold">
                      {totalEmployees}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="col-md-3 mb-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <h6 className="text-muted">
                      Departments
                    </h6>

                    <h2 className="fw-bold">
                      {totalDepartments}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="col-md-3 mb-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <h6 className="text-muted">
                      Total Salary
                    </h6>

                    <h2 className="fw-bold">
                      ₹{totalSalary}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="col-md-3 mb-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <h6 className="text-muted">
                      Average Salary
                    </h6>

                    <h2 className="fw-bold">
                      ₹{averageSalary}
                    </h2>
                  </div>
                </div>
              </div>

            </div>

            {/* Department Report */}
            <div className="card border-0 shadow-sm mb-4">

              <div className="card-body">

                <h5 className="fw-bold mb-4">
                  Department-wise Report
                </h5>

                {departmentReport.length === 0 ? (

                  <div className="text-center py-4">
                    <h6>No report data available</h6>

                    <p className="text-muted">
                      Add employees to generate reports.
                    </p>
                  </div>

                ) : (

                  <div className="table-responsive">

                    <table className="table table-hover align-middle">

                      <thead className="table-light">

                        <tr>
                          <th>Department</th>
                          <th>Employees</th>
                          <th>Total Salary</th>
                          <th>Average Salary</th>
                        </tr>

                      </thead>

                      <tbody>

                        {departmentReport.map((item) => (

                          <tr key={item.department}>

                            <td className="fw-semibold">
                              {item.department}
                            </td>

                            <td>
                              {item.employees}
                            </td>

                            <td>
                              ₹{item.salary}
                            </td>

                            <td>
                              ₹
                              {Math.round(
                                item.salary /
                                item.employees
                              )}
                            </td>

                          </tr>

                        ))}

                      </tbody>

                    </table>

                  </div>

                )}

              </div>

            </div>

            {/* Employee Salary Report */}
            <div className="card border-0 shadow-sm">

              <div className="card-body">

                <h5 className="fw-bold mb-4">
                  Employee Salary Report
                </h5>

                {employees.length === 0 ? (

                  <div className="text-center py-4">
                    <p className="text-muted">
                      No employees available.
                    </p>
                  </div>

                ) : (

                  <div className="table-responsive">

                    <table className="table table-hover align-middle">

                      <thead className="table-light">

                        <tr>
                          <th>Name</th>
                          <th>Department</th>
                          <th>Position</th>
                          <th>Salary</th>
                        </tr>

                      </thead>

                      <tbody>

                        {employees.map((employee) => (

                          <tr key={employee._id}>

                            <td className="fw-semibold">
                              {employee.name}
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

    </div>
  );
}

export default Reports;