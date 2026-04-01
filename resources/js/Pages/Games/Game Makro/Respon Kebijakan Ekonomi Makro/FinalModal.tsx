export default function FinalModal({ data, onReset }) {
  if (!data) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-slate-900 p-6 rounded-xl max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-2">
          {data.status}
        </h2>

        <p className="mb-2 text-lg">
          Skor Rata-rata: <span className="text-blue-400">{data.avg}</span>
        </p>

        <p className="text-slate-400 mb-6">
          Dari {data.total} skenario yang diselesaikan
        </p>

        <button
          onClick={onReset}
          className="w-full bg-white text-black py-2 rounded"
        >
          Kembali ke Home
        </button>
      </div>
    </div>
  );
}
