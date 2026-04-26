'use client';

import { useState, useRef } from 'react';
import { Check, ChevronRight, ChevronLeft, Plus, Minus, AlertCircle } from 'lucide-react';

// ─── Constants ───────────────────────────────────────────────────────────────

const DESTINOS = [
  { id: 'argentina', label: 'Argentina',      code: 'ar' },
  { id: 'chile',     label: 'Chile',          code: 'cl' },
  { id: 'bolivia',   label: 'Bolivia',        code: 'bo' },
  { id: 'otros',     label: 'Otros destinos', code: null },
];

const DESTINO_CODES: Record<string, string> = {
  argentina: 'ar',
  chile:     'cl',
  bolivia:   'bo',
};

const MOTIVOS = [
  { value: 'vacaciones',          label: 'Vacaciones' },
  { value: 'luna_de_miel',        label: 'Luna de Miel' },
  { value: 'aniversario',         label: 'Aniversario' },
  { value: 'celebracion_familiar', label: 'Celebración familiar' },
  { value: 'incentivo_empresa',   label: 'Incentivo empresa' },
  { value: 'otros',               label: 'Otros' },
];

const ZONAS: Record<string, string[]> = {
  argentina: ['Buenos Aires', 'Iguazú', 'Patagonia', 'Mendoza', 'Norte Argentino', 'Otros'],
  chile:     ['Santiago', 'Patagonia', 'Isla de Pascua', 'Carretera Austral', 'Lagos', 'Atacama'],
  bolivia:   ['Uyuni', 'La Paz', 'Sucre y Potosí', 'Lago Titicaca', 'Chiquitanía', 'Otros'],
};

const TIPOS_GRUPO = [
  { id: 'solo',    label: 'Solo/a'  },
  { id: 'pareja',  label: 'Pareja'  },
  { id: 'amigos',  label: 'Amigos'  },
  { id: 'familia', label: 'Familia' },
];

const EXPERIENCIAS = [
  { id: 'aventura',   label: 'Aventura y trekking',       emoji: '🥾' },
  { id: 'naturaleza', label: 'Naturaleza y vida salvaje',  emoji: '🦁' },
  { id: 'cultura',    label: 'Cultura y gastronomía',      emoji: '🍷' },
  { id: 'relax',      label: 'Relax y desconexión',        emoji: '🌅' },
  { id: 'combinado',  label: 'Viaje combinado',            emoji: '✨' },
];

const PRESUPUESTOS = [
  'Menos de 2.000€',
  '2.000€ - 3.500€',
  '3.500€ - 5.000€',
  'Más de 5.000€',
  'Prefiero no decirlo',
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  destinos:      string[];
  otroDestino:   string;
  zonas:         string[];
  startDate:     string;
  duracion:      string;
  adultos:       number;
  menores:       number;
  edadesMenores: string;
  tipoGrupo:     string;
  experiencias:  string[];
  motivo:        string[];
  presupuesto:   string;
  descripcion:   string;
  nombre:        string;
  email:         string;
  telefono:      string;
}

type Errors = Partial<Record<keyof FormData, string>>;

const INITIAL: FormData = {
  destinos:      [],
  otroDestino:   '',
  zonas:         [],
  startDate:     '',
  duracion:      '',
  adultos:       2,
  menores:       0,
  edadesMenores: '',
  tipoGrupo:     '',
  experiencias:  [],
  motivo:        ['vacaciones'],
  presupuesto:   '',
  descripcion:   '',
  nombre:        '',
  email:         '',
  telefono:      '',
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-vidaia-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: step === 1 ? '50%' : '100%' }}
        />
      </div>
      <span className="text-sm font-semibold text-gray-400 whitespace-nowrap">
        Paso {step} de 2
      </span>
    </div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <p className="flex items-center gap-2.5 mb-4">
      <span className="w-1.5 h-4 rounded-full bg-vidaia-primary flex-shrink-0" />
      <span className="text-sm font-bold text-vidaia-dark uppercase tracking-wide">{text}</span>
    </p>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="mt-2 flex items-center gap-1.5 text-sm text-red-500">
      <AlertCircle className="w-4 h-4 flex-shrink-0" />
      {msg}
    </p>
  );
}

