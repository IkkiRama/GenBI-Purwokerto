import SliderControl from "./SliderControl";

export default function PolicyRoom({
  scenario,
  values,
  updateValue,
  onSubmit,
}) {
  return (
    <div className="grid md:grid-cols-2 gap-6">

      {/* LEFT */}
      <div className="space-y-4">

        <div className="bg-yellow-100 p-4 rounded-lg text-sm">
          <b>Hint:</b> {scenario.hints[0]}
        </div>

        <SliderControl
          label="Suku Bunga Acuan (Moneter)"
          value={values.interest}
          onChange={(v) => updateValue("interest", v)}
        />

        <SliderControl
          label="Pajak Penghasilan (PPh/Fiskal)"
          value={values.tax}
          onChange={(v) => updateValue("tax", v)}
        />

        <SliderControl
          label="Belanja Pemerintah (Stimulus)"
          value={values.spending}
          onChange={(v) => updateValue("spending", v)}
        />
      </div>

      {/* RIGHT */}
      <div className="bg-slate-900 text-white p-6 rounded-xl">

        <h3 className="text-lg font-bold mb-4">
          Indikator Stabilitas
        </h3>

        <p className="text-yellow-400 font-semibold">
          Ketidaksesuaian Bunga
        </p>
        <p className="text-sm mb-4">
          Risiko pelarian modal atau penekanan konsumsi.
        </p>

        <p className="text-blue-400 font-semibold">
          Kapasitas Fiskal
        </p>
        <p className="text-sm mb-6">
          Anggaran masih dalam batas kendali negara.
        </p>

        <button
          onClick={onSubmit}
          className="w-full bg-indigo-500 py-3 rounded-lg font-semibold"
        >
          KONFIRMASI
        </button>
      </div>
    </div>
  );
}
