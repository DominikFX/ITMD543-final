import { useEffect, useState } from 'react'
import type { Mic } from '../types'

type Draft = Omit<Mic, 'id' | 'frequencyMHz'> & {
  id?: string | null;
  frequencyMHz: string;
}

const empty: Draft = {
  id: null, label: '', brand: '', band: '', frequencyMHz: '', lastServiced: ''
}

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (mic: Mic) => void;
  initial?: Mic | null;
}

export default function AddMicModal({ open, onClose, onSave, initial }: Props) {
  const [form, setForm] = useState<Draft>(empty)

  useEffect(() => {
    if (initial) {
      setForm({
        id: initial.id,
        label: initial.label,
        brand: initial.brand,
        band: initial.band,
        frequencyMHz: String(initial.frequencyMHz),
        lastServiced: initial.lastServiced ?? ''
      })
    } else {
      setForm(empty)
    }
  }, [initial, open])

  if (!open) return null

  function update(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function save(e: React.FormEvent) {
    e.preventDefault()
    if (!form.label.trim() || !form.brand.trim() || !form.band.trim() || !form.frequencyMHz.trim()) return
    const hz = Number(form.frequencyMHz)
    if (!Number.isFinite(hz)) return
    const mic: Mic = {
      id: form.id ?? crypto.randomUUID(),
      label: form.label.trim(),
      brand: form.brand.trim(),
      band: form.band.trim(),
      frequencyMHz: hz,
      lastServiced: form.lastServiced || undefined
    }
    onSave(mic)
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm z-50 grid place-items-center" onClick={onClose}>
      <div className="w-[min(520px,92%)] bg-white rounded-2xl p-6 shadow-2xl border border-gray-100" onClick={e => e.stopPropagation()}>
        <h3 className="text-xl font-bold text-gray-900 mb-4">{form.id ? 'Edit Mic' : 'Add Mic'}</h3>
        <form className="grid gap-4" onSubmit={save}>
          <label className="grid gap-1.5">
            <span className="text-sm font-medium text-gray-500">Label</span>
            <input name="label" value={form.label} onChange={update} placeholder="e.g., Handheld 1" required className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2"/>
          </label>
          <label className="grid gap-1.5">
            <span className="text-sm font-medium text-gray-500">Brand</span>
            <input name="brand" value={form.brand} onChange={update} placeholder="e.g., Shure" required className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2"/>
          </label>
          <label className="grid gap-1.5">
            <span className="text-sm font-medium text-gray-500">Band</span>
            <input name="band" value={form.band} onChange={update} placeholder="e.g., H50" required className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2"/>
          </label>
          <label className="grid gap-1.5">
            <span className="text-sm font-medium text-gray-500">Frequency (MHz)</span>
            <input name="frequencyMHz" type="number" step="0.001" value={form.frequencyMHz} onChange={update} placeholder="e.g., 534.125" required className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2"/>
          </label>
          <label className="grid gap-1.5">
            <span className="text-sm font-medium text-gray-500">Last Serviced</span>
            <input name="lastServiced" type="date" value={form.lastServiced ?? ''} onChange={update} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2"/>
          </label>

          <div className="flex justify-end gap-3 mt-2">
            <button type="button" className="px-4 py-2 rounded-xl font-semibold border border-gray-200 hover:bg-gray-50 cursor-pointer" onClick={onClose}>Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-xl font-semibold bg-brand-dark text-white hover:opacity-90 cursor-pointer">{form.id ? 'Save Changes' : 'Add Mic'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}