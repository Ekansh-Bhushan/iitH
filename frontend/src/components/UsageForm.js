import { useState } from "react";
import { addUsage } from "../api";

export default function UsageForm({ userId, onSuccess }) {
  const [form, setForm] = useState({
    resourceId: 1,
    month: 7,
    year: 2025,
    value: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submit = async () => {
    setError("");
    setSuccess("");

    if (!form.value || form.value <= 0) {
      setError("Please enter a valid usage value.");
      return;
    }

    try {
      setLoading(true);
      await addUsage({ ...form, userId });
      setSuccess("Usage recorded successfully.");
      onSuccess();
    } catch (err) {
      setError("Failed to submit usage.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Add Monthly Usage</h3>

      <label style={styles.label}>Resource</label>
      <select
        style={styles.input}
        value={form.resourceId}
        onChange={e =>
          setForm({ ...form, resourceId: Number(e.target.value) })
        }
      >
        <option value={1}>Electricity (kWh)</option>
        <option value={2}>Water (Liters)</option>
        <option value={3}>Fuel (INR)</option>
      </select>

      <label style={styles.label}>Month</label>
      <select
        style={styles.input}
        value={form.month}
        onChange={e =>
          setForm({ ...form, month: Number(e.target.value) })
        }
      >
        {[...Array(12)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {new Date(0, i).toLocaleString("default", { month: "long" })}
          </option>
        ))}
      </select>

      <label style={styles.label}>Year</label>
      <select
        style={styles.input}
        value={form.year}
        onChange={e =>
          setForm({ ...form, year: Number(e.target.value) })
        }
      >
        {[2024, 2025, 2026].map(y => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>

      <label style={styles.label}>Usage Value</label>
      <input
        type="number"
        placeholder="Enter usage"
        style={styles.input}
        value={form.value}
        onChange={e =>
          setForm({ ...form, value: Number(e.target.value) })
        }
      />

      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}

      <button
        style={styles.button}
        onClick={submit}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Usage"}
      </button>
    </div>
  );
}

/* ----------- Minimal Inline Styles ----------- */
const styles = {
  card: {
    maxWidth: "400px",
    padding: "16px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    marginBottom: "24px",
  },
  title: {
    marginBottom: "12px",
  },
  label: {
    display: "block",
    marginTop: "10px",
    fontWeight: "600",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginTop: "4px",
  },
  button: {
    marginTop: "16px",
    padding: "10px",
    width: "100%",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: "8px",
  },
  success: {
    color: "green",
    marginTop: "8px",
  },
};
