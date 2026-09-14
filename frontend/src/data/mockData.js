export const CATEGORIES = ["Electronics", "Documents", "Clothing", "Accessories", "Books", "Keys", "Other"];

export const mockUser = {
  id: "u1",
  email: "student@campus.edu",
  phone: "9876543210",
  role: "Student",
  profileImage: null,
};

export const lostItems = [
  { id: "l1", itemName: "Blue Backpack", category: "Accessories", description: "Navy blue backpack with laptop inside.", location: "Library Block A", date: "2026-09-01", time: "14:30", image: null, identifyingDetails: "Has a keychain on zipper.", contact: "student1@campus.edu", status: "Lost" },
  { id: "l2", itemName: "iPhone 13", category: "Electronics", description: "Black iPhone 13, cracked screen corner.", location: "Canteen", date: "2026-09-03", time: "13:00", image: null, identifyingDetails: "Sticker of a cat on back.", contact: "9876500001", status: "Lost" },
  { id: "l3", itemName: "Student ID Card", category: "Documents", description: "College ID card.", location: "Sports Ground", date: "2026-09-05", time: "17:00", image: null, identifyingDetails: "Name: Rohan K.", contact: "rohan@campus.edu", status: "Lost" },
  { id: "l4", itemName: "Water Bottle", category: "Other", description: "Steel bottle, green color.", location: "Auditorium", date: "2026-09-06", time: "11:00", image: null, identifyingDetails: "Dent on bottom.", contact: "9876500002", status: "Lost" },
  { id: "l5", itemName: "Set of Keys", category: "Keys", description: "Bike keys with red keychain.", location: "Parking Lot", date: "2026-09-07", time: "09:15", image: null, identifyingDetails: "3 keys on ring.", contact: "9876500003", status: "Lost" },
];

export const foundItems = [
  { id: "f1", itemName: "Calculator", category: "Electronics", description: "Casio scientific calculator.", location: "Room 204", date: "2026-09-02", time: "10:00", keptAt: "Admin Office", image: null, identifyingDetails: "Name written inside cover.", contact: "found1@campus.edu", status: "Found" },
  { id: "f2", itemName: "Umbrella", category: "Other", description: "Black folding umbrella.", location: "Main Gate", date: "2026-09-04", time: "16:20", keptAt: "Security Desk", image: null, identifyingDetails: "Broken one rib.", contact: "9876500004", status: "Found" },
  { id: "f3", itemName: "Notebook", category: "Books", description: "Physics notebook, semester 3.", location: "Lecture Hall 2", date: "2026-09-05", time: "12:00", keptAt: "Faculty Room", image: null, identifyingDetails: "Name on first page.", contact: "9876500005", status: "Found" },
  { id: "f4", itemName: "Wrist Watch", category: "Accessories", description: "Silver analog watch.", location: "Cafeteria", date: "2026-09-06", time: "13:45", keptAt: "Admin Office", image: null, identifyingDetails: "Scratches on strap.", contact: "found2@campus.edu", status: "Found" },
  { id: "f5", itemName: "Earphones", category: "Electronics", description: "White wired earphones in case.", location: "Library Block B", date: "2026-09-08", time: "15:00", keptAt: "Library Desk", image: null, identifyingDetails: "Case has a small dent.", contact: "9876500006", status: "Found" },
];

export const founders = [
  { name: "Rashi Nema", role: "Role to be added", image: null },
  { name: "Harsh Sinha", role: "Role to be added", image: null },
  { name: "Kavya Chheda", role: "Role to be added", image: null },
  { name: "Shauryadeep Srivastava", role: "Role to be added", image: null },
];

export const mentor = { name: "Dr. Sheetal Patil", role: "Mentor", image: null };

export const adminStats = {
  lostItems: lostItems.length,
  foundItems: foundItems.length,
  pendingClaims: 3,
  recoveredItems: 6,
  totalUsers: 128,
};

export const adminClaims = [
  { id: "c1", itemName: "iPhone 13", claimedBy: "Rohan K.", date: "2026-09-08", status: "Pending" },
  { id: "c2", itemName: "Calculator", claimedBy: "Aditi S.", date: "2026-09-07", status: "Verified" },
  { id: "c3", itemName: "Notebook", claimedBy: "Meera P.", date: "2026-09-06", status: "Pending" },
];

export const adminUsers = [
  { id: "u1", email: "student@campus.edu", role: "Student", phone: "9876543210" },
  { id: "u2", email: "faculty@campus.edu", role: "Faculty", phone: "9876543211" },
  { id: "u3", email: "visitor@campus.edu", role: "Visitor", phone: "9876543212" },
];

export const recoveredItems = [
  { id: "r1", itemName: "Umbrella", recoveredBy: "Aman T.", date: "2026-09-09" },
  { id: "r2", itemName: "Wallet", recoveredBy: "Priya D.", date: "2026-09-05" },
];

export const activityLogs = [
  { id: "a1", action: "User registered", date: "2026-09-10" },
  { id: "a2", action: "Lost item reported", date: "2026-09-09" },
  { id: "a3", action: "Found item reported", date: "2026-09-08" },
  { id: "a4", action: "Claim submitted", date: "2026-09-07" },
  { id: "a5", action: "Item verified", date: "2026-09-06" },
  { id: "a6", action: "Item recovered", date: "2026-09-05" },
];
