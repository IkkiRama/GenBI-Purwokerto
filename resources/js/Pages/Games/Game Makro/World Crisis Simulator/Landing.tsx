export default function Landing({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">

      <h1 className="text-4xl font-extrabold mb-2">
        V5.0 Advanced Academic
      </h1>

      <h2 className="text-2xl font-semibold mb-4">
        Macroeconomic Policy Simulator
      </h2>

      <p className="max-w-xl text-gray-600 mb-8">
        Analisis mendalam terhadap 85 skenario krisis global.
        Gunakan instrumen moneter dan fiskal untuk mencapai
        kondisi ideal.
      </p>

      <button
        onClick={onStart}
        className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700"
      >
        Mulai Simulasi
      </button>
    </div>
  );
}
