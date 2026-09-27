const API_BASE_URL =
  import.meta.env.VITE_API_CLAIMS_URL ||
  "https://reclaimr-project.onrender.com/api/claims";

function getToken() {
  return localStorage.getItem("reclaimr_token");
}

function authHeaders() {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    ...(token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {}),
  };
}

export async function createClaim({
  item_id,
  message,
  proof_details,
}) {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      item_id,
      message,
      proof_details,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || "Failed to submit claim"
    );
  }

  return data;
}

export async function getMyClaims() {
  const response = await fetch(
    `${API_BASE_URL}/my`,
    {
      headers: authHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || "Failed to fetch claims"
    );
  }

  return data;
}

export async function getAllClaims() {
  const response = await fetch(API_BASE_URL, {
    headers: authHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || "Failed to fetch claims"
    );
  }

  return data;
}

export async function getClaimById(id) {
  const response = await fetch(
    `${API_BASE_URL}/${id}`,
    {
      headers: authHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || "Failed to fetch claim"
    );
  }

  return data;
}

export async function updateClaimStatus(
  id,
  status,
  admin_note = ""
) {
  const response = await fetch(
    `${API_BASE_URL}/${id}/status`,
    {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({
        status,
        admin_note,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || "Failed to update claim"
    );
  }

  return data;
}