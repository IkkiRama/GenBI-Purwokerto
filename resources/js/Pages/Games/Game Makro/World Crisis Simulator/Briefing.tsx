export default function Briefing({ scenario, onNext }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow max-w-3xl mx-auto">

      <h2 className="text-xl font-bold mb-2">
        Laporan Analisis Makro
      </h2>

      <p className="text-gray-500 mb-4">
        Kasus Historis #{scenario.id}
      </p>

      <h3 className="text-2xl font-semibold mb-4">
        {scenario.title}
      </h3>

      <p className="text-gray-700 mb-6">
        {scenario.description}
      </p>

      <button
        onClick={onNext}
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold"
      >
        Masuk ke Ruang Kebijakan
      </button>
    </div>
  );
}
