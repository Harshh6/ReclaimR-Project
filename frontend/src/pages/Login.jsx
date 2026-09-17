import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import Button from "../components/Button";
import { loginUser, registerUser, loginAdmin } from "../services/authService";
import { CATEGORIES } from "../data/mockData";

const ROLES = ["Student", "Faculty", "Visitor", "Admin"];

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login"); // login | signup | admin
  const [form, setForm] = useState({ email: "", password: "", phone: "", role: "Student", username: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!form.email || !form.password) return setError("Email and password are required.");
    if (!/\S+@\S+\.\S+/.test(form.email)) return setError("Enter a valid email.");
    const res = await loginUser(form);
    if (res.success) {
      localStorage.setItem("reclaimr-cookie-login-pending", "true");
      setSuccess("Login successful!");
      setTimeout(() => navigate("/home"), 400);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!form.email || !form.password || !form.phone) return setError("All fields are required.");
    if (!/\S+@\S+\.\S+/.test(form.email)) return setError("Enter a valid email.");
    if (!/^\d{10}$/.test(form.phone)) return setError("Enter a valid 10-digit phone number.");
    const res = await registerUser(form);
    if (res.success) {
      localStorage.setItem("reclaimr-cookie-login-pending", "true");
      setSuccess("Account created!");
      setTimeout(() => navigate("/home"), 400);
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    const res = await loginAdmin(form);
    if (res.success) { setSuccess("Admin login successful!"); setTimeout(() => navigate("/admin"), 400); }
    else setError("Invalid admin credentials.");
  };

  return (
    <div className="auth-page">
      <div className="card auth-card">
        <div className="auth-tabs">
          <button className={mode !== "admin" ? "active" : ""} onClick={() => setMode("login")}>User</button>
          <button className={mode === "admin" ? "active" : ""} onClick={() => setMode("admin")}>Admin</button>
        </div>

        {mode !== "admin" && (
          <form onSubmit={mode === "login" ? handleLogin : handleSignup}>
            <h2 style={{ marginBottom: 20 }}>{mode === "login" ? "Login" : "Sign Up"}</h2>
            <FormField label="Personal Email">
              <input type="email" value={form.email} onChange={update("email")} placeholder="you@campus.edu" />
            </FormField>
            <FormField label="Password">
              <input type="password" value={form.password} onChange={update("password")} placeholder="••••••••" />
            </FormField>
            {mode === "signup" && (
              <>
                <FormField label="Phone Number">
                  <input type="tel" value={form.phone} onChange={update("phone")} placeholder="10-digit number" />
                </FormField>
                <FormField label="Role">
                  <select value={form.role} onChange={update("role")}>
                    {ROLES.map((r) => <option key={r}>{r}</option>)}
                  </select>
                </FormField>
              </>
            )}
            {error && <div className="form-error">{error}</div>}
            {success && <div className="form-success">{success}</div>}
            <Button type="submit" block>{mode === "login" ? "Login" : "Sign Up"}</Button>
            <p className="auth-switch">
              {mode === "login" ? (
                <>New here? <span onClick={() => { setMode("signup"); setError(""); }}>Create an account</span></>
              ) : (
                <>Already have an account? <span onClick={() => { setMode("login"); setError(""); }}>Login</span></>
              )}
            </p>
          </form>
        )}

        {mode === "admin" && (
          <form onSubmit={handleAdminLogin}>
            <h2 style={{ marginBottom: 20 }}>Admin Login</h2>
            <FormField label="Admin Username">
              <input value={form.username} onChange={update("username")} placeholder="Admin" />
            </FormField>
            <FormField label="Admin Password">
              <input type="password" value={form.password} onChange={update("password")} placeholder="••••••••" />
            </FormField>
            {error && <div className="form-error">{error}</div>}
            {success && <div className="form-success">{success}</div>}
            <Button type="submit" block>Login as Admin</Button>
          </form>
        )}
      </div>
    </div>
  );
}
