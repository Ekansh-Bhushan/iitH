import UsageForm from "../components/UsageForm";

export default function AddUsage({ userId, refresh }) {
  return (
    <div>
      <h3>Add Monthly Usage</h3>
      <UsageForm userId={userId} onSuccess={refresh} />
    </div>
  );
}
