import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validPasscode = "OFFICE123";

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (passcode !== validPasscode) {
      setPasscodeError("Invalid passcode. Please contact your administrator.");
      setLoading(false);
      return;
    }

    setPasscodeError("");

    axios
      .post("http://localhost:3001/api/auth/login", { email, password, role })
      .then((result) => {
        setLoading(false);
        if (result.data.message === "Success") {
          localStorage.setItem(
            "user",
            JSON.stringify({
              email: email,
              role: result.data.role,
            })
          );
          sessionStorage.setItem("userRole", result.data.role);

          switch (result.data.role) {
            case "admin":
              navigate("/admin-dashboard");
              break;
            case "manager":
              navigate("/manager-dashboard");
              break;
            case "telecaller":
              navigate("/telecaller-dashboard");
              break;
            case "advisor":
              navigate("/advisor-dashboard");
              break;
            case "accountant":
              navigate("/accountant-dashboard");
              break;
            default:
              navigate("/");
          }
        } else {
          alert(result.data.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Left Side */}
      <div
        style={{
          flex: 1,
          background: "linear-gradient(135deg, #283048, #859398)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="animate__animated animate__fadeIn"
      >
        <div className="text-center p-5">
          <h1 className="display-4 mb-3 text-uppercase">Sanmitra Developers</h1>
          <p className="lead">Login with your credentials to access the dashboard</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ flex: 1, backgroundColor: "#f8f9fa" }}
      >
        <div
          className="bg-white p-5 rounded shadow-lg animate__animated animate__fadeInRight"
          style={{
            maxWidth: "450px",
            width: "100%",
            opacity: 0.95,
            borderRadius: "1rem",
            animation: "fadeIn 1.2s ease-out",
            boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.2)",
          }}
        >
          <h2 className="text-center text-primary mb-4 animate__animated animate__zoomIn">Login</h2>
          <form onSubmit={handleSubmit} className="animate__animated animate__fadeIn">
            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                autoComplete="off"
                className="form-control border-0 shadow-sm"
                style={{
                  height: "50px",
                  borderRadius: "0.5rem",
                  transition: "all 0.3s ease",
                }}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="form-control border-0 shadow-sm"
                style={{
                  height: "50px",
                  borderRadius: "0.5rem",
                  transition: "all 0.3s ease",
                }}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Role */}
            <div className="mb-3">
              <label htmlFor="role" className="form-label">
                <strong>Role</strong>
              </label>
              <select
                className="form-control border-0 shadow-sm"
                style={{
                  height: "50px",
                  borderRadius: "0.5rem",
                  transition: "all 0.3s ease",
                }}
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="telecaller">Telecaller</option>
                <option value="advisor">Advisor</option>
                <option value="accountant">Accountant</option>
              </select>
            </div>

            {/* Passcode */}
            <div className="mb-3">
              <label htmlFor="passcode" className="form-label">
                <strong>Passcode</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Office Passcode"
                className="form-control border-0 shadow-sm"
                style={{
                  height: "50px",
                  borderRadius: "0.5rem",
                  transition: "all 0.3s ease",
                }}
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                required
              />
              {passcodeError && (
                <p className="text-danger mt-2 animate__animated animate__shakeX">{passcodeError}</p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn btn-primary w-100 shadow-sm mt-3"
              style={{
                height: "50px",
                borderRadius: "0.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
            >
              {loading ? (
                <span
                  className="spinner-border spinner-border-sm text-light me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <p className="mt-4 text-center animate__animated animate__fadeIn">
            <Link to="/forgot-password" className="text-primary">
              Forgot Password?
            </Link>
          </p>
          <p className="text-center animate__animated animate__fadeIn">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
