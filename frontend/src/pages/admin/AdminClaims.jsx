import { useEffect, useState } from "react";
import AdminTable from "./AdminTable";
import {
  getAllClaims,
  updateClaimStatus,
} from "../../services/claimService";

const cols = [
  { key: "itemName", label: "Item Name" },
  { key: "claimedBy", label: "Claimed By" },
  { key: "date", label: "Date" },
  { key: "status", label: "Status" },
];

export default function AdminClaims() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadClaims = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllClaims();

      const formattedClaims = data.map((claim) => ({
        id: claim.id,
        itemName: claim.item_title || "Unknown Item",
        claimedBy:
          claim.user_email ||
          claim.user_phone ||
          "Unknown User",
        date: claim.created_at
          ? new Date(claim.created_at).toLocaleDateString()
          : "-",
        status: claim.status,
      }));

      setClaims(formattedClaims);
    } catch (err) {
      console.error(err);
      setError(
        err.message || "Failed to load claims."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClaims();
  }, []);

  const handleApprove = async (id) => {
    try {
      await updateClaimStatus(
        id,
        "approved",
        "Claim approved by admin"
      );

      await loadClaims();
    } catch (err) {
      setError(
        err.message || "Failed to approve claim."
      );
    }
  };

  const handleReject = async (id) => {
    try {
      await updateClaimStatus(
        id,
        "rejected",
        "Claim rejected by admin"
      );

      await loadClaims();
    } catch (err) {
      setError(
        err.message || "Failed to reject claim."
      );
    }
  };

  if (loading) {
    return (
      <div className="page">
        <p>Loading claims...</p>
      </div>
    );
  }

  return (
    <div className="page">
      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

      <AdminTable
        title="Claims"
        columns={cols}
        rows={claims}
      />

      {claims.length > 0 && (
        <div
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {claims
            .filter(
              (claim) => claim.status === "pending"
            )
            .map((claim) => (
              <div
                key={claim.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span>
                  Claim #{claim.id} — {claim.itemName}
                </span>

                <div
                  style={{
                    display: "flex",
                    gap: 8,
                  }}
                >
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      handleApprove(claim.id)
                    }
                  >
                    Approve
                  </button>

                  <button
                    className="btn btn-outline"
                    onClick={() =>
                      handleReject(claim.id)
                    }
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}