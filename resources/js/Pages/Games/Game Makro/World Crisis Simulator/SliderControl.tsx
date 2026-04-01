export default function SliderControl({ label, value, onChange }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <div className="flex justify-between mb-2">
        <span>{label}</span>
        <span className="text-indigo-600 font-semibold">{value}%</span>
      </div>

      <input
        type="range"
        min="0"
        max="150"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-indigo-500"
      />
    </div>
  );
}
