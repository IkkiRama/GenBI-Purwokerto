export default function ResultModal({ result, onNext }) {
  if (!result) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-lg w-full">
        <h2 className="text-xl font-black mb-2">{result.status}</h2>

        <p className="text-3xl font-mono mb-4">{result.score}</p>

        <p className="text-slate-300 mb-4">{result.feedback}</p>

        <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded mb-4">
          <p className="text-xs text-blue-400 mb-1">
            Rekomendasi Ideal
          </p>
          <p className="italic">{result.ideal}</p>
        </div>

        <button
          onClick={onNext}
          className="w-full bg-white text-black py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
