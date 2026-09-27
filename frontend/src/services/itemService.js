const API_BASE_URL =
  import.meta.env.VITE_API_ITEMS_URL ||
  "https://reclaimr-project.onrender.com/api/items";

function getImageDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve(null);
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = () => {
      reject(new Error("Failed to read image"));
    };

    reader.readAsDataURL(file);
  });
}

async function compressImage(file) {
  if (!file) {
    return null;
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Please select a valid image file.");
  }

  const maxSize = 1200;

  const dataUrl = await getImageDataUrl(file);

  const image = new Image();

  image.src = dataUrl;

  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
  });

  let width = image.width;
  let height = image.height;

  if (width > maxSize || height > maxSize) {
    if (width > height) {
      height = Math.round((height * maxSize) / width);
      width = maxSize;
    } else {
      width = Math.round((width * maxSize) / height);
      height = maxSize;
    }
  }

  const canvas = document.createElement("canvas");

  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");

  context.drawImage(image, 0, 0, width, height);

  return canvas.toDataURL("image/jpeg", 0.75);
}

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

async function toBackendItem(data, type) {
  const imageUrl = await compressImage(data.image);

  return {
    title: data.itemName,
    description: data.description,
    category: data.category,
    type,
    location: data.location,
    date: data.date || null,
    time: data.time || null,
    status: "active",
    image_url: imageUrl,
    identifying_details: data.identifyingDetails || null,
    kept_at: data.keptAt || null,
    contact: null,
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
    body: JSON.stringify(
      await toBackendItem(data, "lost")
    ),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.error || "Failed to report lost item"
    );
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
    body: JSON.stringify(
      await toBackendItem(data, "found")
    ),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.error || "Failed to report found item"
    );
  }

  return {
    success: true,
    item: toFrontendItem(result),
  };
}