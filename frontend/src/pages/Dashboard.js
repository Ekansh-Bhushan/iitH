import { useEffect, useState } from "react";
import { getDashboard } from "../api";
import AddUsage from "./AddUsage";
import FlagsList from "../components/FlagsList";

export default function Dashboard({ user }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    getDashboard(user.id).then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>Dashboard – {user.name}</h2>
      <p>Total CO₂ Impact: {data.estimatedCO2Impact} kg</p>

      <AddUsage userId={user.id} refresh={() => getDashboard(user.id).then(setData)} />
      <FlagsList flags={data.flags} />
    </div>
  );
}
