import { useState } from "react";
import { loginUser } from "../api";

export default function Login({ setUser }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    householdSize: 3,
    city: "Delhi",
  });

  const submit = async () => {
    const user = await loginUser(form);
    setUser(user);
  };

  return (
    <div>
      <h2>GreenLedger Login</h2>
      <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} />
      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
      <button onClick={submit}>Enter</button>
    </div>
  );
}
