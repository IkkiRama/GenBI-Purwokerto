export default function GameScreen({
  question,
  step,
  selected,
  setSelected,
  confidence,
  setConfidence,
  onSubmit,
  avgScore
}) {
  return (
    <div className="p-8 flex flex-col min-h-screen">
        <div className="flex justify-between">
            <div className="mb-10">
                <h2 className="text-3xl font-extrabold mb-2">
                Laboratorium Kebijakan Sektoral
                </h2>
                <p className="text-slate-400 text-sm">
                Analisis kasus strategis untuk menguji kebijakan makro Anda
                </p>
            </div>

            <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-800 px-4 py-2 rounded-xl">
                {/* TEXT */}
                <div className="flex flex-col text-xs">
                    <span className="text-slate-400">Avg Score</span>
                    <span className="text-white font-bold text-sm">
                    {avgScore}%
                    </span>
                </div>

                {/* PROGRESS BAR */}
                <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                    className={`h-full transition-all ${
                        avgScore >= 75
                        ? "bg-green-500"
                        : avgScore >= 50
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${avgScore}%` }}
                    />
                </div>
            </div>
        </div>


      {/* HEADER */}
      <div className="mb-6">
        <div className="flex gap-2 mb-3">
          <span className="text-xs bg-white/10 px-3 py-1 rounded-full">
            ANALISIS
          </span>
          <span className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1 rounded border border-blue-500/30">
            STEP {step + 1}
          </span>
        </div>

        <h2 className="text-2xl font-black mb-4 uppercase italic">
          {question.t}
        </h2>

        <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-300">
          {question.d}
        </div>
      </div>

      {/* OPTIONS */}
      <div className="space-y-3 mb-8">
        {question.o.map((opt, i) => (
          <button
            key={i}
            onClick={() => setSelected(opt)}
            className={`w-full p-4 rounded-xl border text-left transition ${
              selected?.t === opt.t
                ? "border-blue-400 bg-blue-500/10"
                : "border-slate-800 bg-slate-900"
            }`}
          >
            {opt.t}
          </button>
        ))}
      </div>

      {/* FOOTER */}
      <div className="mt-auto border-t border-slate-900 pt-6">
        <div className="flex justify-between text-xs mb-2">
          <span>Confidence</span>
          <span className="text-blue-400">{confidence}%</span>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={confidence}
          onChange={(e) => setConfidence(Number(e.target.value))}
          className="w-full mb-6"
        />

        <button
          onClick={onSubmit}
          disabled={!selected}
          className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-xl disabled:opacity-20"
        >
          Submit Decision
        </button>
      </div>
    </div>
  );
}
