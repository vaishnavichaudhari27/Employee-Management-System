import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Departments from "./pages/Departments";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Employees */}
        <Route path="/employees" element={<Employees />} />

        {/* Departments */}
        <Route path="/departments" element={<Departments />} />

        {/* Reports */}
        <Route path="/reports" element={<Reports />} />

        <Route path="/register" element={<Register />} />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="container text-center mt-5">
              <h2>404</h2>
              <p>Page not found</p>
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;