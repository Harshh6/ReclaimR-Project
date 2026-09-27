import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import Button from "../components/Button";
import {
  loginUser,
  registerUser,
  loginAdmin,
} from "../services/authService";

const ROLES = ["Student", "Faculty", "Visitor"];

export default function Login() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    email: "",
    password: "",
    phone: "",
    role: "Student",
    username: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const update = (key) => (e) => {
    setForm({
      ...form,
      [key]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!form.email || !form.password) {
      return setError("Email and password are required.");
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      return setError("Enter a valid email.");
    }

    try {
      const res = await loginUser({
        email: form.email,
        password: form.password,
      });

      if (res.success) {
        setSuccess("Login successful!");

        setTimeout(() => {
          navigate("/home");
        }, 400);
      }
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!form.email || !form.password || !form.phone) {
      return setError("All fields are required.");
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      return setError("Enter a valid email.");
    }

    if (!/^\d{10}$/.test(form.phone)) {
      return setError("Enter a valid 10-digit phone number.");
    }

    try {
      const res = await registerUser({
        email: form.email,
        password: form.password,
        phone: form.phone,
        role: form.role,
      });

      if (res.success) {
        setSuccess("Account created!");

        setTimeout(() => {
          navigate("/home");
        }, 400);
      }
    } catch (err) {
      setError(err.message || "Registration failed.");
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!form.username || !form.password) {
      return setError("Username and password are required.");
    }

    try {
      const res = await loginAdmin({
        username: form.username,
        password: form.password,
      });

      if (res.success) {
        setSuccess("Admin login successful!");

        setTimeout(() => {
          navigate("/admin");
        }, 400);
      }
    } catch (err) {
      setError(err.message || "Invalid admin credentials.");
    }
  };

  return (
    <div className="auth-page">
      <div className="card auth-card">

        <div className="auth-tabs">
          <button
            className={mode !== "admin" ? "active" : ""}
            onClick={() => {
              setMode("login");
              setError("");
              setSuccess("");
            }}
          >
            User
          </button>

          <button
            className={mode === "admin" ? "active" : ""}
            onClick={() => {
              setMode("admin");
              setError("");
              setSuccess("");
            }}
          >
            Admin
          </button>
        </div>

        {mode !== "admin" && (
          <form
            onSubmit={mode === "login" ? handleLogin : handleSignup}
          >
            <h2 style={{ marginBottom: 20 }}>
              {mode === "login" ? "Login" : "Sign Up"}
            </h2>

            <FormField label="Personal Email">
              <input
                type="email"
                value={form.email}
                onChange={update("email")}
                placeholder="you@campus.edu"
              />
            </FormField>

            <FormField label="Password">
              <input
                type="password"
                value={form.password}
                onChange={update("password")}
                placeholder="••••••••"
              />
            </FormField>

            {mode === "signup" && (
              <>
                <FormField label="Phone Number">
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={update("phone")}
                    placeholder="10-digit number"
                  />
                </FormField>

                <FormField label="Role">
                  <select
                    value={form.role}
                    onChange={update("role")}
                  >
                    {ROLES.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </FormField>
              </>
            )}

            {error && (
              <div className="form-error">
                {error}
              </div>
            )}

            {success && (
              <div className="form-success">
                {success}
              </div>
            )}

            <Button type="submit" block>
              {mode === "login" ? "Login" : "Sign Up"}
            </Button>

            <p className="auth-switch">
              {mode === "login" ? (
                <>
                  New here?{" "}
                  <span
                    onClick={() => {
                      setMode("signup");
                      setError("");
                      setSuccess("");
                    }}
                  >
                    Create an account
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span
                    onClick={() => {
                      setMode("login");
                      setError("");
                      setSuccess("");
                    }}
                  >
                    Login
                  </span>
                </>
              )}
            </p>
          </form>
        )}

        {mode === "admin" && (
          <form onSubmit={handleAdminLogin}>
            <h2 style={{ marginBottom: 20 }}>
              Admin Login
            </h2>

            <FormField label="Admin Username">
              <input
                value={form.username}
                onChange={update("username")}
                placeholder="Admin"
              />
            </FormField>

            <FormField label="Admin Password">
              <input
                type="password"
                value={form.password}
                onChange={update("password")}
                placeholder="••••••••"
              />
            </FormField>

            {error && (
              <div className="form-error">
                {error}
              </div>
            )}

            {success && (
              <div className="form-success">
                {success}
              </div>
            )}

            <Button type="submit" block>
              Login as Admin
            </Button>
          </form>
        )}

      </div>
    </div>
  );
}