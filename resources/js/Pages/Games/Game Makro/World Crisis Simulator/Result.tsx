export default function Result({ score, values, ideal }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Resesi Berkepanjangan</h2>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <p>Moneter</p>
          <p>{values.interest}% / ideal {ideal.interest}%</p>
        </div>

        <div>
          <p>Pajak</p>
          <p>{values.tax}% / ideal {ideal.tax}%</p>
        </div>

        <div>
          <p>Stimulus</p>
          <p>{values.spending}% / ideal {ideal.spending}%</p>
        </div>
      </div>

      <h3 className="mt-6 text-xl">Score: {score}%</h3>
    </div>
  );
}
