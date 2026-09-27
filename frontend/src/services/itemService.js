const API_BASE_URL =
  import.meta.env.VITE_API_ITEMS_URL ||
  "https://reclaimr-project.onrender.com/api/items";

function toFrontendItem(item) {
  let contact = item.contact || "";

  if (!contact) {
    if (item.contact_method && item.contact_value) {
      contact = `${item.contact_method}: ${item.contact_value}`;
    } else if (item.email) {
      contact = item.email;
    } else if (item.phone) {
      contact = item.phone;
    }
  }

  return {
    id: String(item.id),
    itemName: item.title || "",
    category: item.category || "",
    description: item.description || "",
    location: item.location || "",
    date: item.date ? String(item.date).slice(0, 10) : "",
    time: item.time || "",
    image: item.image_url || null,
    identifyingDetails: item.identifying_details || "",
    keptAt: item.kept_at || "",
    contact,
    contactMethod: item.contact_method || "",
    contactValue: item.contact_value || "",
    email: item.email || "",
    phone: item.phone || "",
    status: item.type === "lost" ? "Lost" : "Found",
    backendStatus: item.status || "active",
  };
}

function toBackendItem(data, type) {
  return {
    title: data.itemName,
    description: data.description,
    category: data.category,
    type,
    location: data.location,
    date: data.date || null,
    time: data.time || null,
    status: "active",
    image_url: data.image_url || null,
    identifying_details: data.identifyingDetails || null,
    kept_at: data.keptAt || null,
    contact_method: data.contactMethod || null,
    contact_value: data.contactValue || null,
    email: data.email || null,
    phone: data.phone || null,
  };
}

export async function getAllItems() {
  const response = await fetch(API_BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch items");
  }

  const items = await response.json();

  return items.map(toFrontendItem);
}

export async function getItemById(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch item");
  }

  const item = await response.json();

  return toFrontendItem(item);
}

export async function reportLostItem(data) {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toBackendItem(data, "lost")),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Failed to report lost item");
  }

  return {
    success: true,
    item: toFrontendItem(result),
  };
}

export async function reportFoundItem(data) {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toBackendItem(data, "found")),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Failed to report found item");
  }

  return {
    success: true,
    item: toFrontendItem(result),
  };
}