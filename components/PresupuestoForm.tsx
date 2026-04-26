'use client';

import { useState } from 'react';
import { Check, Plus, Minus, Globe, User } from 'lucide-react';

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
  { id: 'aventura',   label: 'Aventura y trekking',      emoji: '🥾' },
  { id: 'naturaleza', label: 'Naturaleza y vida salvaje', emoji: '🦁' },
  { id: 'cultura',    label: 'Cultura y gastronomía',     emoji: '🍷' },
  { id: 'relax',      label: 'Relax y desconexión',       emoji: '🌅' },
  { id: 'combinado',  label: 'Viaje combinado',           emoji: '✨' },
];

const MOTIVOS = [
  { value: 'vacaciones',           label: 'Vacaciones' },
  { value: 'luna_de_miel',         label: 'Luna de Miel' },
  { value: 'aniversario',          label: 'Aniversario' },
  { value: 'celebracion_familiar', label: 'Celebración familiar' },
  { value: 'incentivo_empresa',    label: 'Incentivo empresa' },
  { value: 'otros',                label: 'Otros' },
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

function FieldLabel({ text, required }: { text: string; required?: boolean }) {
  return (
    <p className="flex items-center gap-2.5 mb-4">
      <span className="w-1.5 h-4 rounded-full bg-vidaia-primary flex-shrink-0" />
      <span className="text-sm font-bold text-vidaia-dark uppercase tracking-wide">
        {text}
        {required && <span className="text-red-400 ml-1">*</span>}
      </span>
    </p>
  );
}

function CheckPill({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
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
  label, sublabel, value, onChange, min = 0,
}: {
  label: string; sublabel?: string; value: number; onChange: (v: number) => void; min?: number;
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
        <span className="w-8 text-center text-xl font-bold text-vidaia-dark tabular-nums">{value}</span>
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
  const [form, setForm] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const inp = 'w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm text-vidaia-charcoal placeholder-gray-400 focus:outline-none focus:border-vidaia-primary transition-colors bg-white';

  const mainDestinos = form.destinos.filter((d) => d !== 'otros');

  // ── Success ──────────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="text-center py-10">
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
    <div className="pb-24 md:pb-0">
      <form onSubmit={handleSubmit} id="presupuesto-form">

        {/* Campos ocultos globales */}
        <input type="hidden" name="form_source" value="presupuesto-web" />
        <input type="hidden" name="adults"   value={form.adultos} />
        <input type="hidden" name="children" value={form.menores} />

        {/* ══ SECCIÓN 1: Tu viaje soñado ══════════════════════════════════════ */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 mb-6">

          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 bg-vidaia-light rounded-xl flex items-center justify-center flex-shrink-0">
              <Globe className="w-5 h-5 text-vidaia-primary" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold text-vidaia-dark">Tu viaje soñado</h2>
              <p className="text-sm text-gray-400 mt-0.5">Cuéntanos cómo lo imaginas</p>
            </div>
          </div>
          <hr className="border-vidaia-light my-6" />

          <div className="space-y-8">

            {/* Destinos */}
            <fieldset>
              <FieldLabel text="¿A dónde quieres ir?" />
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
                      <div className={`w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center transition-colors ${checked ? 'bg-vidaia-primary border-vidaia-primary' : 'border-gray-300'}`}>
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
                    className={inp}
                  />
                </div>
              )}
            </fieldset>

            {/* Zonas (dinámico) */}
            {mainDestinos.length > 0 && (
              <div>
                <FieldLabel text="¿Qué zonas te interesan? (opcional)" />
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

            {/* Fecha */}
            <div>
              <FieldLabel text="Fecha aproximada de inicio" required />
              <input
                type="date"
                id="start_date"
                name="start_date"
                required
                value={form.startDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => update('startDate', e.target.value)}
                className={inp}
              />
            </div>

            {/* Duración */}
            <div>
              <FieldLabel text="Duración aproximada" required />
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  min={1}
                  max={365}
                  required
                  value={form.duracion}
                  onChange={(e) => update('duracion', e.target.value)}
                  placeholder="—"
                  className={`${inp} w-28 text-center text-lg font-semibold`}
                />
                <span className="text-sm text-gray-500 font-medium">días</span>
              </div>
            </div>

            {/* Viajeros */}
            <div>
              <FieldLabel text="¿Cuántos viajeros sois?" />
              <div className="bg-gray-50 rounded-2xl px-5 divide-y divide-gray-100">
                <NumberStepper label="Adultos" value={form.adultos} min={1} onChange={(v) => update('adultos', v)} />
                <NumberStepper label="Menores" sublabel="Menores de 18 años" value={form.menores} onChange={(v) => update('menores', v)} />
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
                    className={inp}
                  />
                </div>
              )}
            </div>

            {/* Tipo de grupo */}
            <fieldset>
              <FieldLabel text="Tipo de grupo" required />
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
                      required
                      checked={form.tipoGrupo === id}
                      onChange={() => update('tipoGrupo', id)}
                      className="sr-only"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Tipo de experiencia */}
            <fieldset>
              <FieldLabel text="Tipo de experiencia (opcional)" />
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
                      <div className={`w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center transition-colors ${checked ? 'bg-vidaia-primary border-vidaia-primary' : 'border-gray-300'}`}>
                        {checked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                      </div>
                      <span className="text-xl leading-none">{emoji}</span>
                      <span className="text-sm font-medium">{label}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {/* Motivo del viaje */}
            <fieldset>
              <FieldLabel text="Motivo del viaje (opcional)" />
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
                      <div className={`w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center transition-colors ${checked ? 'bg-vidaia-primary border-vidaia-primary' : 'border-gray-300'}`}>
                        {checked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                      </div>
                      <span className="text-sm font-medium">{label}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {/* Presupuesto */}
            <div>
              <FieldLabel text="Presupuesto orientativo por persona (opcional)" />
              <select
                id="budget"
                name="budget"
                value={form.presupuesto}
                onChange={(e) => update('presupuesto', e.target.value)}
                className={inp}
              >
                <option value="">Selecciona una opción</option>
                {PRESUPUESTOS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Mensaje libre */}
            <div>
              <FieldLabel text="Cuéntanos tu viaje soñado (opcional)" />
              <textarea
                id="message"
                name="message"
                rows={4}
                value={form.descripcion}
                onChange={(e) => update('descripcion', e.target.value)}
                placeholder="Ocasión especial, preferencias, cosas que no queréis perderos..."
                className={`${inp} resize-none leading-relaxed`}
              />
            </div>

          </div>
        </div>

        {/* ══ SECCIÓN 2: Tus datos de contacto ════════════════════════════════ */}
        <div className="bg-vidaia-sand rounded-2xl border border-vidaia-light p-6 sm:p-8 mb-8">

          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 bg-vidaia-earth/15 rounded-xl flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-vidaia-earth" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold text-vidaia-dark">Tus datos de contacto</h2>
              <p className="text-sm text-gray-400 mt-0.5">Para enviarte tu propuesta personalizada</p>
            </div>
          </div>
          <hr className="border-vidaia-light my-6" />

          <div className="space-y-5">

            <div>
              <label htmlFor="full_name" className="block text-sm font-semibold text-vidaia-dark mb-2">
                Nombre y apellidos <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                autoComplete="name"
                required
                value={form.nombre}
                onChange={(e) => update('nombre', e.target.value)}
                placeholder="Tu nombre y apellidos"
                className={inp}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-vidaia-dark mb-2">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="tu@email.com"
                className={inp}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-vidaia-dark mb-2">
                Teléfono <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                autoComplete="tel"
                required
                value={form.telefono}
                onChange={(e) => update('telefono', e.target.value)}
                placeholder="+34 600 000 000"
                className={inp}
              />
            </div>

            <p className="text-xs text-gray-400 leading-relaxed pt-1">
              Al enviar este formulario aceptas nuestra{' '}
              <a href="/privacidad" className="underline hover:text-vidaia-primary transition-colors">
                política de privacidad
              </a>
              . Tus datos se usarán únicamente para preparar tu propuesta de viaje personalizada.
            </p>

          </div>
        </div>

        {/* ── Botón envío — desktop ── */}
        <button
          type="submit"
          id="submit-presupuesto"
          className="hidden md:flex w-full items-center justify-center gap-2 py-4 bg-vidaia-earth hover:bg-vidaia-brown text-white font-bold text-base rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          Enviar mi solicitud 🌍
        </button>

      </form>

      {/* ── Botón sticky — móvil ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-sm border-t border-vidaia-light px-4 py-3 shadow-2xl">
        <button
          form="presupuesto-form"
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-vidaia-earth hover:bg-vidaia-brown text-white font-bold text-base rounded-2xl transition-colors"
        >
          Enviar mi solicitud 🌍
        </button>
      </div>
    </div>
  );
}
