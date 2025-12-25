export default function FlagsList({ flags }) {
  if (!flags.length) return <p>No inefficiencies detected 🎉</p>;

  return (
    <div>
      <h3>Alerts</h3>
      <ul>
        {flags.map((f, i) => (
          <li key={i}>
            <strong>{f.type}</strong>: {f.reason}
          </li>
        ))}
      </ul>
    </div>
  );
}
