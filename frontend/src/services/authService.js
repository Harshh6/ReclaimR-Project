const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://reclaimr-project.onrender.com/api/auth";

export async function loginUser({ email, password }) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Login failed");
  }

  localStorage.setItem("reclaimr_token", data.token);

  return data;
}

export async function registerUser({ email, password, phone, role }) {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      phone,
      role,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Registration failed");
  }

  return data;
}

export async function loginAdmin({ username, password }) {
  const response = await fetch(`${API_BASE_URL}/admin-login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Admin login failed");
  }

  localStorage.setItem("reclaimr_token", data.token);

  return data;
}