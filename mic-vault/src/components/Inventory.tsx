import { useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Table from '../components/Table'
import AddMicModal from '../components/AddMicModal'
import { useVault } from '../store/useVault'
import type { Mic } from '../types'

export default function Inventory() {
  const { mics, addMic, updateMic, deleteMic } = useVault()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Mic | null>(null)

  const rows = useMemo(
    () => [...mics].sort((a, b) => a.label.localeCompare(b.label)),
    [mics]
  )

  const handleEdit = (row: Mic) => {
    setEditing(row)
    setOpen(true)
  }

  const handleDelete = (id: string) => {
    deleteMic(id)
  }

  const handleSave = (mic: Mic) => {
    if (editing) {
      updateMic(mic)
    } else {
      addMic(mic)
    }
    setOpen(false)
    setEditing(null)
  }

  return (
    <>
      <Navbar onAddClick={() => { setEditing(null); setOpen(true) }} />

      <section className="hero hero--mini">
        <div className="container hero__mini">
          <h1>Vault Inventory</h1>
          <p>Track wireless microphone's band, frequency, and service date in one place. Click the button above to register a microphone, then you can edit the registered microphone's details, or delete it. Frequencies must be entered as XXX.XXX MHz.</p>
        </div>
      </section>

      <section className="section section--padded">
        <div className="container">
          <div className="inventory__header">
            <h2>Inventory</h2>
            <button className="btn btn--primary" onClick={() => { setEditing(null); setOpen(true) }}>Add Mic</button>
          </div>
          <Table rows={rows} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </section>

      <Footer />
      <AddMicModal
        open={open}
        initial={editing ?? undefined}
        onClose={() => { setOpen(false); setEditing(null) }}
        onSave={handleSave}
      />
    </>
  )
}