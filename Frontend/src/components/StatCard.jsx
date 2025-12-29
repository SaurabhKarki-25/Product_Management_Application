
export function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl font-bold text-blue-600">{value ?? 0}</p>
    </div>
  );
}
