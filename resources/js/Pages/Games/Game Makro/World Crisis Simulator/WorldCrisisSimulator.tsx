import { useState } from "react";
import useSimulation from "./useSimulation";
import scenarios from './scenarios';
import Landing from "./Landing";
import Briefing from "./Briefing";
import PolicyRoom from "./PolicyRoom";
import Result from "./Result";

export default function WorldCrisisSimulator() {
  const [page, setPage] = useState("landing");
  const [scenario, setScenario] = useState(null);

  const { values, updateValue, calculateScore, reset } =
    useSimulation();

  const startSimulation = () => {
    const random =
      scenarios[Math.floor(Math.random() * scenarios.length)];
    setScenario(random);
    reset(random.ideal);
    setPage("briefing");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      {page === "landing" && (
        <Landing onStart={startSimulation} />
      )}

      {page === "briefing" && scenario && (
        <Briefing
          scenario={scenario}
          onNext={() => setPage("policy")}
        />
      )}

      {page === "policy" && scenario && (
        <PolicyRoom
          scenario={scenario}
          values={values}
          updateValue={updateValue}
          onSubmit={() => setPage("result")}
        />
      )}

      {page === "result" && scenario && (
        <Result
          scenario={scenario}
          score={calculateScore(scenario.ideal)}
          values={values}
        />
      )}
    </div>
  );
}
