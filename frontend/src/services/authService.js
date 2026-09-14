// Replace with real calls to POST /api/auth/login, POST /api/auth/register later.
const ADMIN_CREDENTIALS = { username: "Admin", password: "Admin123" };

export function loginUser({ email, password }) {
  return Promise.resolve({ success: true, user: { email, role: "Student" } });
}

export function registerUser({ email, password, phone, role }) {
  return Promise.resolve({ success: true, user: { email, phone, role } });
}

export function loginAdmin({ username, password }) {
  const ok = username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
  return Promise.resolve({ success: ok });
}
