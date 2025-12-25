import { useEffect, useState } from "react";
import { getDashboard } from "../api";
import AddUsage from "./AddUsage";
import FlagsList from "../components/FlagsList";

export default function Dashboard({ user }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    const res = await getDashboard(user.id);
    setData(res);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  if (loading || !data) {
    return <p style={{ padding: "20px" }}>Loading dashboard...</p>;
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>Dashboard</h1>
        <p style={styles.subtitle}>{user.name}</p>
      </header>

      {/* KPI Card */}
      <section style={styles.kpiCard}>
        <p style={styles.kpiLabel}>Total CO₂ Impact</p>
        <p style={styles.kpiValue}>{data.estimatedCO2Impact} kg</p>
        <p style={styles.kpiHint}>
          Estimated cumulative emissions based on recorded usage
        </p>
      </section>

      {/* Action + Alerts Grid */}
      <div style={styles.grid}>
        {/* Add Usage */}
        <section style={styles.card}>
          <AddUsage userId={user.id} refresh={refresh} />
        </section>

        {/* Alerts */}
        <section style={styles.card}>
          <h3 style={styles.sectionTitle}>Alerts</h3>
          {data.flags.length === 0 ? (
            <p style={styles.goodText}>No inefficiencies detected 🎉</p>
          ) : (
            <FlagsList flags={data.flags} />
          )}
        </section>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "24px",
    fontFamily: "sans-serif",
  },
  header: {
    marginBottom: "20px",
  },
  title: {
    margin: 0,
  },
  subtitle: {
    color: "#555",
    marginTop: "4px",
  },
  kpiCard: {
    padding: "20px",
    borderRadius: "10px",
    background: "#f5f7fa",
    marginBottom: "24px",
  },
  kpiLabel: {
    margin: 0,
    color: "#555",
  },
  kpiValue: {
    fontSize: "32px",
    fontWeight: "bold",
    margin: "8px 0",
  },
  kpiHint: {
    fontSize: "14px",
    color: "#777",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  card: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    background: "#fff",
  },
  sectionTitle: {
    marginBottom: "12px",
  },
  goodText: {
    color: "green",
    fontWeight: "500",
  },
};
