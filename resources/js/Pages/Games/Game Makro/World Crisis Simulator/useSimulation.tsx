import { useState } from "react";

export default function useSimulation() {
  const [values, setValues] = useState({
    interest: 10,
    tax: 20,
    spending: 30,
  });

  const reset = (ideal) => {
    setValues({
      interest: ideal.interest - 10,
      tax: ideal.tax - 10,
      spending: ideal.spending - 10,
    });
  };

  const updateValue = (key, val) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  const calculateScore = (ideal) => {
    let diff =
      Math.abs(values.interest - ideal.interest) +
      Math.abs(values.tax - ideal.tax) +
      Math.abs(values.spending - ideal.spending);

    return Math.max(0, 100 - diff);
  };

  return { values, updateValue, calculateScore, reset };
}
