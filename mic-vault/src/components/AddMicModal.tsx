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
    <div className="modal__backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h3>{form.id ? 'Edit Mic' : 'Add Mic'}</h3>
        <form className="form" onSubmit={save}>
          <label>
            <span>Label</span>
            <input name="label" value={form.label} onChange={update} placeholder="e.g., Handheld 1" required />
          </label>
          <label>
            <span>Brand</span>
            <input name="brand" value={form.brand} onChange={update} placeholder="e.g., Shure" required />
          </label>
          <label>
            <span>Band</span>
            <input name="band" value={form.band} onChange={update} placeholder="e.g., H50" required />
          </label>
          <label>
            <span>Frequency (MHz)</span>
            <input name="frequencyMHz" type="number" step="0.001" value={form.frequencyMHz} onChange={update} placeholder="e.g., 534.125" required />
          </label>
          <label>
            <span>Last Serviced</span>
            <input name="lastServiced" type="date" value={form.lastServiced ?? ''} onChange={update} />
          </label>

          <div className="modal__actions">
            <button type="button" className="btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn--primary">{form.id ? 'Save Changes' : 'Add Mic'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}