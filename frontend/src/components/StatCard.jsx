export default function StatCard({ label, value, color }) {
  const colorMap = {
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    green: "bg-green-50 border-green-200 text-green-700",
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-700",
    red: "bg-red-50 border-red-200 text-red-700",
  };

  return (
    <div
      className={`rounded-lg border p-5 flex flex-col gap-1 ${colorMap[color] || colorMap.blue}`}
    >
      <span className="text-3xl font-bold">{value}</span>
      <span className="text-sm font-medium uppercase tracking-wide">
        {label}
      </span>
    </div>
  );
}
