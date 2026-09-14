import { useState } from "react";
import FormField from "../../components/FormField";
import Button from "../../components/Button";

export default function AdminSettings() {
  const [siteName, setSiteName] = useState("ReclaimR");
  const [saved, setSaved] = useState(false);

  return (
    <div>
      <h1 style={{ marginBottom: 20 }}>Settings</h1>
      <div className="card" style={{ maxWidth: 420 }}>
        <FormField label="Site Name">
          <input value={siteName} onChange={(e) => setSiteName(e.target.value)} />
        </FormField>
        <Button onClick={() => setSaved(true)}>Save</Button>
        {saved && <div className="form-success">Settings saved.</div>}
      </div>
    </div>
  );
}
