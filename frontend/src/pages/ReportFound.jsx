import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import Button from "../components/Button";
import { reportFoundItem } from "../services/itemService";
import { CATEGORIES } from "../data/mockData";

export default function ReportFound() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    itemName: "", category: CATEGORIES[0], description: "", location: "",
    date: "", time: "", keptAt: "", image: null, identifyingDetails: "",
    email: "", phone: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!form.itemName || !form.description || !form.location || !form.keptAt) return setError("Please fill in all required fields.");
    if (!form.email && !form.phone) return setError("Provide at least one contact method.");
    await reportFoundItem(form);
    setSuccess("Found item reported successfully!");
    setTimeout(() => navigate("/lost-found"), 700);
  };

  return (
    <div className="form-page-green">
      <div className="card form-card">
        <h2 style={{ marginBottom: 20 }}>Report a Found Item</h2>
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
          <FormField label="Where did you find it?">
            <input value={form.location} onChange={update("location")} />
          </FormField>
          <FormField label="Date Found">
            <input type="date" value={form.date} onChange={update("date")} />
          </FormField>
          <FormField label="Time (optional)">
            <input type="time" value={form.time} onChange={update("time")} />
          </FormField>
          <FormField label="Where is the item currently kept?">
            <input value={form.keptAt} onChange={update("keptAt")} />
          </FormField>
          <FormField label="Upload Image (optional)">
            <input type="file" onChange={(e) => setForm({ ...form, image: e.target.files[0] })} />
          </FormField>
          <FormField label="Identifying Details">
            <textarea rows={2} value={form.identifyingDetails} onChange={update("identifyingDetails")} />
          </FormField>

          <h4 style={{ margin: "20px 0 10px" }}>Contact</h4>
          <FormField label="Email">
            <input type="email" value={form.email} onChange={update("email")} />
          </FormField>
          <FormField label="Phone Number">
            <input type="tel" value={form.phone} onChange={update("phone")} />
          </FormField>

          {error && <div className="form-error">{error}</div>}
          {success && <div className="form-success">{success}</div>}
          <Button type="submit" variant="green" block>Report Found Item</Button>
        </form>
      </div>
    </div>
  );
}
