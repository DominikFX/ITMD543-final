import { useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Table from '../components/Table'
import AddMicModal from '../components/AddMicModal'
//import { useVault } from '../store/useVault'
//import type { Mic } from '../types'

const DEMO_MICS = [
  { id: 'd-1', label: 'Handheld 1', brand: 'Shure',      band: 'H50', frequencyMHz: 534.125, lastServiced: '2025-08-01' },
  { id: 'd-2', label: 'Bodypack A', brand: 'Sennheiser', band: 'A1',  frequencyMHz: 470.300 },
  { id: 'd-3', label: 'HH-Lead',    brand: 'Shure',      band: 'G50', frequencyMHz: 482.650, lastServiced: '2025-06-12' },
  { id: 'd-4', label: 'BP-Spare',   brand: 'Audio-Tech', band: 'DE2', frequencyMHz: 542.900 },
] as const

export default function Inventory() {
  //const { mics, addMic, updateMic, deleteMic } = useVault()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<any | null>(null)
  //const [editing, setEditing] = useState<Mic | null>(null)

  const rows = useMemo(
    () => [...DEMO_MICS].sort((a,b) => a.label.localeCompare(b.label)),
    []
    //() => [...mics].sort((a, b) => a.label.localeCompare(b.label)),
    //[mics]
  )

  // MIDTERM: actions do nothing
  const handleEdit   = () => {}            // clicking pencil = no-op
  const handleDelete = (_id?: string) => {}// clicking trash = no-op
  const handleSave   = (_m: any) => {      // modal submit = just close
    setOpen(false); setEditing(null)
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
          {/*<Table rows={rows} onEdit={(row) => { setEditing(row); setOpen(true) }} onDelete={deleteMic} />*/}
        </div>
      </section>

      <Footer />
      <AddMicModal
        open={open}
        initial={editing ?? undefined}
        onClose={() => { setOpen(false); setEditing(null) }}
        onSave={handleSave}
      />
      {/*
      <AddMicModal
        open={open} initial={editing ?? undefined} onClose={() => { setOpen(false); setEditing(null) }}
        onSave={(m) => {
          if (editing) updateMic(m); else addMic(m)
          setOpen(false); setEditing(null)
        }}
      />*/}
    </>
  )
}