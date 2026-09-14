import { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import Button from "../components/Button";
import FormField from "../components/FormField";
import { getCurrentUser, updateCurrentUser } from "../services/userService";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => { getCurrentUser().then((u) => { setUser(u); setForm(u); }); }, []);

  if (!user) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    const updated = await updateCurrentUser(form);
    setUser(updated);
    setEditing(false);
  };

  return (
    <div className="page container center-page">
      <h1 style={{ marginBottom: 24 }}>My Profile</h1>
      {!editing ? (
        <>
          <ProfileCard user={user} />
          <Button variant="outline" style={{ marginTop: 20 }} onClick={() => setEditing(true)}>Edit Profile</Button>
        </>
      ) : (
        <form onSubmit={handleSave} className="card" style={{ maxWidth: 420, width: "100%" }}>
          <FormField label="Email">
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </FormField>
          <FormField label="Phone">
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </FormField>
          <Button type="submit" block>Save</Button>
        </form>
      )}
    </div>
  );
}
