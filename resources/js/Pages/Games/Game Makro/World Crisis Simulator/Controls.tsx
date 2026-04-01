import SliderControl from "./SliderControl";

export default function Controls({ values, updateValue, onSubmit }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <div className="space-y-4">
        <SliderControl
          label="Suku Bunga Acuan"
          value={values.interest}
          onChange={(v) => updateValue("interest", v)}
        />

        <SliderControl
          label="Pajak (PPh)"
          value={values.tax}
          onChange={(v) => updateValue("tax", v)}
        />

        <SliderControl
          label="Belanja Pemerintah"
          value={values.spending}
          onChange={(v) => updateValue("spending", v)}
        />
      </div>

      <div className="bg-slate-900 text-white p-6 rounded-xl">
        <h3 className="text-lg font-bold mb-4">Indikator Stabilitas</h3>

        <p className="text-yellow-400">Ketidaksesuaian bunga</p>
        <p className="text-sm mb-3">Risiko capital outflow</p>

        <p className="text-blue-400">Kapasitas fiskal</p>
        <p className="text-sm mb-6">Masih aman</p>

        <button
          onClick={onSubmit}
          className="w-full bg-indigo-500 py-3 rounded-lg font-semibold hover:bg-indigo-600"
        >
          KONFIRMASI
        </button>
      </div>
    </div>
  );
}
