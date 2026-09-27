import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getItemById } from "../services/itemService";
import { createClaim } from "../services/claimService";

export default function ItemDetails() {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showClaimForm, setShowClaimForm] = useState(false);
  const [claimMessage, setClaimMessage] = useState("");
  const [proofDetails, setProofDetails] = useState("");

  const [claimError, setClaimError] = useState("");
  const [claimSuccess, setClaimSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadItem = async () => {
      try {
        setLoading(true);
        const data = await getItemById(id);
        setItem(data);
      } catch (error) {
        console.error(error);
        setItem(null);
      } finally {
        setLoading(false);
      }
    };

    loadItem();
  }, [id]);

  const handleClaim = async (e) => {
    e.preventDefault();

    setClaimError("");
    setClaimSuccess("");

    if (!claimMessage || !proofDetails) {
      setClaimError(
        "Please provide a claim message and identifying proof."
      );
      return;
    }

    try {
      setSubmitting(true);

      await createClaim({
        item_id: Number(id),
        message: claimMessage,
        proof_details: proofDetails,
      });

      setClaimSuccess(
        "Claim submitted successfully. An administrator will review it."
      );

      setClaimMessage("");
      setProofDetails("");
      setShowClaimForm(false);
    } catch (error) {
      setClaimError(
        error.message || "Failed to submit claim."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="page container center-page">
        <p>Loading item...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="page container center-page">
        <p>Item not found.</p>
      </div>
    );
  }

  const isLost = item.status === "Lost";
  const token = localStorage.getItem("reclaimr_token");

  return (
    <div className="page container">
      <Link
        to="/lost-found"
        style={{ color: "var(--text-muted)" }}
      >
        &larr; Back
      </Link>

      <div
        className="card"
        style={{
          maxWidth: 640,
          margin: "24px auto",
        }}
      >
        {item.image ? (
          <img
            src={item.image}
            alt={item.itemName}
            style={{
              width: "100%",
              height: 220,
              objectFit: "cover",
              borderRadius: 8,
              marginBottom: 20,
            }}
          />
        ) : (
          <div
            className="image-placeholder"
            style={{
              height: 220,
              marginBottom: 20,
            }}
          >
            [ ITEM IMAGE ]
          </div>
        )}

        <span
          className={`badge ${
            isLost ? "badge-lost" : "badge-found"
          }`}
        >
          {item.status}
        </span>

        <h2 style={{ margin: "12px 0" }}>
          {item.itemName}
        </h2>

        <p>
          <strong>Category:</strong> {item.category}
        </p>

        <p>
          <strong>Description:</strong>{" "}
          {item.description}
        </p>

        <p>
          <strong>Location:</strong> {item.location}
        </p>

        <p>
          <strong>Date/Time:</strong>{" "}
          {item.date}{" "}
          {item.time && `· ${item.time}`}
        </p>

        <p>
          <strong>Identifying Details:</strong>{" "}
          {item.identifyingDetails || "Not provided"}
        </p>

        {item.keptAt && (
          <p>
            <strong>Currently Kept At:</strong>{" "}
            {item.keptAt}
          </p>
        )}

        {item.contact && (
          <p>
            <strong>Contact:</strong> {item.contact}
          </p>
        )}

        {item.backendStatus === "claimed" && (
          <div
            className="form-success"
            style={{ marginTop: 20 }}
          >
            This item has already been claimed.
          </div>
        )}

        {item.backendStatus !== "claimed" && isLost && (
          <div style={{ marginTop: 24 }}>
            {!token ? (
              <p style={{ color: "var(--text-muted)" }}>
                Please log in to claim this item.
              </p>
            ) : (
              <>
                {!showClaimForm && (
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setShowClaimForm(true);
                      setClaimError("");
                      setClaimSuccess("");
                    }}
                  >
                    Claim This Item
                  </button>
                )}

                {showClaimForm && (
                  <form
                    onSubmit={handleClaim}
                    style={{ marginTop: 20 }}
                  >
                    <h3>Claim This Item</h3>

                    <p
                      style={{
                        fontSize: 14,
                        color: "var(--text-muted)",
                      }}
                    >
                      Provide information that proves
                      this item belongs to you.
                    </p>

                    <label>
                      Why are you claiming this item?
                    </label>

                    <textarea
                      rows={3}
                      value={claimMessage}
                      onChange={(e) =>
                        setClaimMessage(e.target.value)
                      }
                      placeholder="Explain why this item belongs to you..."
                      style={{
                        width: "100%",
                        marginTop: 8,
                        marginBottom: 16,
                      }}
                    />

                    <label>
                      Identifying Proof
                    </label>

                    <textarea
                      rows={3}
                      value={proofDetails}
                      onChange={(e) =>
                        setProofDetails(e.target.value)
                      }
                      placeholder="Describe unique details, serial number, marks, etc."
                      style={{
                        width: "100%",
                        marginTop: 8,
                        marginBottom: 16,
                      }}
                    />

                    {claimError && (
                      <div className="form-error">
                        {claimError}
                      </div>
                    )}

                    {claimSuccess && (
                      <div className="form-success">
                        {claimSuccess}
                      </div>
                    )}

                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                      }}
                    >
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={submitting}
                      >
                        {submitting
                          ? "Submitting..."
                          : "Submit Claim"}
                      </button>

                      <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() =>
                          setShowClaimForm(false)
                        }
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}