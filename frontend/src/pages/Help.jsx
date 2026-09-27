import { useState } from "react";
import FormField from "../components/FormField";
import Button from "../components/Button";
import { sendSupportMessage } from "../services/supportService";

export default function Help() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ subject: "", message: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!form.subject || !form.message) return setError("Both fields are required.");
    await sendSupportMessage(form);
    setSuccess("Message sent! Our team will get back to you.");
    setForm({ subject: "", message: "" });
  };

  return (
    <div className="page container">
      <h1
        className="section-title"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700, letterSpacing: "0.02em" }}
      >
        Help Us
      </h1>

      <div className="card center-page" style={{ maxWidth: 480, margin: "0 auto 40px" }}>
        <h2>Support ReclaimR</h2>
        <p style={{ color: "var(--text-muted)", margin: "10px 0 20px" }}>
          Help us continue improving the campus lost & found experience.
        </p>
        <Button variant="primary" onClick={() => setShowModal(true)}>Donate</Button>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            <h3>Donations Unavailable</h3>
            <p style={{ marginTop: 10, color: "var(--text-muted)" }}>
              This is a prototype — donations are not yet enabled.
            </p>
          </div>
        </div>
      )}

      <div className="card" style={{ maxWidth: 480, margin: "0 auto" }}>
        <h2 style={{ marginBottom: 16 }}>Contact Support</h2>
        <form onSubmit={handleSend}>
          <FormField label="Subject">
            <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
          </FormField>
          <FormField label="Message">
            <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </FormField>
          {error && <div className="form-error">{error}</div>}
          {success && <div className="form-success">{success}</div>}
          <Button type="submit" block>Send Message</Button>
        </form>
      </div>
    </div>
  );
}
