import { useState } from "react";
import scenarios from './scenarios';
import Controls from "./Controls";
import Result from "./Result";
import useSimulation from "./useSimulation";

export default function WorldCrisisSimulator() {
  const [phase, setPhase] = useState("controls");

  const { values, updateValue, calculateScore } =
    useSimulation(scenarios.ideal);

  const handleSubmit = () => {
    setPhase("result");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {phase === "controls" && (
        <Controls
          values={values}
          updateValue={updateValue}
          onSubmit={handleSubmit}
        />
      )}

      {phase === "result" && (
        <Result
          score={calculateScore()}
          values={values}
          ideal={scenarios.ideal}
        />
      )}
    </div>
  );
}
