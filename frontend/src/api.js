const BASE_URL = "http://localhost:5001";

export async function loginUser(data) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function addUsage(data) {
  const res = await fetch(`${BASE_URL}/usage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getDashboard(userId) {
  const res = await fetch(`${BASE_URL}/dashboard/${userId}`);
  return res.json();
}