function CheckPill({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${
        checked
          ? 'border-vidaia-primary bg-vidaia-primary text-white'
          : 'border-gray-200 text-gray-600 hover:border-vidaia-mid bg-white'
      }`}
    >
      {label}
    </button>
  );
}

function NumberStepper({
  label,
  sublabel,
  value,
  onChange,
  min = 0,
}: {
  label: string;
  sublabel?: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
}) {
  return (
    <div className="flex items-center justify-between py-3.5">
      <div>
        <p className="text-sm font-semibold text-vidaia-dark">{label}</p>
        {sublabel && <p className="text-xs text-gray-400 mt-0.5">{sublabel}</p>}
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-vidaia-primary hover:text-vidaia-primary disabled:opacity-25 disabled:cursor-not-allowed transition-all"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-8 text-center text-xl font-bold text-vidaia-dark tabular-nums">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-vidaia-primary hover:text-vidaia-primary transition-all"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ─── Main Form ────────────────────────────────────────────────────────────────

export default function PresupuestoForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const toggleArray = (field: 'destinos' | 'zonas' | 'experiencias' | 'motivo', item: string) => {
    setForm((prev) => {
      const current = prev[field] as string[];
      const has = current.includes(item);
      const next = has ? current.filter((v) => v !== item) : [...current, item];
      if (field === 'destinos' && has && ZONAS[item]) {
        return { ...prev, destinos: next, zonas: prev.zonas.filter((z) => !ZONAS[item].includes(z)) };
      }
      return { ...prev, [field]: next };
    });
    if (field === 'destinos' && errors.destinos) {
      setErrors((prev) => ({ ...prev, destinos: undefined }));
    }
  };

  const validateStep1 = (): boolean => {
    const e: Errors = {};
    if (form.destinos.length === 0) e.destinos = 'Selecciona al menos un destino.';
    if (!form.startDate) e.startDate = 'Indica una fecha aproximada de inicio.';
    if (!form.duracion || Number(form.duracion) < 1) e.duracion = 'Indica la duración del viaje.';
    if (!form.tipoGrupo) e.tipoGrupo = 'Selecciona el tipo de grupo.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = (): boolean => {
    const e: Errors = {};
    if (!form.nombre.trim()) e.nombre = 'El nombre y apellidos son obligatorios.';
    if (!form.email.trim()) e.email = 'El email es obligatorio.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'El email no tiene un formato válido.';
    if (!form.telefono.trim()) e.telefono = 'El teléfono es obligatorio.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const scrollTop = () =>
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);

  const goToStep2 = () => {
    if (validateStep1()) { setStep(2); scrollTop(); }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep2()) {
      console.log('Solicitud enviada:', form);
      setSubmitted(true);
      scrollTop();
    }
  };

  const inputCls = (err?: string) =>
    `w-full px-4 py-3 border-2 rounded-xl text-sm text-vidaia-charcoal placeholder-gray-400 focus:outline-none transition-colors bg-white ${
      err ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-vidaia-primary'
    }`;

  const mainDestinos = form.destinos.filter((d) => d !== 'otros');

  // ── Success ──────────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div ref={topRef} className="text-center py-10">
        <div className="w-20 h-20 bg-vidaia-light rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-vidaia-primary" strokeWidth={2.5} />
        </div>
        <h2 className="font-heading text-3xl font-bold text-vidaia-dark mb-4">
          ¡Nos ponemos en marcha!
        </h2>
        <p className="text-gray-500 text-lg leading-relaxed max-w-sm mx-auto mb-2">
          Hemos recibido tu solicitud. En menos de{' '}
          <strong className="text-vidaia-dark">24 horas</strong> te contactamos
          para empezar a diseñar el viaje de tu vida.
        </p>
        <p className="text-gray-400 text-sm mt-5">
          Mientras tanto, síguenos en Instagram para inspirarte ✨
        </p>
      </div>
    );
  }

  // ── Form ─────────────────────────────────────────────────────────────────────
  return (
    <div ref={topRef}>
      <ProgressBar step={step} />

      {/* Step title */}
      <div className="mb-8">
        {step === 1 ? (
          <>
            <h2 className="font-heading text-2xl font-bold text-vidaia-dark">Tu viaje soñado</h2>
            <p className="text-gray-400 text-sm mt-1">
              Cuéntanos lo que imaginas — cuanto más detalle, mejor podremos diseñarlo.
            </p>
          </>
        ) : (
          <>
            <h2 className="font-heading text-2xl font-bold text-vidaia-dark">Casi listo</h2>
            <p className="text-gray-400 text-sm mt-1">
              Solo necesitamos saber a quién le mandamos la propuesta 😊
            </p>
          </>
        )}
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Hidden: origen del formulario */}
        <input type="hidden" name="form_source" value="presupuesto-web" />

        {/* ══ STEP 1 ══════════════════════════════════════════════════════════ */}
        {step === 1 && (
          <div className="space-y-8">

            {/* 1 · Destinos — checkboxes con name="destinations" */}
            <fieldset>
              <SectionLabel text="1 · ¿A dónde quieres ir?" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DESTINOS.map(({ id, label, code }) => {
                  const checked = form.destinos.includes(id);
                  return (
                    <label
                      key={id}
                      htmlFor={`dest_${id}`}
                      className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                        checked
                          ? 'border-vidaia-primary bg-vidaia-light/60 text-vidaia-dark'
                          : 'border-gray-200 hover:border-vidaia-mid text-gray-700 bg-white'
                      }`}
                    >
                      <input
                        type="checkbox"
                        id={`dest_${id}`}
                        name="destinations"
                        value={id}
                        checked={checked}
                        onChange={() => toggleArray('destinos', id)}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center transition-colors ${
                          checked ? 'bg-vidaia-primary border-vidaia-primary' : 'border-gray-300'
                        }`}
                      >
                        {checked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                      </div>
                      {code
                        ? <img src={`https://flagcdn.com/20x15/${code}.png`} alt="" width={20} height={15} className="rounded-sm flex-shrink-0" />
                        : <span className="text-xl leading-none">🌎</span>
                      }
                      <span className="text-sm font-semibold">{label}</span>
                    </label>
                  );
                })}
              </div>

              {form.destinos.includes('otros') && (
                <div className="mt-3">
                  <input
                    type="text"
                    id="other_destination"
                    name="other_destination"
                    value={form.otroDestino}
                    onChange={(e) => update('otroDestino', e.target.value)}
                    placeholder="¿Qué destino tienes en mente?"
                    className={inputCls()}
                  />
                </div>
              )}
              <FieldError msg={errors.destinos} />
            </fieldset>

            {/* 2 · Zonas — solo si hay destinos principales */}
            {mainDestinos.length > 0 && (
              <div>
                <SectionLabel text="2 · ¿Qué zonas te interesan? (opcional)" />
                <div className="space-y-5">
                  {mainDestinos.map((dest) => (
                    <div key={dest}>
                      <p className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-2.5">
                        <img src={`https://flagcdn.com/20x15/${DESTINO_CODES[dest]}.png`} alt="" width={20} height={15} className="rounded-sm flex-shrink-0" />
                        {dest.charAt(0).toUpperCase() + dest.slice(1)}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {ZONAS[dest].map((zona) => (
                          <CheckPill
                            key={zona}
                            checked={form.zonas.includes(zona)}
                            onChange={() => toggleArray('zonas', zona)}
                            label={zona}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3 · Fecha de inicio */}
            <div>
              <SectionLabel text="3 · Fecha aproximada de inicio del viaje" />
              <input
                type="date"
                id="start_date"
                name="start_date"
                required
                value={form.startDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => { update('startDate', e.target.value); if (errors.startDate) setErrors(p => ({ ...p, startDate: undefined })); }}
                className={inputCls(errors.startDate)}
              />
              <FieldError msg={errors.startDate} />
            </div>

            {/* 4 · Duración */}
            <div>
              <SectionLabel text="4 · Duración aproximada" />
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  min={1}
                  max={365}
                  value={form.duracion}
                  onChange={(e) => update('duracion', e.target.value)}
                  placeholder="—"
                  className={`${inputCls(errors.duracion)} w-28 text-center text-lg font-semibold`}
                />
                <span className="text-sm text-gray-500 font-medium">días</span>
              </div>
              <FieldError msg={errors.duracion} />
            </div>

            {/* 5 · Viajeros — NumberStepper + hidden inputs */}
            <div>
              <SectionLabel text="5 · ¿Cuántos viajeros sois?" />
              <div className="bg-gray-50 rounded-2xl px-5 divide-y divide-gray-100">
                <NumberStepper
                  label="Adultos"
                  value={form.adultos}
                  min={1}
                  onChange={(v) => update('adultos', v)}
                />
                <NumberStepper
                  label="Menores"
                  sublabel="Menores de 18 años"
                  value={form.menores}
                  onChange={(v) => update('menores', v)}
                />
              </div>
              {form.menores > 0 && (
                <div className="mt-3">
                  <label htmlFor="children_ages" className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">
                    ¿Qué edades tienen los menores?
                  </label>
                  <input
                    type="text"
                    id="children_ages"
                    name="children_ages"
                    value={form.edadesMenores}
                    onChange={(e) => update('edadesMenores', e.target.value)}
                    placeholder="Ej: 5, 8 años"
                    className={inputCls()}
                  />
                </div>
              )}
            </div>

            {/* 6 · Tipo de grupo — radios con name="group_type" */}
            <fieldset>
              <SectionLabel text="6 · Tipo de grupo" />
              <div className="flex flex-wrap gap-2">
                {TIPOS_GRUPO.map(({ id, label }) => (
                  <label
                    key={id}
                    htmlFor={`group_${id}`}
                    className={`px-5 py-2.5 rounded-full border-2 text-sm font-semibold transition-all cursor-pointer ${
                      form.tipoGrupo === id
                        ? 'border-vidaia-primary bg-vidaia-primary text-white'
                        : 'border-gray-200 text-gray-600 hover:border-vidaia-mid'
                    }`}
                  >
                    <input
                      type="radio"
                      id={`group_${id}`}
                      name="group_type"
                      value={id}
                      checked={form.tipoGrupo === id}
                      onChange={() => { update('tipoGrupo', id); if (errors.tipoGrupo) setErrors(p => ({ ...p, tipoGrupo: undefined })); }}
                      className="sr-only"
                    />
                    {label}
                  </label>
                ))}
              </div>
              <FieldError msg={errors.tipoGrupo} />
            </fieldset>

            {/* 7 · Tipo de experiencia — checkboxes con name="experience_type" */}
            <fieldset>
              <SectionLabel text="7 · Tipo de experiencia (opcional)" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {EXPERIENCIAS.map(({ id, label, emoji }) => {
                  const checked = form.experiencias.includes(id);
                  return (
                    <label
                      key={id}
                      htmlFor={`exp_${id}`}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                        checked
                          ? 'border-vidaia-primary bg-vidaia-light/60 text-vidaia-dark'
                          : 'border-gray-200 hover:border-vidaia-mid text-gray-700 bg-white'
                      }`}
                    >
                      <input
                        type="checkbox"
                        id={`exp_${id}`}
                        name="experience_type"
                        value={id}
                        checked={checked}
                        onChange={() => toggleArray('experiencias', id)}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center transition-colors ${
                          checked ? 'bg-vidaia-primary border-vidaia-primary' : 'border-gray-300'
                        }`}
                      >
                        {checked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                      </div>
                      <span className="text-xl leading-none">{emoji}</span>
                      <span className="text-sm font-medium">{label}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {/* 8 · Motivo del viaje */}
            <fieldset>
              <SectionLabel text="8 · Motivo del viaje (opcional)" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {MOTIVOS.map(({ value, label }) => {
                  const checked = form.motivo.includes(value);
                  return (
                    <label
                      key={value}
                      htmlFor={`mot_${value}`}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                        checked
                          ? 'border-vidaia-primary bg-vidaia-light/60 text-vidaia-dark'
                          : 'border-gray-200 hover:border-vidaia-mid text-gray-700 bg-white'
                      }`}
                    >
                      <input
                        type="checkbox"
                        id={`mot_${value}`}
                        name="trip_reason"
                        value={value}
                        checked={checked}
                        onChange={() => toggleArray('motivo', value)}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center transition-colors ${
                          checked ? 'bg-vidaia-primary border-vidaia-primary' : 'border-gray-300'
                        }`}
                      >
                        {checked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                      </div>
                      <span className="text-sm font-medium">{label}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {/* 9 · Presupuesto */}
            <div>
              <SectionLabel text="9 · Presupuesto orientativo por persona (opcional)" />
              <select
                id="budget"
                name="budget"
                value={form.presupuesto}
                onChange={(e) => update('presupuesto', e.target.value)}
                className={inputCls()}
              >
                <option value="">Selecciona una opción</option>
                {PRESUPUESTOS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* 10 · Descripción libre */}
            <div>
              <SectionLabel text="10 · Cuéntanos tu viaje soñado (opcional)" />
              <textarea
                id="message"
                name="message"
                rows={4}
                value={form.descripcion}
                onChange={(e) => update('descripcion', e.target.value)}
                placeholder="Cualquier detalle que quieras contarnos: ocasión especial, preferencias, cosas que no queréis perderos..."
                className={`${inputCls()} resize-none leading-relaxed`}
              />
            </div>

            <button
              type="button"
              onClick={goToStep2}
              className="w-full flex items-center justify-center gap-2 py-4 bg-vidaia-primary hover:bg-vidaia-dark text-white font-bold text-base rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]"
            >
              Siguiente
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* ══ STEP 2 ══════════════════════════════════════════════════════════ */}
        {step === 2 && (
          <div className="space-y-5">

            {/* Mirror oculto de todos los campos del paso 1 — el CRM los captura al hacer submit */}
            {form.destinos.map((d) => <input key={`hd_${d}`} type="hidden" name="destinations" value={d} />)}
            {form.otroDestino && <input type="hidden" name="other_destination" value={form.otroDestino} />}
            {form.zonas.map((z) => <input key={`hz_${z}`} type="hidden" name="zones" value={z} />)}
            <input type="hidden" name="start_date" value={form.startDate} />
            <input type="hidden" name="duration" value={form.duracion} />
            <input type="hidden" name="adults" value={form.adultos} />
            <input type="hidden" name="children" value={form.menores} />
            {form.edadesMenores && <input type="hidden" name="children_ages" value={form.edadesMenores} />}
            <input type="hidden" name="group_type" value={form.tipoGrupo} />
            {form.experiencias.map((e) => <input key={`he_${e}`} type="hidden" name="experience_type" value={e} />)}
            {form.motivo.map((m) => <input key={`hm_${m}`} type="hidden" name="trip_reason" value={m} />)}
            {form.presupuesto && <input type="hidden" name="budget" value={form.presupuesto} />}
            {form.descripcion && <input type="hidden" name="message" value={form.descripcion} />}

            {/* Nombre y apellidos */}
            <div>
              <label htmlFor="full_name" className="block text-sm font-semibold text-vidaia-dark mb-2">
                Nombre y apellidos <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                autoComplete="name"
                value={form.nombre}
                onChange={(e) => update('nombre', e.target.value)}
                placeholder="Tu nombre y apellidos"
                className={inputCls(errors.nombre)}
              />
              <FieldError msg={errors.nombre} />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-vidaia-dark mb-2">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="tu@email.com"
                className={inputCls(errors.email)}
              />
              <FieldError msg={errors.email} />
            </div>

            {/* Teléfono */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-vidaia-dark mb-2">
                Teléfono <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                autoComplete="tel"
                value={form.telefono}
                onChange={(e) => update('telefono', e.target.value)}
                placeholder="+34 600 000 000"
                className={inputCls(errors.telefono)}
              />
              <FieldError msg={errors.telefono} />
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-gray-400 leading-relaxed pt-2">
              Al enviar este formulario aceptas nuestra{' '}
              <a href="/privacidad" className="underline hover:text-vidaia-primary transition-colors">
                política de privacidad
              </a>
              . Tus datos se usarán únicamente para preparar tu propuesta de viaje personalizada.
            </p>

            {/* Buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => { setStep(1); scrollTop(); }}
                className="flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-gray-200 hover:border-vidaia-mid text-gray-500 hover:text-vidaia-dark font-medium rounded-2xl transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
                Volver
              </button>
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 py-4 bg-vidaia-earth hover:bg-vidaia-brown text-white font-bold text-base rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                Quiero mi viaje a medida 🌍
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
