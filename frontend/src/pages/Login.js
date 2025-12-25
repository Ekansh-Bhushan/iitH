import { useState } from "react";
import { loginUser } from "../api";

export default function Login({ setUser }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    householdSize: 3,
    city: "Delhi",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    if (!form.email || !form.name) {
      setError("Name and email are required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const user = await loginUser(form);
      setUser(user);
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>GreenLedger</h1>
        <p style={styles.subtitle}>
          Track household resource usage and environmental impact
        </p>

        <div style={styles.field}>
          <label>Name</label>
          <input
            placeholder="Your full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div style={styles.field}>
          <label>Email</label>
          <input
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div style={styles.row}>
          <div style={styles.field}>
            <label>Household Size</label>
            <select
              value={form.householdSize}
              onChange={(e) =>
                setForm({ ...form, householdSize: Number(e.target.value) })
              }
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.field}>
            <label>City</label>
            <input
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
          </div>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <button style={styles.button} onClick={submit} disabled={loading}>
          {loading ? "Entering..." : "Enter Dashboard"}
        </button>

        <p style={styles.note}>
          No password required. This is a demo login.
        </p>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f5f7fa",
    fontFamily: "sans-serif",
  },
  card: {
    width: "380px",
    padding: "28px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  title: {
    margin: 0,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    fontSize: "14px",
    marginBottom: "20px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "14px",
  },
  row: {
    display: "flex",
    gap: "12px",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#1f7aed",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "13px",
    marginBottom: "8px",
  },
  note: {
    marginTop: "12px",
    fontSize: "12px",
    color: "#777",
    textAlign: "center",
  },
};
