// Replace with GET /api/items, POST /api/items/lost, POST /api/items/found later.
import { lostItems, foundItems } from "../data/mockData";

export function getAllItems() {
  return Promise.resolve([...lostItems, ...foundItems]);
}

export function getItemById(id) {
  const item = [...lostItems, ...foundItems].find((i) => i.id === id);
  return Promise.resolve(item || null);
}

export function reportLostItem(data) {
  return Promise.resolve({ success: true, item: { id: "l" + Date.now(), status: "Lost", ...data } });
}

export function reportFoundItem(data) {
  return Promise.resolve({ success: true, item: { id: "f" + Date.now(), status: "Found", ...data } });
}
