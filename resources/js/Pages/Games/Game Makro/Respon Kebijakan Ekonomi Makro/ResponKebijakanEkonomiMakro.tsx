import { useState } from "react";
import GameScreen from "./GameScreen";
import ResultModal from "./ResultModal";
import SectorGrid from "./SectorGrid";
import FinalModal from "./FinalModal";
import { SECTORS, SCENARIOS } from './data';

export default function ResponKebijakanEkonomiMakro() {
  const [screen, setScreen] = useState("home");
  const [sector, setSector] = useState("");
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [confidence, setConfidence] = useState(50);
  const [result, setResult] = useState(null);

  const [scores, setScores] = useState([]);
  const [finalResult, setFinalResult] = useState(null);

  const question = SCENARIOS[sector]?.[step];

  const startGame = (s) => {
    setSector(s);
    setScreen("game");
    setStep(0);
  };

    const submit = () => {
        const base = selected.s;

        // confidence influence (lebih halus & realistis)
        const confidenceFactor = 0.7 + (confidence / 100) * 0.3;

        const score = Math.round(base * confidenceFactor);

        setScores((prev) => [...prev, score]);

        setResult({
            score,
            status: score >= 85 ? "Excellent" : score >= 70 ? "Good" : "Needs Improvement",
            feedback: selected.f,
            ideal: question.i,
        });
    };

    const next = () => {
        const total = SCENARIOS[sector]?.length || 0;

        if (step + 1 >= total) {
            // HITUNG FINAL
            const sum = scores.reduce((a, b) => a + b, 0);
            const avg = Math.round(sum / scores.length);

            setFinalResult({
            avg,
            total: scores.length,
            status:
                avg >= 85
                ? "Master Strategist"
                : avg >= 70
                ? "Competent Analyst"
                : "Policy Beginner",
            });

            setResult(null);
            return;
        }

        setResult(null);
        setSelected(null);
        setStep((prev) => prev + 1);
    };

    const avgScore =
        scores.length > 0
            ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
            : 0;
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex justify-center">
      <div className="w-full max-w-5xl border-x border-slate-900">

        {screen === "home" && (
          <SectorGrid sectors={SECTORS} onSelect={startGame} />
        )}

        {screen === "game" && question && (
          <GameScreen
            question={question}
            step={step}
            selected={selected}
            setSelected={setSelected}
            confidence={confidence}
            setConfidence={setConfidence}
            onSubmit={submit}
            avgScore={avgScore}
          />
        )}

        <ResultModal result={result} onNext={next} />
        <FinalModal
            data={finalResult}
            onReset={() => {
                setScreen("home");
                setSector("");
                setStep(0);
                setSelected(null);
                setResult(null);
                setScores([]);
                setFinalResult(null);
            }}
        />

      </div>
    </div>
  );
}
