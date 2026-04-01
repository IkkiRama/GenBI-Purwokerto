export default function SectorGrid({ sectors, onSelect }) {
  return (
    <div className="p-10">
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold mb-2">
          Laboratorium Kebijakan Sektoral
        </h2>
        <p className="text-slate-400 text-sm">
          Analisis kasus strategis untuk menguji kebijakan makro Anda
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sectors.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            className="p-6 rounded-2xl text-left transition border border-slate-800 bg-slate-900/60 hover:border-blue-400 hover:bg-blue-500/5 hover:-translate-y-1"
          >
            <div className="text-3xl mb-3">{s.icon}</div>
            <div className="font-bold">{s.id}</div>
            <div className="text-xs text-slate-400">{s.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
