import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import Button from "../components/Button";
import { reportLostItem } from "../services/itemService";
import { CATEGORIES } from "../data/mockData";

const CONTACT_METHODS = ["Registered Email", "Other Email", "Phone Number"];

export default function ReportLost() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    itemName: "", category: CATEGORIES[0], description: "", location: "",
    date: "", time: "", image: null, identifyingDetails: "",
    contactMethod: CONTACT_METHODS[0], contactValue: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!form.itemName || !form.description || !form.location) return setError("Please fill in all required fields.");
    if (!form.contactValue) return setError("Please provide contact information.");
    await reportLostItem(form);
    setSuccess("Lost item reported successfully!");
    setTimeout(() => navigate("/lost-found"), 700);
  };

  return (
    <div className="form-page-red">
      <div className="card form-card">
        <h2 style={{ marginBottom: 20 }}>Report a Lost Item</h2>
        <form onSubmit={handleSubmit}>
          <FormField label="Item Name">
            <input value={form.itemName} onChange={update("itemName")} />
          </FormField>
          <FormField label="Category">
            <select value={form.category} onChange={update("category")}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </FormField>
          <FormField label="Description">
            <textarea rows={3} value={form.description} onChange={update("description")} />
          </FormField>
          <FormField label="Where was the last time you saw it?">
            <input value={form.location} onChange={update("location")} />
          </FormField>
          <FormField label="When was the last time you saw it? (optional)">
            <div style={{ display: "flex", gap: 10 }}>
              <input type="date" value={form.date} onChange={update("date")} />
              <input type="time" value={form.time} onChange={update("time")} />
            </div>
          </FormField>
          <FormField label="Upload Image of the Item (optional)">
            <input type="file" onChange={(e) => setForm({ ...form, image: e.target.files[0] })} />
          </FormField>
          <FormField label="Identifying Details">
            <textarea rows={2} value={form.identifyingDetails} onChange={update("identifyingDetails")} />
          </FormField>

          <h4 style={{ margin: "20px 0 10px" }}>Contact</h4>
          <FormField label="How should we contact you?">
            <select value={form.contactMethod} onChange={update("contactMethod")}>
              {CONTACT_METHODS.map((m) => <option key={m}>{m}</option>)}
            </select>
          </FormField>
          <FormField label={form.contactMethod}>
            <input value={form.contactValue} onChange={update("contactValue")} />
          </FormField>

          {error && <div className="form-error">{error}</div>}
          {success && <div className="form-success">{success}</div>}
          <Button type="submit" variant="red" block>Report Lost Item</Button>
        </form>
      </div>
    </div>
  );
}
