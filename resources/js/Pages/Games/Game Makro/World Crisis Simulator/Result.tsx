export default function Result({ scenario, score, values }) {
  const ideal = scenario.ideal;

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-2xl mx-auto">

      <h2 className="text-2xl font-bold mb-4">
        Hasil Analisis Kebijakan
      </h2>

      <div className="grid grid-cols-3 gap-4 text-center">

        <div>
          <p>Moneter</p>
          <p>{values.interest}%</p>
          <p className="text-xs text-gray-500">
            ideal {ideal.interest}%
          </p>
        </div>

        <div>
          <p>Pajak</p>
          <p>{values.tax}%</p>
          <p className="text-xs text-gray-500">
            ideal {ideal.tax}%
          </p>
        </div>

        <div>
          <p>Stimulus</p>
          <p>{values.spending}%</p>
          <p className="text-xs text-gray-500">
            ideal {ideal.spending}%
          </p>
        </div>
      </div>

      <h3 className="mt-6 text-xl font-semibold">
        Score: {score}%
      </h3>
    </div>
  );
}
