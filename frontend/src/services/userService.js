// Replace with GET /api/users/me, PUT /api/users/me later.
import { mockUser } from "../data/mockData";

export function getCurrentUser() {
  return Promise.resolve(mockUser);
}

export function updateCurrentUser(updates) {
  return Promise.resolve({ ...mockUser, ...updates });
}
