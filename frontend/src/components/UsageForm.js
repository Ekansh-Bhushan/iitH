import { useState } from "react";
import { addUsage } from "../api";

export default function UsageForm({ userId, onSuccess }) {
  const [form, setForm] = useState({
    resourceId: 1,
    month: 6,
    year: 2025,
    value: 0,
  });

  const submit = async () => {
    await addUsage({ ...form, userId });
    onSuccess();
  };

  return (
    <div>
      <select onChange={e => setForm({...form, resourceId: Number(e.target.value)})}>
        <option value="1">Electricity</option>
        <option value="2">Water</option>
        <option value="3">Fuel</option>
      </select>

      <input type="number" placeholder="Usage Value"
        onChange={e => setForm({...form, value: Number(e.target.value)})} />

      <button onClick={submit}>Submit Usage</button>
    </div>
  );
}
