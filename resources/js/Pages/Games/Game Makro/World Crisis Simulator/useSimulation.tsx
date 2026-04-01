import { useState } from "react";

export default function useSimulation(ideal) {
  const [values, setValues] = useState({
    interest: 20,
    tax: 38,
    spending: 40,
  });

  const updateValue = (key, val) => {
    setValues(prev => ({ ...prev, [key]: val }));
  };

  const calculateScore = () => {
    let diff =
      Math.abs(values.interest - ideal.interest) +
      Math.abs(values.tax - ideal.tax) +
      Math.abs(values.spending - ideal.spending);

    return Math.max(0, 100 - diff);
  };

  return { values, updateValue, calculateScore };
}
